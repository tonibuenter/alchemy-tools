pragma solidity 0.8;
// SPDX-License-Identifier: MIT


contract Polysafe
{
    struct Item {
        string name;
        string secretContent;
        string inserted;
    }

    mapping(address => Item[]) itemLists;
    mapping(address => string) keys;
    mapping(address => uint) private itemListIndexes;

    function add(string memory _name, string memory _secretContent, string memory _inserted) public
    {
        Item[] storage itemList = itemLists[msg.sender];
        itemList.push(Item(_name, _secretContent, _inserted));
    }

    function set(uint256 _index, string memory _name, string memory _secretContent, string memory _inserted) public
    {
        require(_index < itemLists[msg.sender].length, "Index out of bounds");
        itemLists[msg.sender][_index] = Item(_name, _secretContent, _inserted);
    }


    function get(uint256 _index) public view returns
    (
        string memory name,
        string memory secretContent,
        string memory inserted
    )
    {
        require(_index < itemLists[msg.sender].length, "Index out of bounds");
        name = itemLists[msg.sender][_index].name;
        secretContent = itemLists[msg.sender][_index].secretContent;
        inserted = itemLists[msg.sender][_index].inserted;
        return (name, secretContent, inserted);
    }


    function length() public view returns (uint)
    {
        return itemLists[msg.sender].length;
    }


}
