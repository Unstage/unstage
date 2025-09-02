// ========================
// SCENARIO FILTER OPTIONS
// ========================

export const ROLES = [
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "Full-Stack", value: "full-stack" },
  { label: "Mobile", value: "mobile" },
  { label: "DevOps", value: "devops" },
  { label: "Data Science", value: "data-science" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Site Reliability", value: "site-reliability" },
] as const;

export const SKILL_LEVELS = [
  { label: "Intern", value: "intern" },
  { label: "Entry Level", value: "entry-level" },
  { label: "Mid Level", value: "mid-level" },
  { label: "Senior", value: "senior" },
  { label: "Staff", value: "staff" },
  { label: "Principal", value: "principal" },
  { label: "Distinguished", value: "distinguished" },
] as const;

export const DURATIONS = [
  { label: "Less than 1 hour", value: "under-1h" },
  { label: "Under 2 hours", value: "under-2h" },
  { label: "Under 3 hours", value: "under-3h" },
  { label: "Under 4 hours", value: "under-4h" },
  { label: "4+ hours", value: "4h-plus" },
] as const;

export const SKILLS = [
  { label: "Debugging", value: "debugging" },
  { label: "New Feature", value: "new-feature" },
  { label: "Version Control", value: "version-control" },
  { label: "Refactoring", value: "refactoring" },
  { label: "Testing", value: "testing" },
  { label: "Code Review", value: "code-review" },
  { label: "API Design", value: "api-design" },
  { label: "Database Design", value: "database-design" },
  { label: "Performance Optimization", value: "performance-optimization" },
  { label: "Security", value: "security" },
] as const;

export const TECH_STACKS = [
  // Frontend Frameworks
  "React", "Next.js", "Vue", "Angular", "Svelte", "Nuxt.js",
  // CSS Frameworks
  "Tailwind CSS", "Bootstrap", "Material UI", "Chakra UI", "Ant Design",
  // Backend Frameworks
  "Express.js", "FastAPI", "Django", "Flask", "Laravel", "Spring Boot", "Ruby on Rails",
  // Languages
  "JavaScript", "TypeScript", "Python", "Java", "C#", "Go", "Rust", "Swift", "Kotlin", "PHP",
  // Databases
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "DynamoDB",
  // Cloud/DevOps
  "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform",
  // Mobile
  "React Native", "Flutter", "Ionic",
  // Other
  "GraphQL", "REST API", "WebSockets", "Microservices", "Hono",
] as const;

// ========================
// FILTER DISPLAY MAPPINGS
// ========================

export type FilterValue = string | string[] | number;

export const FILTER_MAPPINGS: Record<string, { getLabel: (value: FilterValue) => string }> = {
  role: {
    getLabel: (value: FilterValue) =>
      ROLES.find((role) => role.value === value)?.label || String(value),
  },
  stack: {
    getLabel: (value: FilterValue) =>
      Array.isArray(value) ? value.join(", ") : String(value),
  },
  level: {
    getLabel: (value: FilterValue) =>
      SKILL_LEVELS.find((level) => level.value === value)?.label || String(value),
  },
  duration: {
    getLabel: (value: FilterValue) =>
      DURATIONS.find((duration) => duration.value === value)?.label || String(value),
  },
  skills: {
    getLabel: (value: FilterValue) => {
      if (Array.isArray(value)) {
        return value
          .map((v) => SKILLS.find((skill) => skill.value === v)?.label || v)
          .join(", ");
      }
      return SKILLS.find((skill) => skill.value === value)?.label || String(value);
    },
  },
};