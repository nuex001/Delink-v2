import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { http, createConfig, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";
import ReactDOM from "react-dom/client";
import App from "./App";

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>{<App />}</QueryClientProvider>
  </WagmiProvider>
);
