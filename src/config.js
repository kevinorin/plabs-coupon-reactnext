import packageJson from "../package.json";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
if (!apiUrl) {
  throw new Error("API url is missing!");
}

let gitHash = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA;
gitHash = gitHash?.slice(0, 6) ?? "N/A";

const production = process.env.NODE_ENV === "production";
const sandboxApi = apiUrl.includes("sandbox");

const webConfig = {
  api: {
    url: apiUrl,
    walletSuffix: sandboxApi ? "testnet" : "near",
  },
  app: {
    envName: process.env.NEXT_PUBLIC_ENV_NAME ?? "development",
    gitHash,
    production,
    version: packageJson.version,
  },
  links: {
    primeLabHome: "https://primelab.io",
  },
};

export default webConfig;
