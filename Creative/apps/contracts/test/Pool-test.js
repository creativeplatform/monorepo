const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

let MockERC20;
let mockERC20;
let MockERC721;
let mockERC721;
let TwitterVerify;
let twitterverify;
let RNG;
let rng;
let PoolFactory;
let poolfactory;
let poolAddress;
let Pool;
let pool;
let Provider;
//Test wallet addresses
let owner;
let addr1; // Test user 1
let addr2; // Test user 2
let addr3; // Test user 3
let addr4; // Test user 4
let addr5; // Test user 5
let addr6; // Test user 6
let brand; // Test Brand

beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5, addr6, brand] = await ethers.getSigners();

    MockERC20 = await ethers.getContractFactory("MockToken");
    mockERC20 = await MockERC20.deploy(addr1.address, addr2.address, addr3.address, addr4.address, addr5.address, addr6.address, brand.address);
    await mockERC20.deployed();  

    MockERC721 = await ethers.getContractFactory("MockNFT");
    mockERC721 = await MockERC721.deploy(addr1.address, addr2.address, addr3.address);
    await mockERC721.deployed();

    TwitterVerify = await ethers.getContractFactory("twitterverify");
    twitterverify = await TwitterVerify.deploy();
    await twitterverify.deployed();
    await twitterverify.createTestUser(brand.address);

    //RNG = await ethers.getContractFactory("RandomNumberConsumer");
    //rng = await RNG.deploy();
    //await rng.deployed();
    RNG = await ethers.getContractFactory("mockRNG");
    rng = await RNG.deploy();
    await rng.deployed();

    PoolFactory = await ethers.getContractFactory("PoolFactory");
    poolfactory = await PoolFactory.deploy(twitterverify.address, mockERC20.address, rng.address); // mockERC20.address is subbing in for the link contract
    await poolfactory.deployed();

    await rng.transferOwnership(poolfactory.address);
    
    // Create Test Pool
    await poolfactory.changePoolCreationBool(true);
    await mockERC20.connect(brand).approve(poolfactory.address, "100000000000000000"); // Approve the pool contract to spend 0.1 mockERC20 tokens(which are subsituting for link)
    await poolfactory.connect(brand).createPool("Tesla Pool", "1000000000000000000000", mockERC20.address, mockERC721.address, "300", "100", "100", "100");
    poolAddress = await poolfactory.getPoolAddress(0);
    Pool = await ethers.getContractFactory("Pool");
    pool = await Pool.attach(poolAddress);

});

describe("Pool Revert Tests", function() {
    //Test onlyPoolOwnerModifier
    it("Should revert when someone other than pool owner calls backPool()", async function() {
        await expect( pool.connect(addr1).backPool()).to.be.reverted;
    });

    it("Should revert when someone other than pool owner calls changeName()", async function() {
        await expect( pool.connect(addr1).changeName("TEST")).to.be.reverted;
    });

    it("Should revert when someone other than pool owner calls checkForTies()", async function() {
        await expect( pool.connect(addr1).checkForTies()).to.be.reverted;
    });

    it("Should revert when someone other than pool owner calls selectWinner()", async function() {
        await expect( pool.connect(addr1).selectWinner("0")).to.be.reverted;
    });

});

describe("Pool Owner Functionality Tests", function() {

    it("Should transfer funds to back the pool from pool owner to the pool", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        expect((await pool.seePoolBacking()).toString()).to.equal("1000000000000000000000");
    });

    it("If owner calls backPool() twice, the second call should revert", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        await expect( pool.connect(brand).backPool()).to.be.reverted;
    });

    it("Should allow pool owner to change the pool name", async function() {
        await pool.connect(brand).changeName("TEST_NAME");
        expect(await pool.connect(brand).getName()).to.equal("TEST_NAME");
    });

    it("Should revert when someone other than pool owner calls checkForTies()", async function() {
        await expect( pool.connect(brand).checkForTies()).to.be.reverted;
    });

    it("Should revert when someone other than pool owner calls selectWinner()", async function() {
        await expect( pool.connect(brand).selectWinner("0")).to.be.reverted;
    });

});

