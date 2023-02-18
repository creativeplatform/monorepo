// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

contract CreativeNFTv2 is ERC721Upgradeable, OwnableUpgradeable {
  using CountersUpgradeable for CountersUpgradeable.Counter;
  CountersUpgradeable.Counter _tokenIds;
  mapping(uint256 => string) _tokenURIs;

  struct RenderToken {
    uint256 id;
    string uri;
  }


  function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
    _tokenURIs[tokenId] = _tokenURI;
  }

  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(_exists(tokenId));
    string memory _tokenURI = _tokenURIs[tokenId];
    return _tokenURI;
  }

  function getAllTokens() public view returns (RenderToken[] memory) {
    uint256 lastestId = _tokenIds.current();
    uint256 counter = 0;
    RenderToken[] memory res = new RenderToken[](lastestId);
    for (uint256 i = 0; i < lastestId; i++) {
      if (_exists(counter)) {
        string memory uri = tokenURI(counter);
        res[counter] = RenderToken(counter, uri);
      }
      counter++;
    }
    return res;
  }

  function mint(address recipient, string memory uri) public returns (uint256) {
    uint256 newId = _tokenIds.current();
    _safeMint(recipient, newId);
    _setTokenURI(newId, uri);
    _tokenIds.increment();
    return newId;
  }

  /*
    @gawainb function to burn NFT
    @param tokenId NFT id
    * See {ERC721}.
    *
    * Requirements:
    *
    * - the caller must be owner of the token.
    */
    function burn(uint256 tokenId) public virtual returns (bool) {
        require(ownerOf(tokenId) == _msgSender(), "caller is not the owner");
        _burn(tokenId);
        return true;
    }
}