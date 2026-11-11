/**
 * Resume text that the site does not have (headline, summary, grouped skills, experience
 * bullets). Everything else comes from Hygraph: photo, links, roles, dates, education, projects.
 * Experience bullets are matched by the experience start month in Hygraph (`yyyy-MM`);
 * an experience without bullets here uses its Hygraph description.
 */
export interface ResumeContent {
  aboutMe: string;
  /** `yyyy-MM-dd`; the resume shows the age computed from it. */
  birthDate: string;
  competences: { items: string; label: string }[];
  experienceHighlights: Record<string, string[]>;
  fullName: string;
  headline: string;
  highlights: string[];
  location: string;
  objective: string;
  summary: string;
}

const BIRTH_DATE = "2004-10-16";

const RESUME_CONTENT: Record<string, ResumeContent> = {
  en: {
    aboutMe:
      "I like to understand the task beyond the code: I think about the product, the user, the problem, the impact and the result. I turn requirements into simple, sustainable, high-quality solutions.",
    birthDate: BIRTH_DATE,
    competences: [
      {
        items:
          "Java, Spring Boot, Node.js, NestJS, TypeScript, OOP, REST APIs, microservices.",
        label: "Backend",
      },
      {
        items:
          "Clean Code, Design Patterns, service integration, resilience/retry, error handling, mocks.",
        label: "Architecture",
      },
      {
        items:
          "PostgreSQL, SQL, Redis, Apache Kafka; relational/NoSQL databases and event-driven architecture.",
        label: "Data/Messaging",
      },
      {
        items:
          "Git, Azure DevOps, CI/CD, Docker, Linux, Shell Script, Playwright, Cypress, Selenium, E2E tests.",
        label: "DevOps/Quality",
      },
      {
        items: "AWS/Azure and Kubernetes fundamentals.",
        label: "Cloud/Orchestration",
      },
      {
        items: "Elasticsearch, Kibana, Elastic Stack; studying Datadog.",
        label: "Observability",
      },
    ],
    experienceHighlights: {
      "2023-08": [
        "50+ automations on BRM and Salesforce with Cypress; 20+ Azure DevOps pipelines for CI/CD.",
        "Shell Script on Linux/Unix, Power Platform and a Yellow Belt project for log monitoring with Elasticsearch.",
      ],
      "2025-01": [
        "Backend development in Java with Spring Boot, REST APIs and critical microservices of the Payments Hub and Pix Automático.",
        "Retry and failure handling in integrations with Payment Service Providers (PSP), increasing resilience and availability.",
        "Features and endpoints for queries, enrollment and status management in Pix Automático.",
        "Deploys, troubleshooting, incidents and production validations, plus mocks for functional scenarios.",
        "Evolution of an automation framework with Playwright and the Chrome DevTools Protocol (CDP), including Java code generation.",
        "18 REST API automations and more than 45 automation scripts in Java.",
      ],
    },
    fullName: "Silas Martins Feliciano da Silva",
    headline: "Software Engineer | Backend Java",
    highlights: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "Microservices",
      "Payments",
      "CI/CD",
      "Docker",
      "Automation",
    ],
    location: "São Paulo, SP - Brazil",
    objective:
      "To work as a mid-level Software Engineer / Backend Java, building REST APIs, microservices and robust solutions for products and critical systems.",
    summary:
      "Software Engineer with experience in Backend Java, Spring Boot, REST APIs and microservices in critical systems. At Vivo, I work on the Payments Hub and Pix Automático, building features, integrations, retry and resilience improvements, as well as deploys, troubleshooting and production validations. I also work with automation, CI/CD, Docker and observability.",
  },
  "pt-BR": {
    aboutMe:
      "Gosto de entender a tarefa além do código: penso no produto, usuário, problema, impacto e resultado. Procuro transformar requisitos em soluções simples, sustentáveis e com qualidade.",
    birthDate: BIRTH_DATE,
    competences: [
      {
        items:
          "Java, Spring Boot, Node.js, NestJS, TypeScript, POO, APIs REST, microsserviços.",
        label: "Backend",
      },
      {
        items:
          "Clean Code, Design Patterns, integração de serviços, resiliência/retry, tratamento de erros, mocks.",
        label: "Arquitetura",
      },
      {
        items:
          "PostgreSQL, SQL, Redis, Apache Kafka; bancos relacionais/NoSQL e arquitetura orientada a eventos.",
        label: "Dados/Mensageria",
      },
      {
        items:
          "Git, Azure DevOps, CI/CD, Docker, Linux, Shell Script, Playwright, Cypress, Selenium, testes E2E.",
        label: "DevOps/Qualidade",
      },
      {
        items: "conhecimentos em AWS/Azure e Kubernetes.",
        label: "Cloud/Orquestração",
      },
      {
        items: "Elasticsearch, Kibana, Elastic Stack; Datadog em estudos.",
        label: "Observabilidade",
      },
    ],
    experienceHighlights: {
      "2023-08": [
        "50+ automações em BRM e Salesforce com Cypress; 20+ pipelines no Azure DevOps para CI/CD.",
        "Shell Script em Linux/Unix, Power Platform e projeto Yellow Belt de monitoramento de logs com Elasticsearch.",
      ],
      "2025-01": [
        "Desenvolvimento Backend Java com Spring Boot, APIs REST e microsserviços críticos do Hub de Pagamentos e Pix Automático.",
        "Implementação de retry e tratamento de falhas em integrações com Provedores de Serviços de Pagamento (PSP), aumentando resiliência e disponibilidade.",
        "Desenvolvimento de funcionalidades e endpoints para consultas, adesão e gerenciamento de status no Pix Automático.",
        "Atuação em deploys, troubleshooting, incidentes e validações em produção, além de mocks para cenários funcionais.",
        "Evolução de framework de automação com Playwright e Chrome DevTools Protocol (CDP), incluindo geração de código Java.",
        "Histórico de 18 automações de APIs REST e mais de 45 scripts de automação em Java.",
      ],
    },
    fullName: "Silas Martins Feliciano da Silva",
    headline: "Software Engineer | Backend Java",
    highlights: [
      "Java",
      "Spring Boot",
      "APIs REST",
      "Microsserviços",
      "Pagamentos",
      "CI/CD",
      "Docker",
      "Automação",
    ],
    location: "São Paulo, SP",
    objective:
      "Atuar como Software Engineer / Backend Java Pleno, desenvolvendo APIs REST, microsserviços e soluções robustas para produtos e sistemas críticos.",
    summary:
      "Software Engineer com experiência em Backend Java, Spring Boot, APIs REST e microsserviços em sistemas críticos. Na Vivo, atuo no Hub de Pagamentos e Pix Automático, desenvolvendo funcionalidades, integrações, retry e melhorias de resiliência, além de deploys, troubleshooting e validações em produção. Também atuo com automação, CI/CD, Docker e observabilidade.",
  },
};

export function getResumeContent(locale: string) {
  return RESUME_CONTENT[locale] ?? RESUME_CONTENT.en;
}
