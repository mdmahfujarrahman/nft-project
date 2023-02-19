// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;


    Counters.Counter private _tokenIds;
    Counters.Counter private _itemIds;

    uint256 listingPrice = 0.025 ether;

    address payable owner;


    mapping(uint256 => MarketItem) public idToMarketItem;
    
    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
    }

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isSold
    );

    constructor() {
        owner = payable(msg.sender);
    }
    
    function updateListigPrice(uint256 _listingPrice) public payable {
        require(msg.sender == owner, "You are not the owner");
        listingPrice = _listingPrice;
        
    }




}