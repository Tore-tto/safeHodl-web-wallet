export const SALT=21

export const ENTRYPOINT = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
export const PAYMASTER_ADDRESS = "0xDd74396fb58c32247d8E2410e853a73f71053252";
export const SECP256R1_VERIFIER = "0x82bAB0eC021A8B1064F70701dAf671bAcb969798";

export const chainIdandType = {
    "0xaa36a7": "sepolia",
    "0x13882": "amoy"
  }

export const chainInfo = {
    sepolia: {
        LOUICE_FACTORY: "0x795b7F055dE5b1652E88EE0A6b84eabA09E7Eff5",
        USER_OP_RPC_URL: "http://0.0.0.0:14337/rpc"
    },
    amoy: {
        LOUICE_FACTORY: "0x795b7F055dE5b1652E88EE0A6b84eabA09E7Eff5",
        USER_OP_RPC_URL: "https://bundler.beldex.dev/rpc"
    }
}