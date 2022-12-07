import Link from "next/link";

import Subtitle from "./Subtitle";

interface SectionsProps {
  href: string;
  title: string;
  text?: string;
}

export default function Sections(props: SectionsProps) {
  return (
    <>
    <Link className="flex" href={props.href} target="_blank">
      <section className="w-[31rem] sm:w-[41.375rem] md:w-[48rem] lg:w-[832px] h-[86px] rounded-[20px] bg-[#302F3D] p-10 flex justify-between items-center shadow-sm">
        <h2 className="font-merriweather font-bold text-xl text-[#837E9F]">{props.title}</h2>
        <h3 className="font-merriweather font-normal text-sm text-[#837E9F]">{props.text}</h3>
      </section>
    </Link>
    </>
  )
}