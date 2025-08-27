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

  // Add other config here if needed
  async rewrites() {
    return [
      {
        source: "/:locale/privacybeleid/:path*",
        destination: "/:locale/privacy-policy/:path*",
      },
      {
        source: "/:locale/algemene-voorwaarden/:path*",
        destination: "/:locale/terms-and-conditions/:path*",
      },
    ];
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
      {
        source: "/privacybeleid/:path*",
        destination: "/privacy-policy/:path*",
        permanent: true,
      },
      {
        source: "/nl/privacy-policy/:path*",
        destination: "/nl/privacybeleid/:path*",
        permanent: true,
      },
      {
        source: "/algemene-voorwaarden/:path*",
        destination: "/terms-and-conditions/:path*",
        permanent: true,
      },
      {
        source: "/nl/terms-and-conditions/:path*",
        destination: "/nl/algemene-voorwaarden/:path*",
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
