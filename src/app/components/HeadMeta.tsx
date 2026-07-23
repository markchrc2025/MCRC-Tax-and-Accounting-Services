import { useEffect } from "react";

/**
 * Runtime <head> metadata. Favicons and the apple-touch-icon are declared
 * statically in index.html (see /public), so this only ensures the meta
 * description is present.
 */
export function HeadMeta() {
  useEffect(() => {
    let metaDescription: HTMLMetaElement | null = document.querySelector("meta[name='description']");

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.content =
      "MCRC Tax and Accounting Services - Empowering entrepreneurs with comprehensive tax, accounting, and advisory services in Marikina City.";
  }, []);

  return null;
}
