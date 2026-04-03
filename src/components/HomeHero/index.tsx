"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { techBadgeAnimation } from "@/lib/animations";
import type { HomePageInfo } from "@/types/page-info";
import { Button } from "../Button";
import { CMSIcon } from "../CMSIcon";
import { RichText } from "../RichText";
import { TechBadge } from "../TechBadge";

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
              <h1 className="font-display font-semibold text-4xl text-foreground leading-tight sm:text-5xl">
                Silas Martins
              </h1>
              <div className="text-lg text-muted-foreground">
                <Typewriter
                  options={{
                    strings: [role],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>

            <div className="max-w-2xl text-balance text-sm sm:text-base">
              <RichText content={homeInfo.introduction.raw} />
            </div>

            <div className="flex flex-wrap gap-2">
              {homeInfo.technologies.map((tech, index) => (
                <TechBadge
                  key={`intro-tech-${tech.name}`}
                  name={tech.name}
                  {...techBadgeAnimation}
                  transition={{ duration: 0.25, delay: index * 0.06 }}
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                    href={contact.url}
                    key={contact.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <CMSIcon icon={contact.iconSvg} />
                  </a>
                ))}

                <a
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
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
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mx-auto w-full max-w-[420px]"
            initial={{ opacity: 0, y: 50, scale: 0.92 }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/25 via-cyan-400/15 to-transparent blur-2xl" />
              <Image
                alt="Foto de perfil Silas Martins"
                className="h-[320px] w-full rounded-[1.7rem] border border-border/70 object-cover shadow-[0_24px_60px_-40px_rgba(15,23,42,0.7)] sm:h-[420px]"
                height={404}
                priority
                src={homeInfo.profilePicture.url}
                width={420}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
