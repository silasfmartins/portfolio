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
        children: [{ text }],
        type: "paragraph",
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
    description: {
      raw: richTextParagraph(
        "Projeto com arquitetura frontend moderna inspirada no padrao AutoCore Hub."
      ).raw,
      text: "Projeto com arquitetura frontend moderna inspirada no padrao AutoCore Hub.",
    },
    githubUrl: "https://github.com/silasfmartins",
    pageThumbnail: { url: "/images/hero-bg.png" },
    sections: [
      {
        image: { url: "/images/hero-bg.png" },
        title: "Visao Geral",
      },
    ],
    shortDescription:
      "Dashboard moderno para gerenciamento e automacao de fluxos com foco em UX, desempenho e observabilidade.",
    slug: "autocore-hub-web",
    technologies: [
      { iconSvg: defaultIcon, name: "Next.js", startDate: "2024-01-01" },
      { iconSvg: defaultIcon, name: "TypeScript", startDate: "2022-01-01" },
      { iconSvg: defaultIcon, name: "Tailwind CSS", startDate: "2023-01-01" },
    ],
    thumbnail: { url: "/images/hero-bg.png" },
    title: "AutoCore Hub Web",
  },
  {
    description: {
      raw: richTextParagraph(
        "Ferramentas de pipeline com foco em padronizacao e produtividade."
      ).raw,
      text: "Ferramentas de pipeline com foco em padronizacao e produtividade.",
    },
    githubUrl: "https://github.com/silasfmartins",
    pageThumbnail: { url: "/images/hero-bg.png" },
    sections: [
      {
        image: { url: "/images/hero-bg.png" },
        title: "Fluxo de Execucao",
      },
    ],
    shortDescription:
      "Interface para automacao de tarefas DevOps com estados de execucao, feedback de erros e filtros avancados.",
    slug: "pipeline-devops-tools",
    technologies: [
      { iconSvg: defaultIcon, name: "React", startDate: "2021-01-01" },
      { iconSvg: defaultIcon, name: "Zod", startDate: "2023-01-01" },
      { iconSvg: defaultIcon, name: "Framer Motion", startDate: "2022-01-01" },
    ],
    thumbnail: { url: "/images/hero-bg.png" },
    title: "Pipeline DevOps Tools",
  },
  {
    description: {
      raw: richTextParagraph(
        "Refatoracao visual e tecnica para alinhar o projeto a um frontend mais atual."
      ).raw,
      text: "Refatoracao visual e tecnica para alinhar o projeto a um frontend mais atual.",
    },
    githubUrl: "https://github.com/silasfmartins",
    pageThumbnail: { url: "/images/hero-bg.png" },
    sections: [
      {
        image: { url: "/images/hero-bg.png" },
        title: "Componentes Reutilizaveis",
      },
    ],
    shortDescription:
      "Nova versao do portfolio com design system, internacionalizacao e componentes reutilizaveis.",
    slug: "portfolio-v2",
    technologies: [
      { iconSvg: defaultIcon, name: "next-intl", startDate: "2024-01-01" },
      { iconSvg: defaultIcon, name: "Biome", startDate: "2026-01-01" },
      { iconSvg: defaultIcon, name: "Node.js", startDate: "2020-01-01" },
    ],
    thumbnail: { url: "/images/hero-bg.png" },
    title: "Portfolio v2",
  },
];

export const fallbackProjectsPageData: ProjectsPageData = {
  projects: fallbackProjects,
};

export const fallbackHomePageData: HomePageData = {
  page: {
    about: [
      {
        companyLogo: { url: "/images/fatec.png" },
        companyName: "FATEC",
        companyUrl: "https://www.cps.sp.gov.br/fatec/",
        endDate: "2023-12-01",
        role: "Analise e Desenvolvimento de Sistemas",
        startDate: "2020-01-01",
      },
    ],
    highlightProjects: fallbackProjects,
    introduction: richTextParagraph(
      "Conteudo de fallback ativado. Configure HYGRAPH_URL e HYGRAPH_TOKEN para carregar os dados reais do CMS."
    ),
    knownTechs: [
      { iconSvg: defaultIcon, name: "Next.js", startDate: "2024-01-01" },
      { iconSvg: defaultIcon, name: "TypeScript", startDate: "2022-01-01" },
      { iconSvg: defaultIcon, name: "DevOps", startDate: "2021-01-01" },
    ],
    profilePicture: {
      url: "/images/hero-bg.png",
    },
    socials: [],
    technologies: fallbackProjects[0].technologies,
    workExperiences: [
      {
        companyLogo: { url: "/images/if.png" },
        companyName: "Projetos de Tecnologia",
        companyUrl: "https://github.com/silasfmartins",
        description: richTextParagraph(
          "Experiencia com automacao de testes, arquitetura frontend e integracoes."
        ),
        endDate: "",
        role: "Analista de Sistemas",
        startDate: "2022-01-01",
      },
    ],
  },
};

export function getFallbackProjectBySlug(slug: string): Project | null {
  return fallbackProjects.find((project) => project.slug === slug) ?? null;
}

export function getFallbackProjectPageData(slug: string): ProjectPageData {
  return {
    project: getFallbackProjectBySlug(slug),
  };
}
