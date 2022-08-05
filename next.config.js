const nextConfig = {
  images: {
    domains: [
      // Placeholder images (skeleton)
      "via.placeholder.com",
    ],
  },
  pageExtensions: ["api.js", "page.js", "page.jsx"],
  reactStrictMode: true,
  redirects: async () => {
    return [];
  },
};

module.exports = nextConfig;
