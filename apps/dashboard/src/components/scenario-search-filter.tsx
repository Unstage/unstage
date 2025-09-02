import { Button } from "@unstage/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@unstage/ui/components/dropdown-menu";
import { Icons } from "@unstage/ui/components/icons";
import { Input } from "@unstage/ui/components/input";
import { cn } from "@unstage/ui/lib/utils";
import { useState } from "react";
import { useScenarioFilterParams } from "src/hooks/use-scenario-filter-params";

const roles = [
  {
    label: "Frontend",
    value: "frontend",
  },
  {
    label: "Backend",
    value: "backend",
  },
  {
    label: "Full-Stack",
    value: "full-stack",
  },
  {
    label: "Mobile",
    value: "mobile",
  },
  {
    label: "DevOps",
    value: "devops",
  },
  {
    label: "Data Science",
    value: "data-science",
  },
  {
    label: "Machine Learning",
    value: "machine-learning",
  },
  {
    label: "Site Reliability",
    value: "site-reliability",
  },
];

const skillLevels = [
  {
    label: "Intern",
    value: "intern",
  },
  {
    label: "Entry Level",
    value: "entry-level",
  },
  {
    label: "Mid Level",
    value: "mid-level",
  },
  {
    label: "Senior",
    value: "senior",
  },
  {
    label: "Staff",
    value: "staff",
  },
  {
    label: "Principal",
    value: "principal",
  },
  {
    label: "Distinguished",
    value: "distinguished",
  },
];

const durations = [
  {
    label: "Less than 1 hour",
    value: "under-1h",
  },
  {
    label: "Under 2 hours",
    value: "under-2h",
  },
  {
    label: "Under 3 hours",
    value: "under-3h",
  },
  {
    label: "Under 4 hours",
    value: "under-4h",
  },
  {
    label: "4+ hours",
    value: "4h-plus",
  },
];

const skills = [
  {
    label: "Debugging",
    value: "debugging",
  },
  {
    label: "New Feature",
    value: "new-feature",
  },
  {
    label: "Version Control",
    value: "version-control",
  },
  {
    label: "Refactoring",
    value: "refactoring",
  },
  {
    label: "Testing",
    value: "testing",
  },
  {
    label: "Code Review",
    value: "code-review",
  },
  {
    label: "API Design",
    value: "api-design",
  },
  {
    label: "Database Design",
    value: "database-design",
  },
  {
    label: "Performance Optimization",
    value: "performance-optimization",
  },
  {
    label: "Security",
    value: "security",
  },
];

const techStacks = [
  // Frontend Frameworks
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "Svelte",
  "Nuxt.js",
  // CSS Frameworks
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  // Backend Frameworks
  "Express.js",
  "FastAPI",
  "Django",
  "Flask",
  "Laravel",
  "Spring Boot",
  "Ruby on Rails",
  // Languages
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
  // Databases
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "SQLite",
  "DynamoDB",
  // Cloud/DevOps
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "Kubernetes",
  "Terraform",
  // Mobile
  "React Native",
  "Flutter",
  "Ionic",
  // Other
  "GraphQL",
  "REST API",
  "WebSockets",
  "Microservices",
  "Hono",
];

// biome-ignore lint/suspicious/noExplicitAny: <filter mappings>
const filterMappings: Record<string, { getLabel: (value: any) => string }> = {
  role: {
    getLabel: (value: string) => roles.find((role) => role.value === value)?.label || value,
  },
  stack: {
    getLabel: (value: string | string[]) => {
      if (Array.isArray(value)) {
        return value.join(", ");
      }
      return String(value);
    },
  },
  level: {
    getLabel: (value: string) => skillLevels.find((level) => level.value === value)?.label || value,
  },
  duration: {
    getLabel: (value: string) =>
      durations.find((duration) => duration.value === value)?.label || value,
  },
  skills: {
    getLabel: (value: string | string[]) => {
      if (Array.isArray(value)) {
        return value.map((v) => skills.find((skill) => skill.value === v)?.label || v).join(", ");
      }
      return skills.find((skill) => skill.value === value)?.label || String(value);
    },
  },
};

