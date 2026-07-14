import { useEffect } from "react";
import faviconImage from "figma:asset/3ed66585703accd1fb782894b7387ddb00993102.png";

export function HeadMeta() {
  useEffect(() => {
    // Set favicon
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    
    link.href = faviconImage;
    
    // Also set apple-touch-icon for iOS devices
    let appleTouchIcon: HTMLLinkElement | null = document.querySelector("link[rel='apple-touch-icon']");
    
    if (!appleTouchIcon) {
      appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      document.head.appendChild(appleTouchIcon);
    }
    
    appleTouchIcon.href = faviconImage;
    
    // Set meta description
    let metaDescription: HTMLMetaElement | null = document.querySelector("meta[name='description']");
    
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    
    metaDescription.content = "MCRC Tax and Accounting Services - Empowering entrepreneurs with comprehensive tax, accounting, and advisory services in Marikina City.";
    
    // Set viewport meta if not exists
    let metaViewport: HTMLMetaElement | null = document.querySelector("meta[name='viewport']");
    
    if (!metaViewport) {
      metaViewport = document.createElement("meta");
      metaViewport.name = "viewport";
      metaViewport.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(metaViewport);
    }
  }, []);
  
  return null;
}