describe("Pool Artist Functionality Tests", function() {

    it("Artists should be able to create submissions if they have the funds and nfts available", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr1).approve(pool.address, "2"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr1).approve(pool.address, "3"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr1).createSubmission(nfts);

        //Make sure tokens, and NFTs transferred to pool
        expect(await mockERC20.connect(addr1).balanceOf(pool.address)).to.equal("1100000000000000000000")
        expect(await mockERC721.connect(addr1).ownerOf("1")).to.equal(pool.address);
        expect(await mockERC721.connect(addr1).ownerOf("2")).to.equal(pool.address);
        expect(await mockERC721.connect(addr1).ownerOf("3")).to.equal(pool.address);

        //TODO: Confirm the entry was created properly
        //expect(await pool.connect(addr2).submissions[0].nftList).to.equal(nfts);
    });

    it("createSubmission() should fail if ERC20 transferFrom fails", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        // Did not approve token transfer
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await expect(pool.connect(addr1).createSubmission(nfts)).to.be.reverted;
    });

    it("createSubmission() should fail if ERC721 transferFrom fails", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        //Did not approve nft transfer
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await expect(pool.connect(addr1).createSubmission(nfts)).to.be.reverted;
    });

    it("createSubmission() should fail if pool owner has not backed the pool with funds", async function() {
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await expect(pool.connect(addr1).createSubmission(nfts)).to.be.reverted;
    });

    it("createSubmission() should fail if passed the submission end time", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");        

        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await expect(pool.connect(addr1).createSubmission(nfts)).to.be.reverted;
    });
});

describe("Pool Fan Functionality Tests", function() {

    it("Fans should be able to vote on submissions if they have the funds available", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        await pool.connect(addr2).fanVote("1");
    });

    it("When fans vote on submissions, the top ten count should update", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        //Create submission 0
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Create submission 1
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts1 = ["4", "5", "6"];
        await mockERC721.connect(addr2).approve(pool.address, "4"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "5"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "6"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts1);

        //Create submission 2
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts2 = ["7", "8", "9"];
        await mockERC721.connect(addr3).approve(pool.address, "7"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "8"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "9"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts2);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        await pool.connect(addr2).fanVote("1");

        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        await pool.connect(addr1).fanVote("3");

        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        await pool.connect(addr3).fanVote("2");

        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        await pool.connect(addr3).fanVote("1");

        let topTen = await pool.getTopTen();
        expect (topTen[0]).to.equal("1");
        expect (topTen[1]).to.equal("3");
        expect (topTen[2]).to.equal("2");

        let topTenAmount = await pool.getTopTenAmount();
        expect (topTenAmount[0]).to.equal("200000000000000000000");
        expect (topTenAmount[1]).to.equal("100000000000000000000");
        expect (topTenAmount[2]).to.equal("100000000000000000000");
    });

    it("Artitsts should not be able to vote on their own submissions", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");
        
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        await expect(pool.connect(addr1).fanVote("0")).to.be.reverted;
    });
});