export function ScenarioSearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [techStackSearch, setTechStackSearch] = useState("");
  const { filter, setFilter, hasFilters } = useScenarioFilterParams();

  const filteredTechStacks = techStacks.filter((tech) =>
    tech.toLowerCase().includes(techStackSearch.toLowerCase())
  );

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <form className="w-[315px] relative">
          <Icons.Search className="absolute pointer-events-none left-3 top-[10px]" />
          <Input
            className="w-full !bg-background focus-visible:ring-0 pl-9"
            type="text"
            placeholder="Search or filter scenarios"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
            value={filter.q || ""}
            onChange={(evt) => setFilter({ ...filter, q: evt.target.value || null })}
          />
          <DropdownMenuTrigger asChild>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              type="button"
              className={cn(
                "absolute z-10 right-3 top-[10px] opacity-50 transition-opacity duration-300 hover:opacity-100 focus:outline-none",
                isOpen && "opacity-100"
              )}
            >
              <Icons.Filter className="pointer-events-none" />
            </button>
          </DropdownMenuTrigger>
        </form>

        <DropdownMenuContent
          className="w-[315px]"
          sideOffset={19}
          alignOffset={-11}
          side="bottom"
          align="end"
        >
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.Stacks className="mr-2 size-4 text-muted-foreground" />
                <span>Tech stack</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={16} className="w-64">
                <div className="relative p-1">
                  <Icons.Search className="absolute pointer-events-none left-4 top-3" />
                  <Input
                    placeholder="Search technologies"
                    value={techStackSearch}
                    onChange={(e) => setTechStackSearch(e.target.value)}
                    className="h-8 bg-background! pl-9"
                    autoFocus
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredTechStacks.map((tech) => (
                    <DropdownMenuCheckboxItem
                      key={tech}
                      checked={filter.stack?.includes(tech) || false}
                      onCheckedChange={(checked) => {
                        const currentStack = filter.stack || [];
                        const newStack = checked
                          ? [...currentStack, tech]
                          : currentStack.filter((s) => s !== tech);
                        setFilter({
                          ...filter,
                          stack: newStack.length > 0 ? newStack : null,
                        });
                      }}
                      onSelect={(event) => event.preventDefault()}
                    >
                      {tech}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.SlidersHorizontal className="mr-2 size-4 text-muted-foreground" />
                <span>Skill level</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={16}>
                {skillLevels.map((level) => (
                  <DropdownMenuCheckboxItem
                    key={level.value}
                    checked={filter.level === level.value}
                    onCheckedChange={(checked) =>
                      setFilter({
                        ...filter,
                        level: checked ? level.value : null,
                      })
                    }
                    onSelect={(event) => event.preventDefault()}
                  >
                    {level.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.Clock className="mr-2 size-4 text-muted-foreground" />
                <span>Estimated duration</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={16}>
                {durations.map((duration) => (
                  <DropdownMenuCheckboxItem
                    key={duration.value}
                    checked={filter.duration === duration.value}
                    onCheckedChange={(checked) =>
                      setFilter({
                        ...filter,
                        duration: checked ? duration.value : null,
                      })
                    }
                    onSelect={(event) => event.preventDefault()}
                  >
                    {duration.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.Positions className="mr-2 size-4 text-muted-foreground" />
                <span>Role relevance</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={16}>
                {roles.map((role) => (
                  <DropdownMenuCheckboxItem
                    key={role.value}
                    checked={filter.role === role.value}
                    onCheckedChange={(checked) =>
                      setFilter({
                        ...filter,
                        role: checked ? role.value : null,
                      })
                    }
                  >
                    {role.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icons.Tools className="mr-2 size-4 text-muted-foreground" />
                <span>Covered skills</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent sideOffset={16}>
                {skills.map((skill) => (
                  <DropdownMenuCheckboxItem
                    key={skill.value}
                    checked={filter.skills?.includes(skill.value) || false}
                    onCheckedChange={(checked) => {
                      const currentSkills = filter.skills || [];
                      const newSkills = checked
                        ? [...currentSkills, skill.value]
                        : currentSkills.filter((s) => s !== skill.value);
                      setFilter({
                        ...filter,
                        skills: newSkills.length > 0 ? newSkills : null,
                      });
                    }}
                    onSelect={(event) => event.preventDefault()}
                  >
                    {skill.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {hasFilters &&
        Object.entries(filter)
          .filter(([key, value]) => key !== "q" && value)
          .map(([key, value]) => {
            const mapping = filterMappings[key as keyof typeof filterMappings];
            const displayValue = mapping ? mapping.getLabel(value as unknown) : value;

            return (
              <Button
                key={key}
                variant="ghost"
                className="flex items-center bg-accent hover:text-red-400/80"
                title="Remove filter"
                onClick={() => setFilter({ ...filter, [key]: null })}
              >
                <span className="text-xs font-medium">{displayValue}</span>
              </Button>
            );
          })}
    </div>
  );
}
