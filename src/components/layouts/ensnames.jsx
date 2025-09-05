import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import axios from "axios";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const toTitleCase = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// export const fetchEnsDomain = async (ensName) => {
//   const keys = [
//     "com.twitter",
//     "com.github",
//     "org.telegram",
//     "com.discord",
//     "xyz.lens",
//     "xyz.farcaster",
//     "avatar",
//     "description",
//     "url",
//     "email",
//   ];

//   try {
//     const results = {};
//     for (const key of keys) {
//       const text = await publicClient.getEnsText({
//         name: normalize(ensName),
//         key,
//       });
//       // remove "com." / "org." / "xyz." prefixes
//       const cleanKey = key.replace(/^(com\.|org\.|xyz\.)/, "");

//       // Title Case the key
//       results[toTitleCase(cleanKey)] = text;
//     }

//     // console.log("ENS Records:", results);
//     return results;
//   } catch (error) {
//     console.error("Error fetching ENS text:", error);
//     return null;
//   }
// };

export const fetchEnsDomain = async (ensName) => {
  try {
    const response =
      await axios.get(`https://api.ethfollow.xyz/api/v1/users/${ensName}/ens
`);
    const statsResponse =
      await axios.get(`https://api.ethfollow.xyz/api/v1/users/${ensName}/stats

`);

    const rawData = response.data;

    if (!rawData || !rawData.ens) return null;

    const statsResponseData = statsResponse.data;
    // console.log(statsResponseData,rawData);

    const { ens } = rawData;
    // Format the ENS data nicely
    const formattedData = {
      Address: ens.address,
      Name: ens.name || null,
      Avatar: ens.avatar || null,
      Header: ens.records?.header || null,
      Description: ens.records?.description || null,
      Status: ens.records?.status || null,
      Url: ens.records?.url || null,
      Email: ens.records?.email || null,
      Twitter: ens.records?.["com.twitter"] || null,
      Github: ens.records?.["com.github"] || null,
      Telegram: ens.records?.["org.telegram"] || null,
      Lens: ens.records?.["xyz.lens"] || null,
      Farcaster: ens.records?.["xyz.farcaster"] || null,
      Discord: ens.records?.["com.discord"] || null,
      updatedAt: ens.updated_at || null,
      followers_count: statsResponseData.followers_count || 0,
      following_count: statsResponseData.following_count || 0,
    };

    return formattedData;
  } catch (error) {
    console.error("Error fetching ENS text:", error);
    return null;
  }
};
