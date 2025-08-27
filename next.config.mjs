import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

/** Initialize next-intl plugin */
const withNextIntl = createNextIntlPlugin();

/** Your base Next.js config */
const baseConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // TODO: Change to correct domain
        hostname: "website.com",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "https",
        // TODO: Change to correct domain
        hostname: "website.vercel.app",
        pathname: "/api/media/file/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/api/media/file/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            // TODO: Change to correct domain
            value: "website.com",
          },
        ],
        // TODO: Change to correct domain
        destination: "https://www.website.com/:path*",
        permanent: true,
      },
    ];
  },
};

/** Compose the plugins */
const combinedConfig = withNextIntl(
  withPayload(baseConfig, {
    devBundleServerPackages: false,
  }),
);

export default combinedConfig;
