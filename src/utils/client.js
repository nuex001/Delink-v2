import { http, createPublicClient } from "viem";
import { base } from "viem/chains"; // Make sure 'base' is the correct chain you want
import { normalize } from "viem/ens";

export const publicClient = createPublicClient({
  chain: base, // Use the chain you need (e.g., 'mainnet', 'base', etc.)
  transport: http(),
});
