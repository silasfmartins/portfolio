import {
  Document,
  Font,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { Children } from "react";

import {
  getDateLocale,
  getDurationLabel,
  getPresentLabel,
} from "@/lib/date-labels";
import type { HomePageInfo } from "@/types/page-info";
import { richTextToParagraphs } from "./rich-text";

// Words are never split with hyphens.
Font.registerHyphenationCallback((word) => [word]);

// PDFs are not themed screens: fixed print colors are fine here.
const COLORS = { accent: "#127a6b", muted: "#5b6472", text: "#14181f" };

const styles = StyleSheet.create({
  contact: {
    color: COLORS.muted,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    gap: 10,
    marginTop: 6,
  },
  entry: { marginBottom: 10 },
  entryMeta: { color: COLORS.muted, fontSize: 9, marginTop: 1 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  footer: {
    bottom: 24,
    color: COLORS.muted,
    fontSize: 8,
    left: 40,
    position: "absolute",
    right: 40,
    textAlign: "center",
  },
  link: { color: COLORS.accent, textDecoration: "none" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, lineHeight: 1.2 },
  page: {
    color: COLORS.text,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.45,
    padding: 40,
    paddingBottom: 56,
  },
  paragraph: { marginBottom: 6 },
  role: { color: COLORS.accent, fontSize: 12, marginTop: 4 },
  section: { marginTop: 16 },
  sectionTitle: {
    borderBottomColor: COLORS.accent,
    borderBottomWidth: 1,
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
    letterSpacing: 1,
    marginBottom: 8,
    paddingBottom: 3,
    textTransform: "uppercase",
  },
  skill: {
    backgroundColor: "#eef3f2",
    borderRadius: 3,
    fontSize: 9,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  skills: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
});

export interface ResumeCopy {
  about: string;
  education: string;
  experience: string;
  generatedFrom: string;
  projects: string;
  role: string;
  skills: string;
}

interface ResumeDocumentProps {
  contacts: { label: string; url: string }[];
  copy: ResumeCopy;
  info: HomePageInfo;
  locale: string;
  siteUrl: string;
}

function Period({
  end,
  locale,
  start,
}: {
  end?: string;
  locale: string;
  start: string;
}) {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  const dateLocale = getDateLocale(locale);
  const endLabel = end
    ? format(endDate, "MMM yyyy", { locale: dateLocale })
    : getPresentLabel(locale);

  return (
    <Text style={styles.entryMeta}>
      {format(startDate, "MMM yyyy", { locale: dateLocale })} - {endLabel} ·{" "}
      {getDurationLabel(locale, startDate, endDate)}
    </Text>
  );
}

/** The title travels with the first entry, so it never ends alone at the bottom of a page. */
function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [first, ...rest] = Children.toArray(children);

  return (
    <View style={styles.section}>
      <View wrap={false}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {first}
      </View>
      {rest}
    </View>
  );
}

/** One-page-or-more resume built from the same Hygraph data as the home page. */
export function ResumeDocument({
  contacts,
  copy,
  info,
  locale,
  siteUrl,
}: ResumeDocumentProps) {
  const now = new Date();

  return (
    <Document
      author="Silas Martins"
      language={locale}
      title={`Silas Martins - ${copy.role}`}
    >
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.name}>Silas Martins</Text>
          <Text style={styles.role}>{copy.role}</Text>
          <View style={styles.contact}>
            {contacts.map((contact) => (
              <Link key={contact.url} src={contact.url} style={styles.link}>
                {contact.label}
              </Link>
            ))}
          </View>
        </View>

        <Section title={copy.about}>
          {richTextToParagraphs(info.introduction.raw).map((paragraph) => (
            <Text key={paragraph} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </Section>

        <Section title={copy.skills}>
          <View style={styles.skills}>
            {info.knownTechs.map((tech) => (
              <Text key={tech.name} style={styles.skill}>
                {tech.name} ·{" "}
                {getDurationLabel(locale, new Date(tech.startDate), now)}
              </Text>
            ))}
          </View>
        </Section>

        <Section title={copy.experience}>
          {info.workExperiences.map((experience) => (
            <View
              key={`${experience.companyName}-${experience.role}`}
              style={styles.entry}
              wrap={false}
            >
              <Text style={styles.entryTitle}>
                {experience.role} · {experience.companyName}
              </Text>
              <Period
                end={experience.endDate}
                locale={locale}
                start={experience.startDate}
              />
              {richTextToParagraphs(experience.description?.raw).map(
                (paragraph) => (
                  <Text key={paragraph} style={styles.paragraph}>
                    {paragraph}
                  </Text>
                )
              )}
            </View>
          ))}
        </Section>

        <Section title={copy.education}>
          {info.about.map((education) => (
            <View
              key={`${education.companyName}-${education.role}`}
              style={styles.entry}
              wrap={false}
            >
              <Text style={styles.entryTitle}>{education.role}</Text>
              <Text>{education.companyName}</Text>
              <Period
                end={education.endDate}
                locale={locale}
                start={education.startDate}
              />
            </View>
          ))}
        </Section>

        <Section title={copy.projects}>
          {info.highlightProjects.map((project) => (
            <View key={project.slug} style={styles.entry} wrap={false}>
              <Link
                src={`${siteUrl}/${locale}/projects/${project.slug}`}
                style={styles.link}
              >
                <Text style={styles.entryTitle}>{project.title}</Text>
              </Link>
              <Text>{project.shortDescription}</Text>
              <Text style={styles.entryMeta}>
                {project.technologies
                  .map((technology) => technology.name)
                  .join(" · ")}
              </Text>
            </View>
          ))}
        </Section>

        <Text fixed style={styles.footer}>
          {copy.generatedFrom}
        </Text>
      </Page>
    </Document>
  );
}
