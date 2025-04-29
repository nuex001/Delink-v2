export const resolveIpfsUrl = (ipfsUrl, gateway = "https://ipfs.io/ipfs/") => {
  return ipfsUrl.startsWith("ipfs://")
    ? gateway + ipfsUrl.replace("ipfs://", "")
    : ipfsUrl;
};

// Helper function
export const getIconAndLabel = (url) => {
  if (!url) return { icon: null, label: "" };

  if (url.includes("instagram")) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-instagram"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      label: "Instagram",
    };
  }

  if (url.includes("youtube")) {
    return {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          class="lucide lucide-youtube-icon lucide-youtube"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </svg>
      ),
      label: "YouTube",
    };
  }

  return {
    icon: (
      <svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="icon"
      >
        <path
          d="M8 0C3.58667 0 0 3.58667 0 8C0 12.4133 3.58667 16 8 16C12.4133 16 16 12.4133 16 8C16 3.58667 12.4133 0 8 0ZM13.8933 7H11.6267C11.5467 5.36 11.2133 3.86667 10.7333 2.69333C12.3867 3.54667 13.5733 5.12 13.8933 7ZM8 13.9733C7.52 13.64 6.56 11.9333 6.37333 9H9.62667C9.44 11.92 8.48 13.64 8 13.9733ZM6.37333 7C6.56 4.08 7.52 2.36 8 2.02667C8.48 2.36 9.44 4.06667 9.62667 7H6.37333ZM5.26667 2.69333C4.78667 3.86667 4.46667 5.36 4.37333 7H2.10667C2.42667 5.12 3.61333 3.54667 5.26667 2.69333ZM2.10667 9H4.37333C4.45333 10.64 4.78667 12.1333 5.26667 13.3067C3.61333 12.4533 2.42667 10.88 2.10667 9ZM10.7333 13.3067C11.2133 12.1333 11.5333 10.64 11.6267 9H13.8933C13.5733 10.88 12.3867 12.4533 10.7333 13.3067Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    label: "Website",
  };
};
