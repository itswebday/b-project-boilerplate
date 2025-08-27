import type { LocaleOption } from "@/types";
import type { Config } from "@/payload-types";
import configPromise from "@/payload.config";
import { unstable_cache } from "next/cache";
import { getPayload } from "payload";

type Global = keyof Config["globals"];

export const getGlobal = async <GlobalType extends Global>(
  slug: GlobalType,
  locale: LocaleOption,
) => {
  const payload = await getPayload({ config: configPromise });
  const global = await payload.findGlobal({
    slug: slug,
    depth: 1,
    locale: locale,
  });

  return global;
};

export const getCachedGlobal = (slug: Global, locale: LocaleOption) => {
  return unstable_cache(() => getGlobal(slug, locale), [slug], {
    tags: [`global_${slug}`],
  });
};
