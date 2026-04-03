import type {
  HomePageData,
  ProjectPageData,
  ProjectsPageData,
} from "@/types/page-info";
import type { Project } from "@/types/projects";

const richTextParagraph = (text: string) => ({
  raw: {
    children: [
      {
        type: "paragraph",
        children: [{ text }],
      },
    ],
  } as never,
});

const defaultIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="9"></circle>
  <path d="M12 8v8"></path>
  <path d="M8 12h8"></path>
</svg>
`;

const fallbackProjects: Project[] = [
  {
    slug: "autocore-hub-web",
    title: "AutoCore Hub Web",
    shortDescription:
      "Dashboard moderno para gerenciamento e automacao de fluxos com foco em UX, desempenho e observabilidade.",
    thumbnail: { url: "/images/hero-bg.png" },
    pageThumbnail: { url: "/images/hero-bg.png" },
    technologies: [
      { name: "Next.js", startDate: "2024-01-01", iconSvg: defaultIcon },
      { name: "TypeScript", startDate: "2022-01-01", iconSvg: defaultIcon },
      { name: "Tailwind CSS", startDate: "2023-01-01", iconSvg: defaultIcon },
    ],
    sections: [
      {
        title: "Visao Geral",
        image: { url: "/images/hero-bg.png" },
      },
    ],
    description: {
      text: "Projeto com arquitetura frontend moderna inspirada no padrao AutoCore Hub.",
      raw: richTextParagraph(
        "Projeto com arquitetura frontend moderna inspirada no padrao AutoCore Hub."
      ).raw,
    },
    githubUrl: "https://github.com/silasfmartins",
  },
  {
    slug: "pipeline-devops-tools",
    title: "Pipeline DevOps Tools",
    shortDescription:
      "Interface para automacao de tarefas DevOps com estados de execucao, feedback de erros e filtros avancados.",
    thumbnail: { url: "/images/hero-bg.png" },
    pageThumbnail: { url: "/images/hero-bg.png" },
    technologies: [
      { name: "React", startDate: "2021-01-01", iconSvg: defaultIcon },
      { name: "Zod", startDate: "2023-01-01", iconSvg: defaultIcon },
      { name: "Framer Motion", startDate: "2022-01-01", iconSvg: defaultIcon },
    ],
    sections: [
      {
        title: "Fluxo de Execucao",
        image: { url: "/images/hero-bg.png" },
      },
    ],
    description: {
      text: "Ferramentas de pipeline com foco em padronizacao e produtividade.",
      raw: richTextParagraph(
        "Ferramentas de pipeline com foco em padronizacao e produtividade."
      ).raw,
    },
    githubUrl: "https://github.com/silasfmartins",
  },
  {
    slug: "portfolio-v2",
    title: "Portfolio v2",
    shortDescription:
      "Nova versao do portfolio com design system, internacionalizacao e componentes reutilizaveis.",
    thumbnail: { url: "/images/hero-bg.png" },
    pageThumbnail: { url: "/images/hero-bg.png" },
    technologies: [
      { name: "next-intl", startDate: "2024-01-01", iconSvg: defaultIcon },
      { name: "Biome", startDate: "2026-01-01", iconSvg: defaultIcon },
      { name: "Node.js", startDate: "2020-01-01", iconSvg: defaultIcon },
    ],
    sections: [
      {
        title: "Componentes Reutilizaveis",
        image: { url: "/images/hero-bg.png" },
      },
    ],
    description: {
      text: "Refatoracao visual e tecnica para alinhar o projeto a um frontend mais atual.",
      raw: richTextParagraph(
        "Refatoracao visual e tecnica para alinhar o projeto a um frontend mais atual."
      ).raw,
    },
    githubUrl: "https://github.com/silasfmartins",
  },
];

export const fallbackProjectsPageData: ProjectsPageData = {
  projects: fallbackProjects,
};

export const fallbackHomePageData: HomePageData = {
  page: {
    introduction: richTextParagraph(
      "Conteudo de fallback ativado. Configure HYGRAPH_URL e HYGRAPH_TOKEN para carregar os dados reais do CMS."
    ),
    technologies: fallbackProjects[0].technologies,
    profilePicture: {
      url: "/images/hero-bg.png",
    },
    socials: [],
    knownTechs: [
      { name: "Next.js", startDate: "2024-01-01", iconSvg: defaultIcon },
      { name: "TypeScript", startDate: "2022-01-01", iconSvg: defaultIcon },
      { name: "DevOps", startDate: "2021-01-01", iconSvg: defaultIcon },
    ],
    highlightProjects: fallbackProjects,
    about: [
      {
        companyLogo: { url: "/images/fatec.png" },
        role: "Analise e Desenvolvimento de Sistemas",
        companyName: "FATEC",
        companyUrl: "https://www.cps.sp.gov.br/fatec/",
        startDate: "2020-01-01",
        endDate: "2023-12-01",
      },
    ],
    workExperiences: [
      {
        companyLogo: { url: "/images/if.png" },
        role: "Analista de Sistemas",
        companyName: "Projetos de Tecnologia",
        companyUrl: "https://github.com/silasfmartins",
        startDate: "2022-01-01",
        endDate: "",
        description: richTextParagraph(
          "Experiencia com automacao de testes, arquitetura frontend e integracoes."
        ),
      },
    ],
  },
};

export function getFallbackProjectBySlug(slug: string): Project {
  return (
    fallbackProjects.find((project) => project.slug === slug) ??
    fallbackProjects[0]
  );
}

export function getFallbackProjectPageData(slug: string): ProjectPageData {
  return {
    project: getFallbackProjectBySlug(slug),
  };
}
