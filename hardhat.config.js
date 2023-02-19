const fs = require("fs");
require("@nomiclabs/hardhat-waffle");

const privetKey = fs.readFileSync(".secret").toString().trim();
module.exports = {
    network: {
        hardhat: {
            chainId: 1337,
        },
    },
    solidity: "0.8.4",
};
