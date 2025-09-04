import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const toTitleCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const fetchEnsDomain = async (ensName) => {
  const keys = [
    "com.twitter",
    "com.github",
    "org.telegram",
    "com.discord",
    "xyz.lens",
    "xyz.farcaster",
    "avatar",
    "description",
    "url",
    "email",
  ];

  try {
    const results = {};
    for (const key of keys) {
      const text = await publicClient.getEnsText({
        name: normalize(ensName),
        key,
      });
      // remove "com." / "org." / "xyz." prefixes
      const cleanKey = key.replace(/^(com\.|org\.|xyz\.)/, "");

      // Title Case the key
      results[toTitleCase(cleanKey)] = text;
    }

    // console.log("ENS Records:", results);
    return results;
  } catch (error) {
    console.error("Error fetching ENS text:", error);
    return null;
  }
};
