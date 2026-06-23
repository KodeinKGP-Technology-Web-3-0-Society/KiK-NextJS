/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://github.com/kodeinkgp/Photos/blob/main/**?raw=true"),
      new URL("https://**.githubusercontent.com/**"),
      new URL(
        "https://github.com/KodeinKGP-Technology-Web-3-0-Society/Photos/blob/main/2025_SETS/**?raw=true"
      ),
      new URL(
        "https://github.com/KodeinKGP-Technology-Web-3-0-Society/Photos/blob/main/Heads%2726/**?raw=true"
      ),
    ],
  },
};

export default nextConfig;
