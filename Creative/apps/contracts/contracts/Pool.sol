// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface iRandomNumberGenerator {
    function getRandomNumber(uint256 userProvidedSeed)
        external
        returns (bytes32 requestId);

    function seeRandomNumber() external returns (uint256);
}

//TODO instead of distributing rewards, there should be a new settling contract created where the artist and brand can have a back and forth over the design of the final NFT
//This contract would pay out the rewards
//TODO add support for another ERC20 token that can be used as a prize pool for first second and third submissions.
contract Pool {
    address public poolOwner;
    IERC20 private token; //The input token for the pool campaign usually CRTV
    IERC721 private nft;
    iRandomNumberGenerator private rng;
    string public poolName; //Brand can call the pool whatever they want IE "Campaign to design the next Coca Cola Bear NFT"
    string public brandName; //Pulled from Twitter handle is not changeable
    uint256 public funds; //Capital Pool owner deposits to start pool!
    uint256 public submissionEndTime;
    uint256 public fanVotingEndTime;
    uint256 public brandVotingEndTime;
    uint256 public campaignEndTime;
    bool public topTenFound;
    uint256[10] public topTen;
    uint256[10] public topTenAmount;
    uint256[] finalists;
    uint256[] finalistsAmounts;
    uint256 winningSubmission; // Index of the winning submission
    uint256 userDeposit; // Amount of funds required to make a submission and vote
    bool winnerSelected;
    uint256 searchIndex; //stores the last index that was cheked for top ten calcualtion
    bool checkedForTies;
    uint256 finalistsCount;
    bool public backedByFunds;

    struct User {
        address user;
        uint256 amount;
    }

    struct submission {
        uint256[] nftList;
        mapping(address => uint256) userIndex;
        User[] users;
        uint256 userCount;
    }

    mapping(uint256 => submission) public submissions;
    uint256 submissionCount = 1;

    /**
     * @dev emitted when a pool is backed with enough campaign funds
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param BackedByFunds bool showing whether the pool is backed by funds for not.
     **/
    event PoolBacked(
        address PoolAddress,
        string PoolName,
        string BrandName,
        bool BackedByFunds
    );

    /**
     * @dev emitted when a pool owner changes the pool name
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     **/
    event PoolNameChanged(
        address PoolAddress,
        string PoolName,
        string BrandName
    );

    /**
     * @dev emitted when an artist created a submission
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param SubmissionNumber the number assigned to this submission, when emitted this also represents total submission count
     * @param ArtistAddress the address of the artist who created the submission
     * @param NFTsInSubmission an array of uints that hold the token ids of the NFTs in the submission
     **/
    event SubmissionCreated(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256 SubmissionNumber,
        address ArtistAddress,
        uint256[3] NFTsInSubmission
    );

    /**
     * @dev emitted when a fan votes on a submission
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param SubmissionNumber the submission number the fan voted for
     * @param Voter the address of the fan that made the vote
     * @param NewVoteCount the new total vote count for that submission
     **/
    event VoteSubmitted(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256 SubmissionNumber,
        address Voter,
        uint256 NewVoteCount
    );

    /**
     * @dev emitted when the Top Ten list changes from a fan vote
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param TopTen the top ten submissions, an array of indexes, so if submission 1 is in it, 1 would be in the top ten
     **/
    event NewTopTen(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256[10] TopTen
        );

    /**
     * @dev emitted when finalists list has been created
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param Finalists an array of of indexing corresponding to the submission numbers that are finalists
     **/
    event SeeFinalists(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256[] Finalists
        );

        /**
     * @dev emitted when the winner is chosen
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param Winner the winning submission number
     **/
    event WinnerSelected(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256 Winner
        );

    /**
     * @dev emitted when a someone calls cashout
     * @param PoolAddress address of the pool
     * @param PoolName name of the pool
     * @param BrandName name of the brand running the campaign
     * @param SubmissionNumber the submission number the fan voted for
     * @param Caller the address of the caller who cashed out
     **/
    event CashedOut(
        address PoolAddress,
        string PoolName,
        string BrandName,
        uint256 SubmissionNumber,
        address Caller
    );

    //TODO add in event for when settling contract is created

    /**
     * @dev functions affected by this modifier can only be called by the pool owner
     **/
    modifier onlyPoolOwner() {
        require(
            msg.sender == poolOwner,
            "Only the Pool Owner can call this function!"
        );
        _;
    }

    /**
     * @dev functions affected by this modifier can only be called by fans
     **/
    modifier onlyFans() {
        require(msg.sender != poolOwner, "Only Fans can call this function!");
        _;
    }

    /**
     * @dev functions affected by this modifier are onyl callable
     * when the pool has been backed by funds
     **/
    modifier checkFunds() {
        require(backedByFunds, "Pool is not backed by funds!");
        _;
    }

    constructor(
        string memory _poolName,
        string memory _brandName,
        uint256 _capital,
        address _capitalAddress,
        address _nftAddress,
        address _poolOwner,
        address _rng,
        uint256 _campaignLength,
        uint256 _votingLength,
        uint256 _decisionLength,
        uint256 _submissionLength
    ) {
        poolOwner = _poolOwner;
        funds = _capital;
        token = IERC20(_capitalAddress);

        userDeposit = funds / 10;
        nft = IERC721(_nftAddress);
        rng = iRandomNumberGenerator(_rng);

        poolName = _poolName;
        brandName = _brandName;
        uint256 currentTime = block.timestamp;
        submissionEndTime = currentTime + _submissionLength;
        fanVotingEndTime = submissionEndTime + _votingLength;
        brandVotingEndTime = fanVotingEndTime + _decisionLength;
        campaignEndTime = currentTime + _campaignLength;
    }

    function getName() external view returns (string memory) {
        return poolName;
    }

    /**
     * @dev After a pool is created, the owner needs to transfer the funds to the pool in order to back it
     **/
    function backPool() external onlyPoolOwner {
        require(!backedByFunds, "Pool already backed by funds!");
        require(
            token.transferFrom(msg.sender, address(this), funds),
            "trandferFrom failed, pool not backed by funds!"
        );
        backedByFunds = true;
        emit PoolBacked(address(this), poolName, brandName, backedByFunds);
    }

    function changeName(string memory _name) external onlyPoolOwner {
        poolName = _name;
        emit PoolNameChanged(address(this), poolName, brandName);
    }

    function seePoolBacking() external view returns (uint256) {
        return token.balanceOf(address(this));
    }

    function getTopTen() external view returns (uint256[10] memory) {
        return topTen;
    }

    function getTopTenAmount() external view returns (uint256[10] memory) {
        return topTenAmount;
    }

    function getfinalists() external view returns (uint256[] memory) {
        return finalists;
    }

    function getfinalistsAmount() external view returns (uint256[] memory) {
        return finalistsAmounts;
    }

    /**
     * @dev allow artists to create submissions
     * Require artist to transfer userDeposit, and to transfer NFTs
     * @param nfts Array of 3 nfts to transfer to the contract
     **/
    function createSubmission(uint256[3] memory nfts) external checkFunds {
        require(
            block.timestamp < submissionEndTime,
            "Can not add submissions during the fan voting period"
        );
        require(
            token.transferFrom(msg.sender, address(this), userDeposit),
            "trandferFrom failed, submission not backed by funds!"
        );
        for (uint256 i = 0; i < 3; i++) {
            nft.transferFrom(msg.sender, address(this), nfts[i]); //Transfer them to the contract Think we need to do a require, we could require the nft owner is the conrtact?
            submissions[submissionCount].nftList.push(nfts[i]);
        }
        User memory artist = User({user: msg.sender, amount: userDeposit});
        submissions[submissionCount].userIndex[msg.sender] = 0; //Set artist as the 0 index
        submissions[submissionCount].userCount++;
        submissions[submissionCount].users.push(artist);
        emit SubmissionCreated(address(this), poolName, brandName, submissionCount, msg.sender, nfts);
        submissionCount++;
    }

    /**
     * @dev allow fans to vote on submissions
     * Require caller transfers userDeposit to contract
     * @param _submissionNumber the number of the submission the fan wants to vote for
     **/
    function fanVote(uint256 _submissionNumber) external onlyFans checkFunds {
        //TODO I think its okay to read the zero address of an empty array, I am assuming it returns zero but I need to verify this!
        require(
            msg.sender != submissions[_submissionNumber].users[0].user,
            "Artist can not vote for their own submission!"
        );
        require(
            block.timestamp >= submissionEndTime,
            "Can not start voting until submission period is over!"
        );
        require(
            block.timestamp <= brandVotingEndTime,
            "Fan Voting Period is Over!"
        );
        require(
            submissions[_submissionNumber].nftList[0] > 0,
            "There are no NFTs in this submission!"
        );
        require(
            token.transferFrom(msg.sender, address(this), userDeposit),
            "trandferFrom failed, vote not backed by funds!"
        );

        //Check if the user is already in the submission and thorw an error if they are!
        for (uint256 i = 1; i < submissions[_submissionNumber].userCount; i++) {
            if (msg.sender == submissions[_submissionNumber].users[i].user) {
                require(false, "User has already voted for this submission!");
            }
        }
        // If user isn't in the submission, then add them!
        User memory fan = User({user: msg.sender, amount: userDeposit});
        submissions[_submissionNumber].users.push(fan);
        submissions[_submissionNumber].userCount++;

        //Calculate submission vote count
        uint256 votes =
            (submissions[_submissionNumber].userCount - 1) * userDeposit;

        //Find topten submission with least amount of votes
        uint256 smallStake = topTenAmount[0];
        uint256 indexSmall = 0;
        for (uint256 i = 0; i < 10; i++) {
            if (topTenAmount[i] < smallStake) {
                smallStake = topTenAmount[i];
                indexSmall = i;
            }
        }

        //Check if the submission is already in the top ten
        bool alreadyInTopTen = false;
        for (uint256 i = 0; i < 10; i++) {
            if (topTen[i] == _submissionNumber) {
                alreadyInTopTen = true;
                topTenAmount[i] = votes;
                break;
            }
        }

        //Check if this submissions vote count is greater than the smallest. If it is replace it
        if (!alreadyInTopTen && (votes > topTenAmount[indexSmall])) {
            topTenAmount[indexSmall] = votes;
            topTen[indexSmall] = _submissionNumber;
            emit NewTopTen(address(this), poolName, brandName, topTen);
        }

        emit VoteSubmitted(address(this), poolName, brandName, _submissionNumber, msg.sender, votes);
    }

    /**
     * @dev Function scans through top ten list, and finds entry with lowest vote count
     * then function scans through all submissions and if it finds a submission with
     * an equal vote count to the lowest in the top ten, it adds it to the finalist
     * array.
     * Function also adds top ten list to the finalists array
     * Function also pings RNG contract to generate a new random number for when
     * selectWinner is called
     * ***WARNING unbounded for loop when looking through submissions!!!***
     * Might want to add a hard cap on submissions to avoid this.
     **/
    function checkForTies() external onlyPoolOwner {
        require(
            block.timestamp > fanVotingEndTime,
            "Cannot select top ten until fan voting is over!"
        );
        require(block.timestamp < campaignEndTime, "Decision period is over!");
        require(!checkedForTies, "Already checked for ties");

        uint256 smallStake = topTenAmount[0];
        uint256 indexSmall = 0;
        for (uint256 i = 0; i < 10; i++) {
            finalists.push(topTen[i]);
            finalistsAmounts.push(topTenAmount[i]);
            finalistsCount++;
            if (topTenAmount[i] < smallStake) {
                smallStake = topTenAmount[i];
                indexSmall = i;
            }
        }
        uint256 tmpAmount;
        bool inTopTen;
        for (uint256 i = 1; i < submissionCount; i++) {
            tmpAmount = (submissions[i].userCount - 1) * userDeposit;
            if (smallStake == tmpAmount) {
                inTopTen = false;
                for (uint256 j = 0; j < 10; j++) {
                    //Only want to check if it is in the first top ten, don't need to go through all finalists!
                    if (finalists[j] == i) {
                        inTopTen = true;
                        break;
                    }
                }
                if (!inTopTen) {
                    finalists.push(i);
                    finalistsAmounts.push(tmpAmount);
                    finalistsCount++;
                }
            }
        }
        checkedForTies = true;
        rng.getRandomNumber(block.timestamp);
        emit SeeFinalists(address(this), poolName, brandName, finalists);
    }

    /**
     * @dev Function to choose the winning submission, create a settling contract, and choose a lucky fan
     * @param submissionIndex index of the winning submission
     * TODO Remove reward distribution and instead create a settling contract
     **/
    function selectWinner(uint256 submissionIndex) external onlyPoolOwner {
        require(!winnerSelected, "Already selected winner!");
        require(
            block.timestamp > campaignEndTime,
            "Can only choose a winner after the campaign is over!"
        );
        require(checkedForTies, "You have to call checkForTies first!");
        winnerSelected = true;
        bool winnerInTopTen;
        for (uint256 i = 0; i < finalistsCount; i++) {
            if (submissionIndex == finalists[i]) {
                winnerInTopTen = true;
                break;
            }
        }
        require(
            winnerInTopTen,
            "You must select a winner from the top ten list!"
        );
        winningSubmission = submissionIndex;
        //distribute awards
        /*
        nft.transferFrom(
            address(this),
            submissions[winningSubmission].users[0].user,
            submissions[winningSubmission].nftList[0]
        );
        uint256 winnerIndex =
            (rng.seeRandomNumber() %
                (submissions[submissionIndex].userCount - 1)) + 1;
        address luckyFan = submissions[submissionIndex].users[winnerIndex].user;
        nft.transferFrom(
            address(this),
            luckyFan,
            submissions[winningSubmission].nftList[1]
        );
        nft.transferFrom(
            address(this),
            poolOwner,
            submissions[winningSubmission].nftList[2]
        );
        token.transfer(poolOwner, funds);
        */
        emit WinnerSelected(address(this), poolName, brandName, winningSubmission);
    }

    /**
     * @dev Function allows artists and fans to cashout from their submissions
     **/
    function cashout(uint256 _submissionNumber) external {
        require(
            block.timestamp > campaignEndTime,
            "Can not cashout until campaign is over!"
        );
        require(
            msg.sender != poolOwner,
            "Pool Owner must cashout via settling contract"
        );
        require(_submissionNumber != 0, "There is no zero submission!");
        bool userFound;
        uint256 index;
        for (uint256 i = 0; i < submissions[_submissionNumber].userCount; i++) {
            if (submissions[_submissionNumber].users[i].user == msg.sender) {
                userFound = true;
                index = i;
                break;
            }
        }
        uint256 tmpBal = submissions[_submissionNumber].users[index].amount;
        submissions[_submissionNumber].users[index].amount = 0;
        if (userFound && index == 0) {
            //This is an artist that needs to withdraw funds and NFTS
            //Send back their NFTs if they arent the winner, and their funds. If they are the winner then just send back the funds
            require(token.transfer(msg.sender, tmpBal));
            if (_submissionNumber != winningSubmission) {
                for (uint256 i = 0; i < 3; i++) {
                    nft.transferFrom(
                        address(this),
                        msg.sender,
                        submissions[_submissionNumber].nftList[i]
                    ); //Transfer them to the contract Think we need to do a require, we could require the nft owner is the conrtact?
                }
                submissions[_submissionNumber].nftList = [0, 0, 0]; //Set the nftList equal to a list of zeroes
            }
        } else if (userFound) {
            //This is a fan that just needs their tokens back
            require(token.transfer(msg.sender, tmpBal));
        } else {
            require(false, "User was not found in submission!");
        }
        emit CashedOut(address(this), poolName, brandName, _submissionNumber, msg.sender);
    }
}