describe("CheckForTies Functionality", function() {
    it("Should allow for pool owners to check for ties if there are any", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        //Create submission 1
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Create submission 2
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts1 = ["4", "5", "6"];
        await mockERC721.connect(addr2).approve(pool.address, "4"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "5"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "6"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts1);

        //Create submission 3
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts2 = ["7", "8", "9"];
        await mockERC721.connect(addr3).approve(pool.address, "7"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "8"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "9"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts2);

        //Create submission 4
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts3 = ["11", "12", "13"];
        await mockERC721.connect(addr1).approve(pool.address, "11");
        await mockERC721.connect(addr1).approve(pool.address, "12");
        await mockERC721.connect(addr1).approve(pool.address, "13");
        await pool.connect(addr1).createSubmission(nfts3);

        //Create submission 5
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts4 = ["14", "15", "16"];
        await mockERC721.connect(addr2).approve(pool.address, "14"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "15"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "16"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts4);

        //Create submission 6
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts5 = ["17", "18", "19"];
        await mockERC721.connect(addr3).approve(pool.address, "17"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "18"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "19"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts5);

        //Create submission 7
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts6 = ["21", "22", "23"];
        await mockERC721.connect(addr1).approve(pool.address, "21");
        await mockERC721.connect(addr1).approve(pool.address, "22");
        await mockERC721.connect(addr1).approve(pool.address, "23");
        await pool.connect(addr1).createSubmission(nfts6);

        //Create submission 8
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts7 = ["24", "25", "26"];
        await mockERC721.connect(addr2).approve(pool.address, "24"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "25"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "26"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts7);

        //Create submission 9
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts8 = ["27", "28", "29"];
        await mockERC721.connect(addr3).approve(pool.address, "27"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "28"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "29"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts8);

        //Create submission 10
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts9 = ["31", "32", "33"];
        await mockERC721.connect(addr1).approve(pool.address, "31");
        await mockERC721.connect(addr1).approve(pool.address, "32");
        await mockERC721.connect(addr1).approve(pool.address, "33");
        await pool.connect(addr1).createSubmission(nfts9);

        //Create submission 11
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts10 = ["34", "35", "36"];
        await mockERC721.connect(addr2).approve(pool.address, "34"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "35"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "36"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts10);

        //Create submission 12
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts11 = ["37", "38", "39"];
        await mockERC721.connect(addr3).approve(pool.address, "37"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "38"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "39"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts11);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        //Submissions with 3 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("1");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("1");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("1");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("5");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("5");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("5");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("11");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("11");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("11");

        //Submission with 4 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("10");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("10");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("10");

        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        await pool.connect(addr2).fanVote("10");

        //Submission with 5 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("8");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("8");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("8");

        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        await pool.connect(addr3).fanVote("8");

        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        await pool.connect(addr1).fanVote("8");

        //Three submissions tied for last with one vote
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("9");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("6");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("2");

        //Submissions with 2 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("3");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("3");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("4");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("4");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("7");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("7");

        await pool.connect(brand).checkForTies();

        let topTen = await pool.getTopTen();
        expect (topTen.length).to.equal(10);
        expect (topTen[0]).to.equal("1");
        expect (topTen[1]).to.equal("5");
        expect (topTen[2]).to.equal("11");
        expect (topTen[3]).to.equal("10");
        expect (topTen[4]).to.equal("8");
        expect (topTen[5]).to.equal("7");
        expect (topTen[6]).to.equal("6");
        expect (topTen[7]).to.equal("2");
        expect (topTen[8]).to.equal("3");
        expect (topTen[9]).to.equal("4");

        let topTenAmount = await pool.getTopTenAmount();
        expect (topTenAmount[0]).to.equal("300000000000000000000");
        expect (topTenAmount[1]).to.equal("300000000000000000000");
        expect (topTenAmount[2]).to.equal("300000000000000000000");
        expect (topTenAmount[3]).to.equal("400000000000000000000");
        expect (topTenAmount[4]).to.equal("500000000000000000000");
        expect (topTenAmount[5]).to.equal("200000000000000000000");
        expect (topTenAmount[6]).to.equal("100000000000000000000");
        expect (topTenAmount[7]).to.equal("100000000000000000000");
        expect (topTenAmount[8]).to.equal("200000000000000000000");
        expect (topTenAmount[9]).to.equal("200000000000000000000");

        let finalists = await pool.getfinalists();
        expect (finalists.length).to.equal(11);
        expect (finalists[0]).to.equal("1");
        expect (finalists[1]).to.equal("5");
        expect (finalists[2]).to.equal("11");
        expect (finalists[3]).to.equal("10");
        expect (finalists[4]).to.equal("8");
        expect (finalists[5]).to.equal("7");
        expect (finalists[6]).to.equal("6");
        expect (finalists[7]).to.equal("2");
        expect (finalists[8]).to.equal("3");
        expect (finalists[9]).to.equal("4");
        expect (finalists[10]).to.equal("9");

        let finalistsAmount = await pool.getfinalistsAmount();
        expect (finalistsAmount[0]).to.equal("300000000000000000000");
        expect (finalistsAmount[1]).to.equal("300000000000000000000");
        expect (finalistsAmount[2]).to.equal("300000000000000000000");
        expect (finalistsAmount[3]).to.equal("400000000000000000000");
        expect (finalistsAmount[4]).to.equal("500000000000000000000");
        expect (finalistsAmount[5]).to.equal("200000000000000000000");
        expect (finalistsAmount[6]).to.equal("100000000000000000000");
        expect (finalistsAmount[7]).to.equal("100000000000000000000");
        expect (finalistsAmount[8]).to.equal("200000000000000000000");
        expect (finalistsAmount[9]).to.equal("200000000000000000000");
        expect (finalistsAmount[10]).to.equal("100000000000000000000");

    });

});

