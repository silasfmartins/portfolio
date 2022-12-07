import Image from 'next/image';
import Link from 'next/link';

import { Count } from './Count';

import elipse from '../assets/elipse.svg';
import gitBranch from '../assets/git-branch.svg';
import folder from '../assets/folder.svg';
import star from '../assets/star.svg';

interface ProjectProps {
  href: string;
  title: string;
  description: string;
  tech: string;
}

export function Project(props: ProjectProps) {

  return (
    <>
      <Link href={props.href} target="_blank">
        <div className="max-w-[461px] h-92 lg:max-h-60 p-10 rounded-[20px] bg-[#302F3D] mt-[31px] gap-4 shadow-sm justify-center text-center items-center">
          <header className="flex justify-left text-left items-left gap-3">
            <Image src={folder} alt="Pasta - Folder" />
            <h4 className="font-merriweather font-bold text-base text-[#837E9F]">
              {props.title}
            </h4>                      
          </header>
          <main className="flex justify-left text-left items-left my-[22px]">
            <p className="font-merriweather font-normal text-sm text-[#837E9F]">{props.description}</p>
          </main>
          <footer className="flex justify-between items-center text-center">
            <div className="flex gap-2">
              <Image src={star} alt="Star - Estrela Github" />
              <Count />
              <Image src={gitBranch} alt="git-branch" />
              <Count />
            </div>
            <div className="flex gap-2">
              <Image src={elipse} alt="elipse" />
              <span className="font-merriweather font-normal text-sm text-[#837E9F]">{props.tech}</span>
            </div>
          </footer>
        </div>
      </Link>
    </>
  )
}