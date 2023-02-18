const { expect } = require("chai");
const { ethers } = require("hardhat");
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

    RNG = await ethers.getContractFactory("RandomNumberConsumer");
    rng = await RNG.deploy();
    await rng.deployed();

    PoolFactory = await ethers.getContractFactory("PoolFactory");
    poolfactory = await PoolFactory.deploy(twitterverify.address, mockERC20.address, rng.address); // mockERC20.address is subbing in for the link contract
    await poolfactory.deployed();

    await rng.transferOwnership(poolfactory.address);

});

describe("PoolFactory Revert Tests", function() {
    it("Should revert when non owner calls setTwitterVerifyAddress()", async function() {
        await expect( poolfactory.connect(addr2).setTwitterVerifyAddress("0")).to.be.reverted;
    });

    it("Should revert when non owner calls changePoolCreationBool()", async function() {
        await expect( poolfactory.connect(addr2).changePoolCreationBool(true)).to.be.reverted;
    });

    it("Should revert when creatPool() is called, but pool creation is disabled", async function() {
        await poolfactory.changePoolCreationBool(false);
        await mockERC20.connect(brand).approve(poolfactory.address, "100000000000000000"); // Approve the pool contract to spend 0.1 mockERC20 tokens(which are subsituting for link)
        await expect( poolfactory.connect(brand).createPool("Tesla Pool", "1000000000000000000000", mockERC20.address, mockERC721.address, "300", "100", "100", "100")).to.be.reverted;
    });
});

describe("PoolFactory Function Tests", function() {
    it("Test creating a pool, and reading its name", async function() {
        await poolfactory.changePoolCreationBool(true);
        await mockERC20.connect(brand).approve(poolfactory.address, "100000000000000000"); // Approve the pool contract to spend 0.1 mockERC20 tokens(which are subsituting for link)
        await poolfactory.connect(brand).createPool("Tesla Pool", "1000000000000000000000", mockERC20.address, mockERC721.address, "300", "100", "100", "100");
        const poolAddress = await poolfactory.getPoolAddress(0);
        const Pool = await ethers.getContractFactory("Pool");
        const pool = await Pool.attach(poolAddress);
        expect(await pool.getName()).to.equal("Tesla Pool");
    });
});



