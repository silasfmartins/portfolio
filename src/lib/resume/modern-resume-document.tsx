import {
  Document,
  Image,
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

// PDFs are not themed screens: fixed print colors are fine here.
const COLORS = {
  accent: "#13867b",
  muted: "#5b6472",
  sidebar: "#2a4359",
  sidebarAccent: "#5fd0c3",
  sidebarText: "#e8eef3",
  text: "#1d232b",
  white: "#ffffff",
};

const SIDEBAR_WIDTH = 178;

const styles = StyleSheet.create({
  bullet: { flexDirection: "row", marginBottom: 2.5 },
  bulletDot: { color: COLORS.accent, width: 9 },
  bulletText: { flex: 1 },
  competence: { marginBottom: 2.5 },
  competenceLabel: { fontFamily: "Helvetica-Bold" },
  contactIcon: {
    color: COLORS.sidebarAccent,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    width: 20,
  },
  contactLink: { color: COLORS.sidebarText, textDecoration: "none" },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 8.5,
    marginBottom: 6,
  },
  courseLink: {
    color: COLORS.sidebarText,
    fontSize: 8.5,
    lineHeight: 1.3,
    textDecoration: "none",
  },
  courseProvider: {
    color: COLORS.sidebarAccent,
    fontSize: 7.5,
    marginBottom: 5,
  },
  courseTitle: { fontSize: 8.5, lineHeight: 1.3 },
  entry: { marginBottom: 8 },
  entryMeta: { color: COLORS.muted, fontSize: 8.5, marginBottom: 3 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  footer: {
    bottom: 16,
    color: COLORS.muted,
    fontSize: 7,
    left: SIDEBAR_WIDTH + 40,
    position: "absolute",
    right: 24,
    textAlign: "right",
  },
  headline: {
    fontFamily: "Helvetica-Bold",
    fontSize: 21,
    lineHeight: 1.15,
    textTransform: "uppercase",
  },
  highlights: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginTop: 4,
  },
  initials: {
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 34,
  },
  main: { flex: 1, paddingLeft: 20 },
  name: {
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 14,
    lineHeight: 1.25,
    marginTop: 12,
    textAlign: "center",
  },
  page: {
    color: COLORS.text,
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
    paddingBottom: 40,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  photo: {
    alignSelf: "center",
    borderRadius: 55,
    height: 110,
    objectFit: "cover",
    width: 110,
  },
  photoPlaceholder: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 55,
    height: 110,
    justifyContent: "center",
    width: 110,
  },
  place: {
    color: COLORS.sidebarText,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginTop: 4,
    textAlign: "center",
  },
  projectTechs: { color: COLORS.muted, fontSize: 8 },
  projectTitle: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textDecoration: "none",
  },
  section: { marginTop: 12 },
  sectionTitle: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 12.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  sidebar: {
    color: COLORS.sidebarText,
    paddingHorizontal: 16,
    paddingTop: 8,
    width: SIDEBAR_WIDTH,
  },
  // Drawn on every page behind the sidebar, so a list that continues on page 2 keeps
  // the colored column and some space above it.
  sidebarBackground: {
    backgroundColor: COLORS.sidebar,
    borderRadius: 14,
    bottom: 24,
    left: 24,
    position: "absolute",
    top: 24,
    width: SIDEBAR_WIDTH,
  },
  sidebarSection: { marginTop: 16 },
  sidebarText: { fontSize: 9, lineHeight: 1.45 },
  sidebarTitle: {
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginBottom: 7,
    textTransform: "uppercase",
  },
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

function SidebarSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.sidebarSection}>
      <Text style={styles.sidebarTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Sidebar({
  contacts,
  content,
  copy,
  courses,
  photo,
}: Pick<
  ResumeDocumentProps,
  "contacts" | "content" | "copy" | "courses" | "photo"
>) {
  const initials = content.fullName
    .split(" ")
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <View style={styles.sidebar}>
      {photo ? (
        <Image src={photo} style={styles.photo} />
      ) : (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.initials}>{initials}</Text>
        </View>
      )}
      <Text style={styles.name}>{content.fullName}</Text>
      <Text style={styles.place}>{content.location}</Text>

      <SidebarSection title={copy.contact}>
        {contacts.map((contact) => (
          <View key={contact.url} style={styles.contactRow}>
            <Text style={styles.contactIcon}>{contact.icon}</Text>
            <Link src={contact.url} style={styles.contactLink}>
              {contact.label}
            </Link>
          </View>
        ))}
      </SidebarSection>

      <SidebarSection title={copy.objective}>
        <Text style={styles.sidebarText}>{content.objective}</Text>
      </SidebarSection>

      <SidebarSection title={copy.aboutMe}>
        <Text style={styles.sidebarText}>{content.aboutMe}</Text>
      </SidebarSection>

      {courses.length > 0 && (
        <SidebarSection title={copy.certifications}>
          {courses.map((course) => (
            <View key={`${course.title}-${course.provider}`} wrap={false}>
              {course.url ? (
                <Link src={course.url} style={styles.courseLink}>
                  {course.title}
                </Link>
              ) : (
                <Text style={styles.courseTitle}>{course.title}</Text>
              )}
              <Text style={styles.courseProvider}>{courseMeta(course)}</Text>
            </View>
          ))}
        </SidebarSection>
      )}
    </View>
  );
}

