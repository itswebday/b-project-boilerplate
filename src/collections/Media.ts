import { anyone, authenticated } from "@/access";
import path from "path";
import type { CollectionConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media asset",
    plural: "Media assets",
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "small",
        width: 550,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 2000,
      },
      {
        name: "openGraph",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
  },
};
