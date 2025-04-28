import {
  createPublicClient,
  encodePacked,
  http,
  keccak256,
  namehash,
} from "viem";
import { base, mainnet } from "viem/chains";
import { L2ResolverAbi } from "../../utils/constant";

//   export type Basename = `${string}.base.eth`;

export const BASENAME_L2_RESOLVER_ADDRESS =
  "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";

export const BasenameTextRecordKeys = {
  Description: "description",
  Keywords: "keywords",
  Url: "url",
  Url2: "url2",
  Url3: "url3",
  Email: "email",
  Phone: "phone",
  Github: "com.github",
  Twitter: "com.twitter",
  Farcaster: "xyz.farcaster",
  Lens: "xyz.lens",
  Telegram: "org.telegram",
  Discord: "com.discord",
  Avatar: "avatar",
};

const baseClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

export function buildBasenameTextRecordContract(basename, key) {
  return {
    abi: L2ResolverAbi,
    address: BASENAME_L2_RESOLVER_ADDRESS,
    args: [namehash(basename), key],
    functionName: "text",
  };
}

// Get a single TextRecord
export async function getBasenameTextRecord(basename, key) {
  try {
    const contractParameters = buildBasenameTextRecordContract(basename, key);
    const textRecord = await baseClient.readContract(contractParameters);
    return textRecord;
  } catch (error) {}
}

export async function getBasenameAvatar(basename) {
  try {
    // Use the same approach as `getBasenameTextRecord` to fetch the avatar
    const avatar = await getBasenameTextRecord(
      basename,
      BasenameTextRecordKeys.Avatar
    );
    return avatar;
  } catch (error) {
    console.error("Error fetching avatar:", error);
    return null; // Handle this more gracefully if needed
  }
}

// Get a all TextRecords
export async function getBasenameTextRecords(basename) {
  try {
    // Use Object.keys to get an array of keys from BasenameTextRecordKeys object
    const readContracts = Object.keys(BasenameTextRecordKeys).map((key) => {
      // Map over the keys to build the contract calls
      return buildBasenameTextRecordContract(
        basename,
        BasenameTextRecordKeys[key]
      );
    });

    // Perform multicall to fetch text records
    const textRecords = await baseClient.multicall({
      contracts: readContracts,
    });

    // Log the fetched text records for debugging purposes
    console.log("Fetched text records:", textRecords);

    // Map the response to the corresponding BasenameTextRecordKeys
    const mappedTextRecords = textRecords.reduce((acc, current, index) => {
      // Get the key from BasenameTextRecordKeys by index
      const key = Object.keys(BasenameTextRecordKeys)[index];
      // Assign the result to the corresponding key
      acc[key] = current.result;
      return acc;
    }, {});

    // Log the mapped text records for debugging
    console.log("Mapped Text Records:", mappedTextRecords);

    return mappedTextRecords;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching text records:", error);
    return null; // Return null in case of error, or handle as needed
  }
}
/**
 * Convert an chainId to a coinType hex for reverse chain resolution
 */
export const convertChainIdToCoinType = (chainId) => {
  // L1 resolvers to addr
  if (chainId === mainnet.id) {
    return "addr";
  }

  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};

/**
 * Convert an address to a reverse node for ENS resolution
 */
export const convertReverseNodeToBytes = (address, chainId) => {
  const addressFormatted = address.toLocaleLowerCase();
  const addressNode = keccak256(addressFormatted.substring(2));
  const chainCoinType = convertChainIdToCoinType(chainId);
  const baseReverseNode = namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`
  );
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode])
  );
  return addressReverseNode;
};

export async function getBasename(address) {
  try {
    const addressReverseNode = convertReverseNodeToBytes(address, base.id);
    const basename = await baseClient.readContract({
      abi: L2ResolverAbi,
      address: BASENAME_L2_RESOLVER_ADDRESS,
      functionName: "name",
      args: [addressReverseNode],
    });
    if (basename) {
      return basename;
    }
  } catch (error) {
    console.error("Error fetching basename text record:", error);
  }
}
