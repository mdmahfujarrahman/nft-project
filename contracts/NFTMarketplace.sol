// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;


    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

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


    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken ( string memory tokenURI, uint256 price) public payable returns (uint) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);


        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(listingPrice == msg.value, "Price must be equal to listing price");
        
        
        idToMarketItem[tokenId] = MarketItem(
            tokenId, 
            payable(msg.sender), 
            payable(address(this)), 
            price, 
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
        
    }

    function resellToken(uint256 tokenId, uint256 price) public payable {

        require(idToMarketItem[tokenId].owner == msg.sender, "You are not the owner of this token");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        
        idToMarketItem[tokenId].isSold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;


        require(msg.value == price, "Please submit the asking price in order to complete the purchase");
        
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].isSold = true;
        idToMarketItem[tokenId].seller = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);


        payable(owner).transfer(listingPrice);

        payable(idToMarketItem[tokenId].seller).transfer(msg.value - listingPrice);
        
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = itemCount - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for (uint i = 0; i < itemCount; i++) {
            if(idToMarketItem[i+1].owner == address(this)) {
                uint currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;

    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                uint currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;

    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                uint currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;

    }

}