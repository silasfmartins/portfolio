"use client";

import { Link2, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { Button } from "@/components/ui";

interface ShareProjectProps {
  title: string;
}

export function ShareProject({ title }: ShareProjectProps) {
  const t = useTranslations("SlugProjects");

  async function handleCopy() {
    await navigator.clipboard.writeText(window.location.href);
    toast.success(t("linkCopied"));
  }

  function handleWhatsapp() {
    const text = encodeURIComponent(`${title}: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener");
  }

  return (
    <>
      <Button onClick={handleCopy} variant="overlayOutline">
        <Link2 />
        {t("copyLink")}
      </Button>
      <Button onClick={handleWhatsapp} variant="overlayOutline">
        <Share2 />
        {t("shareWhatsapp")}
      </Button>
    </>
  );
}
