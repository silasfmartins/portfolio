"use client";

import { useTranslations } from "next-intl";
import { parseAsString, useQueryStates } from "nuqs";

import { ProjectsList } from "@/components/ProjectsList";
import { Button, SearchInput, Select } from "@/components/ui";
import { matchesSearch } from "@/lib/search";
import type { Project } from "@/types/projects";

const searchParsers = {
  q: parseAsString.withDefault(""),
  tech: parseAsString.withDefault(""),
};

function getTechnologyNames(project: Project) {
  return project.technologies.map((technology) => technology.name);
}

function getSearchableText(project: Project) {
  return [
    project.title,
    project.shortDescription,
    ...getTechnologyNames(project),
  ].join(" ");
}

interface SearchPanelProps {
  projects: Project[];
}

export function SearchPanel({ projects }: SearchPanelProps) {
  const t = useTranslations("IndexProjects");
  const [{ q, tech }, setFilters] = useQueryStates(searchParsers);

  const technologies = [...new Set(projects.flatMap(getTechnologyNames))].sort(
    (first, second) => first.localeCompare(second)
  );
  const activeTech = technologies.includes(tech) ? tech : "";
  const isSearching = Boolean(q.trim() || activeTech);
  const results = projects.filter(
    (project) =>
      matchesSearch(getSearchableText(project), q) &&
      (!activeTech || getTechnologyNames(project).includes(activeTech))
  );

  return (
    <div data-search-active={isSearching ? "" : undefined}>
      <div className="container space-y-3 pb-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <SearchInput
            className="sm:flex-1"
            label={t("searchLabel")}
            onSearch={(value) => setFilters({ q: value })}
            placeholder={t("searchPlaceholder")}
            value={q}
          />
          <Select
            aria-label={t("technologyLabel")}
            className="sm:w-64"
            onChange={(event) =>
              setFilters({ tech: event.target.value || null })
            }
            value={activeTech}
          >
            <option value="">{t("allTechnologies")}</option>
            {technologies.map((technology) => (
              <option key={technology} value={technology}>
                {technology}
              </option>
            ))}
          </Select>
        </div>

        <div
          aria-live="polite"
          className="text-muted-foreground text-sm"
          role="status"
        >
          {isSearching && t("searchResults", { count: results.length })}
        </div>
      </div>

      {isSearching &&
        (results.length > 0 ? (
          <ProjectsList projects={results} />
        ) : (
          <div className="container flex flex-col items-center gap-4 pb-20 text-center sm:pb-24">
            <p className="text-muted-foreground">{t("noResults")}</p>
            <Button
              onClick={() => setFilters({ q: null, tech: null })}
              size="sm"
              variant="outline"
            >
              {t("clearSearch")}
            </Button>
          </div>
        ))}
    </div>
  );
}
