import Image from 'next/image';
import Link from 'next/link';

interface LinksProps {
  image: string;
  text: string;
  href: string;
}

export default function Links(props:LinksProps) {
  return (
    <>
      <Link href={props.href} target="_blank">
        <div className="flex items-center text-center gap-4">
          <Image src={props.image} alt="Imagem" />
          <span className="font-merriweather font-normal text-[13px] text-[#837E9F]">{props.text}</span>
        </div>
      </Link>
    </>
  )
}