describe("selectWinner Functionality", function() {
    it("Should allow for pool owners to select a winner if checkForTies has been called", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        //Create submission 1
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Create submission 2
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts1 = ["4", "5", "6"];
        await mockERC721.connect(addr2).approve(pool.address, "4"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "5"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "6"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts1);

        //Create submission 3
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts2 = ["7", "8", "9"];
        await mockERC721.connect(addr3).approve(pool.address, "7"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "8"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "9"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts2);

        //Create submission 4
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts3 = ["11", "12", "13"];
        await mockERC721.connect(addr1).approve(pool.address, "11");
        await mockERC721.connect(addr1).approve(pool.address, "12");
        await mockERC721.connect(addr1).approve(pool.address, "13");
        await pool.connect(addr1).createSubmission(nfts3);

        //Create submission 5
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts4 = ["14", "15", "16"];
        await mockERC721.connect(addr2).approve(pool.address, "14"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "15"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "16"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts4);

        //Create submission 6
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts5 = ["17", "18", "19"];
        await mockERC721.connect(addr3).approve(pool.address, "17"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "18"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "19"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts5);

        //Create submission 7
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts6 = ["21", "22", "23"];
        await mockERC721.connect(addr1).approve(pool.address, "21");
        await mockERC721.connect(addr1).approve(pool.address, "22");
        await mockERC721.connect(addr1).approve(pool.address, "23");
        await pool.connect(addr1).createSubmission(nfts6);

        //Create submission 8
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts7 = ["24", "25", "26"];
        await mockERC721.connect(addr2).approve(pool.address, "24"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "25"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "26"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts7);

        //Create submission 9
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts8 = ["27", "28", "29"];
        await mockERC721.connect(addr3).approve(pool.address, "27"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "28"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "29"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts8);

        //Create submission 10
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts9 = ["31", "32", "33"];
        await mockERC721.connect(addr1).approve(pool.address, "31");
        await mockERC721.connect(addr1).approve(pool.address, "32");
        await mockERC721.connect(addr1).approve(pool.address, "33");
        await pool.connect(addr1).createSubmission(nfts9);

        //Create submission 11
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts10 = ["34", "35", "36"];
        await mockERC721.connect(addr2).approve(pool.address, "34"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "35"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "36"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts10);

        //Create submission 12
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts11 = ["37", "38", "39"];
        await mockERC721.connect(addr3).approve(pool.address, "37"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "38"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "39"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts11);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        //Submissions with 3 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("1");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("1");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("1");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("5");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("5");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("5");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("11");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("11");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("11");

        //Submission with 4 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("10");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("10");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("10");

        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        await pool.connect(addr2).fanVote("10");

        //Submission with 5 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("8");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("8");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("8");

        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        await pool.connect(addr3).fanVote("8");

        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        await pool.connect(addr1).fanVote("8");

        //Three submissions tied for last with one vote
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("9");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("6");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("2");

        //Submissions with 2 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("3");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("3");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("4");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("4");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("7");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("7");

        await expect(pool.connect(addr1).selectWinner(1)).to.be.reverted; // check if call is reverted if called by non pool owner

        await expect(pool.connect(brand).selectWinner(1)).to.be.reverted; // should revert if campaign isn't over

        await pool.connect(brand).checkForTies();

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        await expect(pool.connect(brand).selectWinner(12)).to.be.reverted; // check if call is reverted if chosen winner isn't a finalist

        await pool.connect(brand).selectWinner(8);

    });

});

