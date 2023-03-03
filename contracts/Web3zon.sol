pragma solidity ^0.8.0;

contract Web3Zon {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    struct Item {
        uint id;
        string name;
        string category;
        string image;
        uint cost;
        uint rating;
        uint stock;
    }

    struct Order {
        uint time;
        Item item;
    }
    mapping(uint => Item) public items;
    mapping(address => uint) public orderCount;
    mapping(address => mapping(uint => Order)) public orders;

    event List(string name, uint cost, uint stock);

    modifier _onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to list products");
        _;
    }

    // List products
    function list(
        uint _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint _cost,
        uint _rating,
        uint _stock
    ) public _onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        items[_id] = item;
        emit List(_name, _cost, _stock);
    }

    // Buy Products
    function buy(uint _id) public payable {
        Item memory item = items[_id];
        require(msg.value >= item.cost);
        require(item.stock > 0);
        Order memory order = Order(block.timestamp, item);
        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;
        items[_id].stock = item.stock - 1;
    }

    function withdraw() public _onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success); 
    }
}
