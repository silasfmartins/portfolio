"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { Button, buttonVariants } from "@/components/ui";
import { techBadgeAnimation } from "@/lib/animations";
import type { HomePageInfo } from "@/types/page-info";
import { CMSIcon } from "../CMSIcon";
import { RichText } from "../RichText";
import { TechBadge } from "../TechBadge";

const SOCIAL_NAMES: Record<string, string> = {
  "github.com": "GitHub",
  "linkedin.com": "LinkedIn",
  "wa.me": "WhatsApp",
};

/** The CMS only stores the URL, so the link name comes from its host. */
function getSocialLabel(url: string) {
  const host = new URL(url).hostname.replace("www.", "");
  return SOCIAL_NAMES[host] ?? host;
}

interface HeroHomeProps {
  button1: string;
  homeInfo: HomePageInfo;
  role: string;
}

export function HomeHero({ homeInfo, role, button1 }: HeroHomeProps) {
  function handleContact() {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45 }}
          >
            <div className="space-y-3">
              <h1 className="font-display text-foreground text-4xl leading-tight font-semibold sm:text-5xl">
                Silas Martins
              </h1>
              <div className="text-muted-foreground text-lg">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                    strings: [role],
                  }}
                />
              </div>
            </div>

            <div className="max-w-2xl text-sm text-balance sm:text-base">
              <RichText content={homeInfo.introduction.raw} />
            </div>

            <div className="flex flex-wrap gap-2">
              {homeInfo.technologies.map((tech, index) => (
                <TechBadge
                  key={`intro-tech-${tech.name}`}
                  name={tech.name}
                  {...techBadgeAnimation}
                  transition={{ delay: index * 0.06, duration: 0.25 }}
                />
              ))}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button className="w-fit" onClick={handleContact}>
                {button1}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <div className="flex items-center gap-2">
                {homeInfo.socials.map((contact) => (
                  <a
                    aria-label={getSocialLabel(contact.url)}
                    className={buttonVariants({
                      size: "icon",
                      variant: "social",
                    })}
                    href={contact.url}
                    key={contact.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <CMSIcon icon={contact.iconSvg} />
                  </a>
                ))}

                <a
                  aria-label="Email"
                  className={buttonVariants({
                    size: "icon",
                    variant: "social",
                  })}
                  href="mailto:silas.martins2041@gmail.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mx-auto w-full max-w-[420px]"
            initial={{ opacity: 0, scale: 0.92, y: 50 }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            <div className="relative isolate">
              <div className="from-primary/25 via-primary/10 absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br to-transparent blur-2xl" />
              <Image
                alt="Foto de perfil Silas Martins"
                className="border-border/70 shadow-elevated h-[320px] w-full rounded-[1.7rem] border object-cover sm:h-[420px]"
                height={404}
                priority
                src={homeInfo.profilePicture?.url ?? "/images/hero-bg.png"}
                width={420}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