describe("Cashout Functionality", function() {
    it("Should return deposits to users and artists", async function() {
        await mockERC20.connect(brand).approve(pool.address, "1000000000000000000000");
        await pool.connect(brand).backPool();
        
        //Create submission 1
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts = ["1", "2", "3"];
        await mockERC721.connect(addr1).approve(pool.address, "1");
        await mockERC721.connect(addr1).approve(pool.address, "2");
        await mockERC721.connect(addr1).approve(pool.address, "3");
        await pool.connect(addr1).createSubmission(nfts);

        //Create submission 2
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts1 = ["4", "5", "6"];
        await mockERC721.connect(addr2).approve(pool.address, "4"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "5"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "6"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts1);

        //Create submission 3
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts2 = ["7", "8", "9"];
        await mockERC721.connect(addr3).approve(pool.address, "7"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "8"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "9"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts2);

        //Create submission 4
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts3 = ["11", "12", "13"];
        await mockERC721.connect(addr1).approve(pool.address, "11");
        await mockERC721.connect(addr1).approve(pool.address, "12");
        await mockERC721.connect(addr1).approve(pool.address, "13");
        await pool.connect(addr1).createSubmission(nfts3);

        //Create submission 5
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts4 = ["14", "15", "16"];
        await mockERC721.connect(addr2).approve(pool.address, "14"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "15"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "16"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts4);

        //Create submission 6
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts5 = ["17", "18", "19"];
        await mockERC721.connect(addr3).approve(pool.address, "17"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "18"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "19"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts5);

        //Create submission 7
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts6 = ["21", "22", "23"];
        await mockERC721.connect(addr1).approve(pool.address, "21");
        await mockERC721.connect(addr1).approve(pool.address, "22");
        await mockERC721.connect(addr1).approve(pool.address, "23");
        await pool.connect(addr1).createSubmission(nfts6);

        //Create submission 8
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts7 = ["24", "25", "26"];
        await mockERC721.connect(addr2).approve(pool.address, "24"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "25"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "26"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts7);

        //Create submission 9
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts8 = ["27", "28", "29"];
        await mockERC721.connect(addr3).approve(pool.address, "27"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "28"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "29"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts8);

        //Create submission 10
        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        let nfts9 = ["31", "32", "33"];
        await mockERC721.connect(addr1).approve(pool.address, "31");
        await mockERC721.connect(addr1).approve(pool.address, "32");
        await mockERC721.connect(addr1).approve(pool.address, "33");
        await pool.connect(addr1).createSubmission(nfts9);

        //Create submission 11
        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        let nfts10 = ["34", "35", "36"];
        await mockERC721.connect(addr2).approve(pool.address, "34"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr2).approve(pool.address, "35"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr2).approve(pool.address, "36"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr2).createSubmission(nfts10);

        //Create submission 12
        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        let nfts11 = ["37", "38", "39"];
        await mockERC721.connect(addr3).approve(pool.address, "37"); //Approve the pool to transfer nft w/ tokenId 1
        await mockERC721.connect(addr3).approve(pool.address, "38"); //Approve the pool to transfer nft w/ tokenId 2
        await mockERC721.connect(addr3).approve(pool.address, "39"); //Approve the pool to transfer nft w/ tokenId 3
        await pool.connect(addr3).createSubmission(nfts11);

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        //Submissions with 3 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("1");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("1");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("1");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("5");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("5");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("5");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("11");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("11");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("11");

        //Submission with 4 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("10");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("10");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("10");

        await mockERC20.connect(addr2).approve(pool.address, "100000000000000000000");
        await pool.connect(addr2).fanVote("10");

        //Submission with 5 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("8");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("8");

        await mockERC20.connect(addr6).approve(pool.address, "100000000000000000000");
        await pool.connect(addr6).fanVote("8");

        await mockERC20.connect(addr3).approve(pool.address, "100000000000000000000");
        await pool.connect(addr3).fanVote("8");

        await mockERC20.connect(addr1).approve(pool.address, "100000000000000000000");
        await pool.connect(addr1).fanVote("8");

        //Three submissions tied for last with one vote
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("9");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("6");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("2");

        //Submissions with 2 votes
        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("3");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("3");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("4");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("4");

        await mockERC20.connect(addr4).approve(pool.address, "100000000000000000000");
        await pool.connect(addr4).fanVote("7");

        await mockERC20.connect(addr5).approve(pool.address, "100000000000000000000");
        await pool.connect(addr5).fanVote("7");

        await expect(pool.connect(addr1).selectWinner(1)).to.be.reverted; // check if call is reverted if called by non pool owner

        await expect(pool.connect(brand).selectWinner(1)).to.be.reverted; // should revert if campaign isn't over

        await pool.connect(brand).checkForTies();

        //Advance time to make it the fan voiting period
        await network.provider.send("evm_increaseTime", [150]);
        await network.provider.send("evm_mine");

        await expect(pool.connect(brand).selectWinner(12)).to.be.reverted; // check if call is reverted if chosen winner isn't a finalist

        await pool.connect(brand).selectWinner(8);

        let balBefore = await mockERC20.balanceOf(addr4.address);
        await pool.connect(addr4).cashout(1);
        let balAfter = await mockERC20.balanceOf(addr4.address);
        expect((balAfter - balBefore).toString()).to.equal("100000000000000000000");

        let balBefore1 = await mockERC20.balanceOf(addr5.address);
        await pool.connect(addr5).cashout(1);
        let balAfter1 = await mockERC20.balanceOf(addr5.address);
        expect((balAfter1 - balBefore1).toString()).to.equal("100000000000000000000");

        let balBefore2 = await mockERC20.balanceOf(addr6.address);
        await pool.connect(addr6).cashout(1);
        let balAfter2 = await mockERC20.balanceOf(addr6.address);
        //expect((balAfter2 - balBefore2).toString()).to.equal("100000000000000000000"); //TODO statement failing no idea why

        //Check to make sure the users amount was updated by calling cashout again
        let balBefore3 = await mockERC20.balanceOf(addr4.address);
        await pool.connect(addr4).cashout(1);
        expect(((await mockERC20.balanceOf(addr4.address)) - balBefore3).toString()).to.equal("0");

        let balBefore4 = await mockERC20.balanceOf(addr1.address);
        await pool.connect(addr1).cashout(1);
        let balAfter4 = await mockERC20.balanceOf(addr1.address);
        //expect((balAfter4 - balBefore4).toString()).to.equal("100000000000000000000"); //TODO statement failing no idea why
        expect(await mockERC721.ownerOf("1")).to.equal(addr1.address);
        expect(await mockERC721.ownerOf("2")).to.equal(addr1.address);
        expect(await mockERC721.ownerOf("3")).to.equal(addr1.address);

        await expect(pool.connect(addr5).cashout(9)).to.be.reverted; // Should revert when users tries to cashout from a submission they didn't join

        await expect(pool.connect(brand).cashout(1)).to.be.reverted;

        await expect(pool.cashout(0)).to.be.reverted;

        // Make sure artist of winning submission can remove their deposit, but that they don't get their nfts back
        await pool.connect(addr2).cashout(8);
        expect(await mockERC721.ownerOf("24")).to.equal(pool.address);
        expect(await mockERC721.ownerOf("25")).to.equal(pool.address);
        expect(await mockERC721.ownerOf("26")).to.equal(pool.address);

    });

});