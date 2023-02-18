/*
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");
*/
/*
 *Looks like initial contract calls are executed from the owner account
 *After that, you can do storage.connect(addr1).functionName();
 *So I think if you don't specify connect, then it just assumes you want to use the deployer account(owner) 
 * Also I can add 'before', 'beforeEach', 'after', 'afterEach'
 * Can also interact with existing contract deployments
 * First line with getContractFactory is the same, but on the second line replace Storage.deploy() with Storage.attach("ADDRESS OF EXISTING CONTRACT")
 * console.log(await ethers.provider.getBlockNumber()); <---- How to get the current block number
 * await network.provider.send("evm_increaseTime", [150]); //Move the next blocks timestamp forward by 150
 * await network.provider.send("evm_mine"); 
 * ^^^^^How to advance block time
 * 
 * await network.provider.send("evm_setNextBlockTimestamp", [1625097600])
 * await network.provider.send("evm_mine")
 * ^^^^^ How to set the timestamp of the next block
 */
/*
 //Declare variables to be assigned in the beforeEach callback
let Storage;
let storage;
let owner;
let addr1;
let addr2;
let addr3;

beforeEach(async function () {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();

    Storage = await ethers.getContractFactory("Storage");
    storage = await Storage.deploy();
    await storage.deployed();
    //console.log(storage.address);
});

describe("Storage Functionality Tests", function() {

    it("Owner address should be deployer address", async function() {
        expect( await storage.owner()).to.equal(owner.address);
    });

    it("Should revert when 0 is passed into store()", async function() {
        await expect( storage.store("0")).to.be.reverted;
    });

    it("Should return 0, then 89544835938 only callable by Owner", async function() {
        expect((await storage.retrieve()).toString()).to.equal("0");
        await storage.store("89544835938");
        expect((await storage.retrieve()).toString()).to.equal("89544835938");
    });

    it("Should revert when non owner calls store(), but allow owner to call store()", async function() {
        await expect(storage.connect(addr1).store("89544835938")).to.be.reverted;
        await storage.store("89544835938");
        expect((await storage.retrieve()).toString()).to.equal("89544835938");
    });
});

    describe("Storage Revert Tests", function() {

        it("Owner address should be deployer address", async function() {
            expect( await storage.owner()).to.equal(owner.address);
        });
    
        it("Should revert when 0 is passed into store()", async function() {
            await expect( storage.store("0")).to.be.reverted;
        });
    
        it("Should return 0, then 89544835938 only callable by Owner", async function() {
            expect((await storage.retrieve()).toString()).to.equal("0");
            await storage.store("89544835938");
            expect((await storage.retrieve()).toString()).to.equal("89544835938");
        });
    
        it("Should revert when non owner calls store(), but allow owner to call store()", async function() {
            await expect(storage.connect(addr1).store("89544835938")).to.be.reverted;
            await storage.store("89544835938");
            expect((await storage.retrieve()).toString()).to.equal("89544835938");
        });
});
*/