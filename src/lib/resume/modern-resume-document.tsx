import {
  Document,
  Image,
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

const PAGE_MARGIN = 20;
const SIDEBAR_WIDTH = 172;
const PHOTO_SIZE = 88;

const styles = StyleSheet.create({
  bullet: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { color: COLORS.accent, width: 8 },
  bulletText: { flex: 1 },
  competence: { marginBottom: 1.5 },
  competenceLabel: { fontFamily: "Helvetica-Bold" },
  contactIcon: {
    color: COLORS.sidebarAccent,
    fontFamily: "Helvetica-Bold",
    fontSize: 7.5,
    width: 19,
  },
  contactLink: { color: COLORS.sidebarText, textDecoration: "none" },
  contactRow: {
    alignItems: "center",
    flexDirection: "row",
    fontSize: 8,
    marginBottom: 3.5,
  },
  course: { fontSize: 7.6, lineHeight: 1.25, marginBottom: 3.5 },
  courseLink: { color: COLORS.sidebarText, textDecoration: "none" },
  courseProvider: { color: COLORS.sidebarAccent, fontSize: 7 },
  entry: { marginBottom: 5 },
  entryMeta: { color: COLORS.muted, fontSize: 7.8, marginBottom: 1.5 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 9 },
  footer: {
    bottom: 10,
    color: COLORS.muted,
    fontSize: 6.5,
    left: PAGE_MARGIN + SIDEBAR_WIDTH + 16,
    position: "absolute",
    right: PAGE_MARGIN,
    textAlign: "right",
  },
  headline: {
    fontFamily: "Helvetica-Bold",
    fontSize: 17,
    lineHeight: 1.15,
    textTransform: "uppercase",
  },
  highlights: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginTop: 3,
  },
  initials: { color: COLORS.white, fontFamily: "Helvetica-Bold", fontSize: 28 },
  main: { flex: 1, paddingLeft: 16, paddingTop: 2 },
  name: {
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 12.5,
    lineHeight: 1.2,
    marginTop: 8,
    textAlign: "center",
  },
  page: {
    color: COLORS.text,
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 8.5,
    lineHeight: 1.32,
    padding: PAGE_MARGIN,
    paddingBottom: 24,
  },
  photo: {
    alignSelf: "center",
    borderRadius: PHOTO_SIZE / 2,
    height: PHOTO_SIZE,
    objectFit: "cover",
    width: PHOTO_SIZE,
  },
  photoPlaceholder: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.accent,
    borderRadius: PHOTO_SIZE / 2,
    height: PHOTO_SIZE,
    justifyContent: "center",
    width: PHOTO_SIZE,
  },
  place: {
    color: COLORS.sidebarText,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    marginTop: 3,
    textAlign: "center",
  },
  project: { marginBottom: 4 },
  projectTechs: { color: COLORS.muted, fontSize: 7.3 },
  projectTitle: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    textDecoration: "none",
  },
  section: { marginTop: 8 },
  sectionTitle: {
    color: COLORS.accent,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  sidebar: {
    backgroundColor: COLORS.sidebar,
    borderRadius: 12,
    color: COLORS.sidebarText,
    paddingHorizontal: 13,
    paddingVertical: 16,
    width: SIDEBAR_WIDTH,
  },
  sidebarSection: { marginTop: 11 },
  sidebarText: { fontSize: 8, lineHeight: 1.38 },
  sidebarTitle: {
    color: COLORS.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    marginBottom: 5,
    textTransform: "uppercase",
  },
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
  ageAndPlace,
  contacts,
  content,
  copy,
  courses,
  photo,
}: Pick<
  ResumeDocumentProps,
  "ageAndPlace" | "contacts" | "content" | "copy" | "courses" | "photo"
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
      <Text style={styles.place}>{ageAndPlace}</Text>

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
            <Text
              key={`${course.title}-${course.provider}`}
              style={styles.course}
            >
              {course.url ? (
                <Link src={course.url} style={styles.courseLink}>
                  {course.title}
                </Link>
              ) : (
                course.title
              )}
              <Text style={styles.courseProvider}> · {courseMeta(course)}</Text>
            </Text>
          ))}
        </SidebarSection>
      )}
    </View>
  );
}

/** Modern resume: one page, sidebar with photo, from the Hygraph home data plus `resume-content.ts`. */
export function ModernResumeDocument(props: ResumeDocumentProps) {
  const { content, copy, fit, info, locale, siteUrl } = props;
  const projects = info.highlightProjects.slice(0, fit.maxProjects);

  return (
    <Document
      author={content.fullName}
      language={locale}
      title={`${content.fullName} - ${content.headline}`}
    >
      <Page size="A4" style={styles.page}>
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
                <View key={project.slug} style={styles.project}>
                  <Link
                    src={`${siteUrl}/${locale}/projects/${project.slug}`}
                    style={styles.projectTitle}
                  >
                    {project.title}
                  </Link>
                  {fit.projectDescriptions && (
                    <Text>{project.shortDescription}</Text>
                  )}
                  <Text style={styles.projectTechs}>
                    {technologiesLabel(project.technologies)}
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
