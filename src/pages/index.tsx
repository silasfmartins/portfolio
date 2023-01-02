import { useTheme } from 'next-themes';

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import Button from '../components/Button';
import Links from '../components/Links';
import { Project } from '../components/Project';
import Sections from '../components/Sections';
import Subtitle from '../components/Subtitle';
import Technologies from '../components/Technologies';

import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';
import briefcase from '../assets/briefcase.svg';
import globe from '../assets/globe.svg';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';
import mail from '../assets/mail.svg';
import mapPin from '../assets/map-pin.svg';
import photo from '../assets/photo.jpg';

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if(currentTheme === 'dark') {
      return (
        <Button className="hover:ring-gray-700 ring-gray-800" onClick={() => setTheme('light')}>
          <Image src={sun} alt="Sol - sun" />
        </Button>
      )
    } else {
      return (
        <Button className="hover:ring-gray-300 ring-gray-200" onClick={() => setTheme('dark')}>
          <Image src={moon} alt="Lua - moon" />
        </Button>
      )
    }
  }

  return (
    <>
      <Head>
        <meta name="author" content="Silas Martins" />
        <meta name="description" content="Website que divulga os projetos de Silas Martins" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="../../public/favicon.ico" type="image/x-icon" />
        <title>Silas Martins | Portfólio</title>
      </Head>
        <main>
          <div className="flex justify-end py-4 px-16">
            {renderThemeChanger()}
          </div>
          <div className="flex flex-col gap-[60px] mx-10 mb-10 max-w-[1120px] lg:flex-row">
            <aside>
              <Link href="/">
                <div className="w-[30rem] sm:w-[40rem] md:w-[46rem] lg:max-w-[348px] max-h-[292px] p-10 rounded-[20px] bg-[#302F3D] flex justify-center text-center items-center flex-col shadow-sm">
                  <figure className="mb-[30px]">
                    <Image className="max-w-[128px] max-h-32 rounded-full" src={photo} alt= "Imagem de Silas" />
                    <figcaption className="hidden">Imagem de Silas</figcaption>
                  </figure>
                  <h1 className="font-merriweather text-[23px] font-bold text-[#837E9F]">Silas Martins</h1>
                  <span className="font-merriweather text-[13px] font-light text-[#837E9F]">Front End Developer</span>
                </div>
              </Link>
              <div className="w-[30rem] sm:w-[40rem] md:w-[46rem] lg:max-w-[348px] max-h-[348px] p-10 rounded-[20px] bg-[#302F3D] flex justify-left text-left items-left flex-col mt-[30px] gap-4 shadow-sm">
                <Links
                  href="/"
                  image={mapPin}
                  text="Brasil"
                />
                <Links
                  href="/"
                  image={briefcase}
                  text="Estudante"
                />
                <Links
                  href="https://github.com/silasfmartins"
                  image={github}
                  text="silasfmartins"
                />
                <Links
                  href="https://www.linkedin.com/in/silas-martins/"
                  image={linkedin}
                  text="silas-martins"
                />
                <Links
                  href="/"
                  image={globe}
                  text="silasmartins.com.br"
                />
                <Links
                  href="mailto:silas.martins2041@gmail.com"
                  image={mail}
                  text="silas.martins2041@gmail.com"
                />
              </div>
              <Link href="/">
                <div className="w-[30rem] sm:w-[40rem] md:w-[46rem] lg:max-w-[348px] max-h-[208px] p-10 rounded-[20px] bg-[#302F3D] flex flex-col justify-left text-left items-left mt-[30px] gap-4 shadow-sm">
                  <Subtitle
                    text="Tecnologias"
                  />
                  <div className="flex justify-left text-center items-center gap-4">
                    <Technologies
                      text="JAVASCRIPT"
                    />
                    <Technologies 
                      text="HTML"
                    />
                    <Technologies 
                      text="CSS"
                    />
                  </div>
                </div>
              </Link>
            </aside>
            <div className="flex flex-col w-[32rem] sm:w-[46rem] md:w-[48rem] lg:w-[832px] items-center text-center">
              <Sections
                href="https://github.com/silasfmartins?tab=repositories"
                title="My Projects"
                text="Veja todos"
              />
              <div className="w-[30rem] sm:w-[40rem] md:w-[46rem] lg:w-[832px] max-w-[832px] flex gap-4">
                <Project 
                  href="https://github.com/silasfmartins/feedback-widget"
                  title="feedback-widget"
                  description="Aplicação que envia o feedback do usuário para algum email."
                  tech="Typescript"
                />
                <Project 
                  href="https://github.com/silasfmartins/Web-App-de-Previsao-do-Tempo"
                  title="Web-App-de-Previsao-do-Tempo"
                  description="Aplicação utiliza uma API gratuita para conseguir os dados da Previsão do Tempo e depois os retorna essas dados de forma visual."
                  tech="Javascript"
                />
              </div>
            </div>
          </div>
        </main>
        <footer className="font-merriweather font-normal text-sm text-[#837E9F] flex text-center justify-center items-center w-[36rem] sm:w-[48rem] md:w-[52rem] lg:w-full mb-[30px]">
          Feito por Silas Martins
        </footer>
    </>
  )
}
