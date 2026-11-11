/**
 * Courses and certifications shown in the resume PDF sidebar (copied from LinkedIn
 * "Licenças e certificados" on November 11, 2026).
 * Add new ones at the top, most recent first; titles keep the course's own name.
 */
export interface Course {
  provider: string;
  title: string;
  /** Credential page, when the certificate has one; the title becomes a link in the PDF. */
  url?: string;
  year?: string;
}

export const COURSES: Course[] = [
  {
    provider: "Alura",
    title: "CI/CD e DevOps: pipelines automatizados e seguros",
    url: "https://cursos.alura.com.br/certificate/8c67e1c9-d356-40d1-876c-1eb7e4aef487",
    year: "2026",
  },
  {
    provider: "Alura",
    title: "Terminal: comandos para executar tarefas",
    url: "https://cursos.alura.com.br/certificate/d9caac05-038f-4463-b7ef-ba01383408b2",
    year: "2026",
  },
  {
    provider: "Alura",
    title: "ChatGPT: otimizando a qualidade dos resultados",
    url: "https://cursos.alura.com.br/certificate/bbe4b44f-a81a-4724-a734-697fddc06e7f",
    year: "2026",
  },
  {
    provider: "Alura",
    title: "Spring Boot 3: desenvolva uma API Rest em Java",
    url: "https://cursos.alura.com.br/certificate/218ef55a-306d-47aa-8df5-3c3da0eb405d",
    year: "2026",
  },
  { provider: "Rocketseat", title: "Minicurso de Java", year: "2026" },
  {
    provider: "Udemy",
    title: "Testes funcionais de aplicações Android com Appium",
    url: "https://ude.my/UC-a1eeec3b-ed7a-4c9a-b4d5-0fa4ed52ddbc",
    year: "2026",
  },
  {
    provider: "Udemy",
    title: "Domine o Redis: Curso Completo para Desenvolvedores",
    url: "https://ude.my/UC-b3ca542a-63ef-4d92-a6f2-b1c72c34994a",
    year: "2026",
  },
  {
    provider: "Udemy",
    title: "Automação de Testes Web com Selenium Webdriver e Python",
    url: "https://ude.my/UC-17130aab-3cda-4863-9c8f-8e05e2fa2413",
    year: "2026",
  },
  {
    provider: "Udemy",
    title: "Datadog para iniciantes",
    url: "https://ude.my/UC-e1119574-b69b-4914-8bd0-5bd4af7172a2",
    year: "2026",
  },
  { provider: "Rocketseat", title: "Curso de Java", year: "2023" },
  { provider: "Vivo", title: "Yellow Belt" },
];