/** Modern resume: two columns with photo (up to 2 pages), from the Hygraph home data plus `resume-content.ts`. */
export function ModernResumeDocument(props: ResumeDocumentProps) {
  const { content, copy, info, locale, maxProjects, siteUrl } = props;
  const projects = info.highlightProjects.slice(0, maxProjects);

  return (
    <Document
      author={content.fullName}
      language={locale}
      title={`${content.fullName} - ${content.headline}`}
    >
      <Page size="A4" style={styles.page}>
        <View fixed style={styles.sidebarBackground} />
        <Sidebar {...props} />

        <View style={styles.main}>
          <Text style={styles.headline}>{content.headline}</Text>
          <Text style={styles.highlights}>
            {content.highlights.join(" • ")}
          </Text>

          <Section title={copy.summary}>
            <Text>{content.summary}</Text>
          </Section>

          <Section title={copy.skills}>
            {content.competences.map((competence) => (
              <Text key={competence.label} style={styles.competence}>
                <Text style={styles.competenceLabel}>{competence.label}: </Text>
                {competence.items}
              </Text>
            ))}
          </Section>

          <Section title={copy.experience}>
            {info.workExperiences.map((experience) => {
              const bullets =
                content.experienceHighlights[
                  experience.startDate.slice(0, 7)
                ] ?? richTextToParagraphs(experience.description?.raw);

              return (
                <View
                  key={`${experience.companyName}-${experience.role}`}
                  style={styles.entry}
                >
                  <View minPresenceAhead={30} wrap={false}>
                    <Text style={styles.entryTitle}>
                      {experience.companyName} | {experience.role}
                    </Text>
                    <Text style={styles.entryMeta}>
                      {periodLabel(
                        locale,
                        experience.startDate,
                        experience.endDate
                      )}
                    </Text>
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
              <Bullet key={`${education.companyName}-${education.role}`}>
                {`${education.role} - ${education.companyName} | ${periodLabel(
                  locale,
                  education.startDate,
                  education.endDate
                )}`}
              </Bullet>
            ))}
          </Section>

          {projects.length > 0 && (
            <Section title={copy.projects}>
              {projects.map((project) => (
                <View key={project.slug} style={styles.entry} wrap={false}>
                  <Link
                    src={`${siteUrl}/${locale}/projects/${project.slug}`}
                    style={styles.projectTitle}
                  >
                    {project.title}
                  </Link>
                  <Text>{project.shortDescription}</Text>
                  <Text style={styles.projectTechs}>
                    {project.technologies
                      .map((technology) => technology.name)
                      .join(" · ")}
                  </Text>
                </View>
              ))}
            </Section>
          )}
        </View>

        <Text fixed style={styles.footer}>
          Silas Martins | {content.headline} · {copy.generatedFrom}
        </Text>
      </Page>
    </Document>
  );
}
