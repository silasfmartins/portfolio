import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { Children } from "react";

import {
  courseMeta,
  periodLabel,
  type ResumeDocumentProps,
} from "./resume-shared";
import { richTextToParagraphs } from "./rich-text";

// Plain CV: one column, black text, no photo or colors, easy for recruiting systems to read.
const COLORS = { muted: "#4b5260", rule: "#9aa1ab", text: "#111418" };

const styles = StyleSheet.create({
  bullet: { flexDirection: "row", marginBottom: 2 },
  bulletDot: { width: 10 },
  bulletText: { flex: 1 },
  contact: { flexDirection: "row" },
  contacts: {
    color: COLORS.muted,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 9,
    justifyContent: "center",
    marginTop: 5,
  },
  course: { flexDirection: "row", marginBottom: 1.5 },
  courseMeta: { color: COLORS.muted },
  entry: { marginBottom: 7 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  entryPeriod: { color: COLORS.muted, fontSize: 9 },
  entryTitle: { flex: 1, fontFamily: "Helvetica-Bold", paddingRight: 8 },
  footer: {
    bottom: 22,
    color: COLORS.muted,
    fontSize: 7,
    left: 48,
    position: "absolute",
    right: 48,
    textAlign: "center",
  },
  headline: { fontSize: 11, marginTop: 4, textAlign: "center" },
  label: { fontFamily: "Helvetica-Bold" },
  link: { color: COLORS.text, textDecoration: "none" },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 19,
    lineHeight: 1.25,
    textAlign: "center",
  },
  page: {
    color: COLORS.text,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
    paddingBottom: 44,
    paddingHorizontal: 48,
    paddingTop: 40,
  },
  paragraph: { marginBottom: 3 },
  section: { marginTop: 11 },
  sectionTitle: {
    borderBottomColor: COLORS.rule,
    borderBottomWidth: 0.75,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    letterSpacing: 0.6,
    marginBottom: 5,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  separator: { color: COLORS.rule, marginHorizontal: 6 },
});

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
      <View minPresenceAhead={40} wrap={false}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {first}
      </View>
      {rest}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function EntryHeader({ period, title }: { period: string; title: string }) {
  return (
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>{title}</Text>
      <Text style={styles.entryPeriod}>{period}</Text>
    </View>
  );
}

/** Simple resume: one column, no photo (up to 2 pages), same data as the modern one. */
export function SimpleResumeDocument({
  contacts,
  content,
  copy,
  courses,
  info,
  locale,
  maxProjects,
  siteUrl,
}: ResumeDocumentProps) {
  const projects = info.highlightProjects.slice(0, maxProjects);

  return (
    <Document
      author={content.fullName}
      language={locale}
      title={`${content.fullName} - ${content.headline}`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{content.fullName}</Text>
        <Text style={styles.headline}>
          {content.headline} · {content.location}
        </Text>
        <View style={styles.contacts}>
          {contacts.map((contact, index) => (
            <View key={contact.url} style={styles.contact}>
              {index > 0 && <Text style={styles.separator}>|</Text>}
              <Link src={contact.url} style={styles.link}>
                {contact.label}
              </Link>
            </View>
          ))}
        </View>

        <Section title={copy.objective}>
          <Text>{content.objective}</Text>
        </Section>

        <Section title={copy.summary}>
          <Text>{content.summary}</Text>
        </Section>

        <Section title={copy.skills}>
          {content.competences.map((competence) => (
            <Text key={competence.label} style={styles.paragraph}>
              <Text style={styles.label}>{competence.label}: </Text>
              {competence.items}
            </Text>
          ))}
        </Section>

        <Section title={copy.experience}>
          {info.workExperiences.map((experience) => {
            const bullets =
              content.experienceHighlights[experience.startDate.slice(0, 7)] ??
              richTextToParagraphs(experience.description?.raw);

            return (
              <View
                key={`${experience.companyName}-${experience.role}`}
                style={styles.entry}
              >
                <View minPresenceAhead={30} wrap={false}>
                  <EntryHeader
                    period={periodLabel(
                      locale,
                      experience.startDate,
                      experience.endDate
                    )}
                    title={`${experience.role} - ${experience.companyName}`}
                  />
                </View>
                {bullets.map((bullet) => (
                  <Bullet key={bullet}>{bullet}</Bullet>
                ))}
              </View>
            );
          })}
        </Section>

        <Section title={copy.education}>
          {info.about.map((education) => (
            <View
              key={`${education.companyName}-${education.role}`}
              style={styles.entry}
              wrap={false}
            >
              <EntryHeader
                period={periodLabel(
                  locale,
                  education.startDate,
                  education.endDate
                )}
                title={education.role}
              />
              <Text>{education.companyName}</Text>
            </View>
          ))}
        </Section>

        {courses.length > 0 && (
          <Section title={copy.certifications}>
            {courses.map((course) => (
              <View
                key={`${course.title}-${course.provider}`}
                style={styles.course}
                wrap={false}
              >
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  {course.url ? (
                    <Link src={course.url} style={styles.link}>
                      {course.title}
                    </Link>
                  ) : (
                    course.title
                  )}
                  <Text style={styles.courseMeta}> - {courseMeta(course)}</Text>
                </Text>
              </View>
            ))}
          </Section>
        )}

        {projects.length > 0 && (
          <Section title={copy.projects}>
            {projects.map((project) => (
              <View key={project.slug} style={styles.entry} wrap={false}>
                <Link
                  src={`${siteUrl}/${locale}/projects/${project.slug}`}
                  style={[styles.link, styles.label]}
                >
                  {project.title}
                </Link>
                <Text>{project.shortDescription}</Text>
                <Text style={styles.courseMeta}>
                  {project.technologies
                    .map((technology) => technology.name)
                    .join(" · ")}
                </Text>
              </View>
            ))}
          </Section>
        )}

        <Text fixed style={styles.footer}>
          {copy.generatedFrom}
        </Text>
      </Page>
    </Document>
  );
}
