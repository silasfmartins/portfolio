import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import {
  courseMeta,
  periodLabel,
  type ResumeDocumentProps,
  technologiesLabel,
} from "./resume-shared";
import { richTextToParagraphs } from "./rich-text";

// Plain CV: one column, black text, no photo or colors, easy for recruiting systems to read.
const COLORS = { muted: "#4b5260", rule: "#9aa1ab", text: "#111418" };

const styles = StyleSheet.create({
  bullet: { flexDirection: "row", marginBottom: 1.2 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1 },
  contact: { flexDirection: "row" },
  contacts: {
    color: COLORS.muted,
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 8.3,
    justifyContent: "center",
    marginTop: 3,
  },
  course: { flexDirection: "row", marginBottom: 1.2, width: "50%" },
  courses: { flexDirection: "row", flexWrap: "wrap" },
  entry: { marginBottom: 4 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between" },
  entryPeriod: { color: COLORS.muted, fontSize: 8 },
  entryTitle: { flex: 1, fontFamily: "Helvetica-Bold", paddingRight: 8 },
  footer: {
    bottom: 12,
    color: COLORS.muted,
    fontSize: 6.5,
    left: 40,
    position: "absolute",
    right: 40,
    textAlign: "center",
  },
  headline: { fontSize: 10, marginTop: 3, textAlign: "center" },
  label: { fontFamily: "Helvetica-Bold" },
  link: { color: COLORS.text, textDecoration: "none" },
  meta: { color: COLORS.muted },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    lineHeight: 1.2,
    textAlign: "center",
  },
  page: {
    color: COLORS.text,
    fontFamily: "Helvetica",
    fontSize: 8.6,
    lineHeight: 1.3,
    paddingBottom: 28,
    paddingHorizontal: 40,
    paddingTop: 28,
  },
  paragraph: { marginBottom: 1.5 },
  regular: { fontFamily: "Helvetica" },
  section: { marginTop: 7 },
  sectionTitle: {
    borderBottomColor: COLORS.rule,
    borderBottomWidth: 0.75,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    letterSpacing: 0.5,
    marginBottom: 3,
    paddingBottom: 1.5,
    textTransform: "uppercase",
  },
  separator: { color: COLORS.rule, marginHorizontal: 5 },
  small: { fontSize: 7.6 },
});

function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function EntryHeader({
  detail,
  period,
  title,
}: {
  /** Shown after the title in regular weight (institution). */
  detail?: string;
  period: string;
  title: string;
}) {
  return (
    <View style={styles.entryHeader}>
      <Text style={styles.entryTitle}>
        {title}
        {detail && <Text style={styles.regular}> - {detail}</Text>}
      </Text>
      <Text style={styles.entryPeriod}>{period}</Text>
    </View>
  );
}

/** Simple resume: one page, one column, no photo, same data as the modern one. */
export function SimpleResumeDocument({
  ageAndPlace,
  contacts,
  content,
  copy,
  courses,
  fit,
  info,
  locale,
  siteUrl,
}: ResumeDocumentProps) {
  const projects = info.highlightProjects.slice(0, fit.maxProjects);

  return (
    <Document
      author={content.fullName}
      language={locale}
      title={`${content.fullName} - ${content.headline}`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{content.fullName}</Text>
        <Text style={styles.headline}>
          {content.headline} · {ageAndPlace}
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
                <EntryHeader
                  period={periodLabel(
                    locale,
                    experience.startDate,
                    experience.endDate
                  )}
                  title={`${experience.role} - ${experience.companyName}`}
                />
                {bullets.map((bullet) => (
                  <Bullet key={bullet}>{bullet}</Bullet>
                ))}
              </View>
            );
          })}
        </Section>

        <Section title={copy.education}>
          {info.about.map((education) => (
            <EntryHeader
              detail={education.companyName}
              key={`${education.companyName}-${education.role}`}
              period={periodLabel(
                locale,
                education.startDate,
                education.endDate
              )}
              title={education.role}
            />
          ))}
        </Section>

        {projects.length > 0 && (
          <Section title={copy.projects}>
            {projects.map((project) => (
              <View key={project.slug} style={styles.entry}>
                <Text>
                  <Link
                    src={`${siteUrl}/${locale}/projects/${project.slug}`}
                    style={[styles.link, styles.label]}
                  >
                    {project.title}
                  </Link>
                  <Text style={[styles.meta, styles.small]}>
                    {" "}
                    · {technologiesLabel(project.technologies)}
                  </Text>
                </Text>
                {fit.projectDescriptions && (
                  <Text>{project.shortDescription}</Text>
                )}
              </View>
            ))}
          </Section>
        )}

        {courses.length > 0 && (
          <Section title={copy.certifications}>
            <View style={styles.courses}>
              {courses.map((course) => (
                <View
                  key={`${course.title}-${course.provider}`}
                  style={styles.course}
                >
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={[styles.bulletText, styles.small]}>
                    {course.url ? (
                      <Link src={course.url} style={styles.link}>
                        {course.title}
                      </Link>
                    ) : (
                      course.title
                    )}
                    <Text style={styles.meta}> - {courseMeta(course)}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </Section>
        )}

        <Text fixed style={styles.footer}>
          {copy.generatedFrom}
        </Text>
      </Page>
    </Document>
  );
}
