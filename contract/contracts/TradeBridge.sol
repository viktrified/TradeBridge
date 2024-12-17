// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

interface TradeBridgeTokenC {
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TradeBridge {
    uint public transactionFee;
    uint public transactionCount;
    uint public nextCommodityId;
    address public owner;
    uint public totalSales;

    struct Commodity {
        uint commodityId;
        address sellerAddress;
        string commodityTitle;
        string commodityDescription;
        uint commodityQuantity;
        string quantityMeasurement;
        uint pricePerQuantity;
        string image;
        string imageURL;
        string commodityLocation;
        bool isAvailable;
        bool hasReceived;
        uint createdAt;
    }

    struct Sale {
        address buyer;
        address seller;
        uint commodityId;
        uint quantity;
    }

    struct Dispute {
        address buyer;
        address seller;
        string report;
        bool isResolved;
    }

    Commodity[] public allCommodities;
    Sale[] public sales;

    IERC20 public ITBTK;

    mapping(address => uint[]) public userCommodities;
    mapping(address => mapping(uint => bool)) public userCommoditiesInvolved;
    mapping(uint => Dispute) public disputes;
    mapping(address => Sale) allSales;

    event CommodityPurchased(address indexed buyer, uint commodityId, uint quantity, uint amount);
    event CommodityAdded(address indexed seller, uint commodityId, string commodityTitle, string commodityDescription, uint commodityQuantity, string quantityMeasurement, string image, string imageURL, uint createdAt, string commodityLocation);
    event DisputeRaised(address indexed defaulter, address indexed reporter, uint commodityId, string report);
    event DisputeResolved(address indexed defaulter, address indexed reporter, uint commodityId);

    constructor() {
        owner = msg.sender;
        nextCommodityId = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: You are not the owner");
        _;
    }

    function addCommodity(
        string memory _commodityTitle,
        string memory _commodityDescription,
        uint _commodityQuantity,
        string memory _quantityMeasurement,
        uint _pricePerQuantity,
        string memory _image,
        string memory _imageURL,
        string memory _commodityLocation
    ) public {

        Commodity memory newCommodity = Commodity({
            commodityId: nextCommodityId,
            sellerAddress: msg.sender,
            commodityTitle: _commodityTitle,
            commodityDescription: _commodityDescription,
            commodityQuantity: _commodityQuantity,
            quantityMeasurement: _quantityMeasurement,
            pricePerQuantity: _pricePerQuantity,
            image: _image,
            imageURL: _imageURL,
            createdAt: block.timestamp,
            commodityLocation: _commodityLocation,
            hasReceived: false,
            isAvailable: true
        });
        
        
        allCommodities.push(newCommodity);
        userCommodities[msg.sender].push(nextCommodityId);
        
        emit CommodityAdded(msg.sender, nextCommodityId, _commodityTitle, _commodityDescription, _commodityQuantity, _quantityMeasurement, _image, _imageURL, block.timestamp, _commodityLocation);

        nextCommodityId++;
    }

    function getAllCommodities() public view returns (Commodity[] memory) {
        return allCommodities;
    }

    function getCommoditiesByUser(address _user) public view returns (Commodity[] memory) {
        uint[] memory userCommodityIds = userCommodities[_user];
        Commodity[] memory userCommoditiesArray = new Commodity[](userCommodityIds.length);

        for (uint i = 0; i < userCommodityIds.length; i++) {
            userCommoditiesArray[i] = allCommodities[userCommodityIds[i] - 1];
        }

        return userCommoditiesArray;
    }

    function buyCommodity(uint _commodityId, uint _quantity) external {
        require(_commodityId > 0 && _commodityId < nextCommodityId, "Error: Commodity does not exist");
        Commodity storage commodity = allCommodities[_commodityId - 1];
        require(commodity.commodityQuantity >= _quantity, "Error: Commodity quantity is lower than your quantity");
        require(_quantity > 0, "Error: Quantity cannot be zero");

        uint totalAmount = (commodity.pricePerQuantity * _quantity) + transactionFee;
        require(ITBTK.balanceOf(msg.sender) >= totalAmount, "Error: Insufficient balance");

        require(ITBTK.transferFrom(msg.sender, commodity.sellerAddress, totalAmount), "Error: Transfer failed");

        // IERC1155(commodity.nftContract).safeTransferFrom(commodity.nftContract, msg.sender, _commodityId, _quantity, "");

        commodity.commodityQuantity -= _quantity;

        sales.push(Sale({
            buyer: msg.sender,
            seller: commodity.sellerAddress,
            commodityId: _commodityId,
            quantity: _quantity
        }));

        totalSales += 1;

        userCommoditiesInvolved[msg.sender][_commodityId] = true;

        if (commodity.commodityQuantity == 0) {
            commodity.isAvailable = false;
        }

        emit CommodityPurchased(msg.sender, _commodityId, _quantity, totalAmount);
    }

    function setTransactionFee(uint _fee) external onlyOwner {
        transactionFee = _fee;
    }

    function buyerRaiseDispute(address _defaulter, uint _commodityId, string memory _report) external {
        require(userCommoditiesInvolved[msg.sender][_commodityId], "Error: You cannot raise a dispute for this commodity");

        bool isSeller = false;

        for (uint i = 0; i < sales.length; i++) {
            if (sales[i].commodityId == _commodityId && sales[i].seller == _defaulter && sales[i].buyer == msg.sender) {
                isSeller = true;
                break;
            }
        }

        require(isSeller, "Error: The defaulter is not the seller of this commodity");
        
        disputes[_commodityId] = Dispute({
            buyer: msg.sender,
            seller: _defaulter,
            report: _report,
            isResolved: false
        });

        emit DisputeRaised(_defaulter, msg.sender, _commodityId, _report);
    }

    function resolveDispute(uint _commodityId) external onlyOwner {
        require(disputes[_commodityId].buyer != address(0), "Error: No dispute found.");
        require(!disputes[_commodityId].isResolved, "Error: This dispute has been resolved");

        // Commodity storage commodity = allCommodities[_commodityId - 1];
        
        Sale memory sale;
        bool saleFound = false;
        for (uint i = 0; i < sales.length; i++) {
            if (sales[i].commodityId == _commodityId) {
                sale = sales[i];
                saleFound = true;
                break;
            }
        }
        
        require(saleFound, "Error: Sale not found");

        // uint totalAmount = commodity.pricePerQuantity * sale.quantity;

        // require(TBNFT.transfer(disputes[_commodityId].buyer, totalAmount), "Error: Transfer to buyer failed");

        disputes[_commodityId].isResolved = true;

        emit DisputeResolved(disputes[_commodityId].seller, disputes[_commodityId].buyer, _commodityId);
    }
}