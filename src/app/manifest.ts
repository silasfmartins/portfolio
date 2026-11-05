import type { MetadataRoute } from "next";

import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#0f131a",
    description:
      "Portfólio com projetos, experiência e trajetória em tecnologia.",
    display: "standalone",
    icons: [
      { sizes: "192x192", src: "/icons/icon-192.png", type: "image/png" },
      { sizes: "512x512", src: "/icons/icon-512.png", type: "image/png" },
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "/icons/maskable-512.png",
        type: "image/png",
      },
    ],
    name: SITE_NAME,
    short_name: SITE_NAME,
    start_url: "/",
    theme_color: "#0f131a",
  };
}
