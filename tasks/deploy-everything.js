
const fs = require('fs');
const path = require('path');
const { task } = require("hardhat/config");


/**
 * Resets the deployment directory.
 * @param hre The hardhat runtime environment.
 * @returns {Promise<void>} Nothing (async function).
 */
async function resetDeployments(hre) {
    const chainId = (await hre.ethers.provider.getNetwork()).chainId;
    const deploymentDir = path.join(__dirname, '..', 'ignition', 'deployments', `chain-${chainId}`);

    console.log("Checking/cleaning deployment directory " + deploymentDir + "...");
    if (fs.existsSync(deploymentDir)) {
        switch(hre.network.name) {
            case "hardhat":
            case "localhost":
                console.log("Removing directory " + deploymentDir + "...");
                fs.rmdirSync(deploymentDir, { recursive: true });
                break;
            case "mainnet":
            case "testnet":
                console.warn(
                    "A deployment is already set for network: " + hre.network.name + ", " +
                    "which is located at directory: " + deploymentDir + ". If you want to re-deploy " +
                    "these contracts, delete those directories manually. I'll not do that for you " +
                    "for those networks (I'll only do that locally)."
                );
                break;
        }
    }
}


task("deploy-everything", "Deploys all our ecosystem")
    // .addOptionalParam("owner", "An address that will be considered the master/owner of the system (specially useful in local)")
    .setAction(async ({ /*owner*/ }, hre, runSuper) => {
        /**
         * Assuming that your hardhat configuration tolerates N accounts,
         * you can pick idx between 0 and N-1 and get the address of that
         * account:
         *
         *    const account = (await hre.ethers.getSigners())[idx]
         *
         * Deploy an ignition module like this. Internally, this means that
         * we have a SomeModule module imported which returns future objects,
         * concretely a value { someValue, ... }.
         *
         * Its implementation relies on the module requiring some parameters:
         *
         *     let foo = m.getParameter("foo", 0);
         *     let bar = m.getParameter("bar", "one");
         *
         * Then you'd import this module as:
         *
         *     const SomeModule = require("../ignition/modules/SomeModule");
         *
         * const { someValue, ... } = await hre.ignition.deploy(SomeModule, {
         *     parameters: {
         *         "SomeModule": {
         *             "foo": 1,
         *             "bar": "two",
         *             ...
         *         },
         *         ...
         *     }
         * });
         *
         * // If someValue is a Contract (ethers.js-created contract), you can
         * // the address:
         * let someValueAddress = await someValue.getAddress();
         *
         * // You can also invoke a method (be it view or mutating):
         * let result = await someValue.someMethod(params...)
         *
         * // And also specify values like amount of money and/or an account
         * // that comes from getSigners() like the one at the beginning:
         * //
         * // (the amount is expressed in wei units)
         *
         * let result = await someValue.someMethod(params..., {from: account, value: ...}).
         */
    });