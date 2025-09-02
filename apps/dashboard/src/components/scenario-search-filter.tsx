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
import {
  DURATIONS,
  FILTER_MAPPINGS,
  type FilterValue,
  ROLES,
  SKILL_LEVELS,
  SKILLS,
  TECH_STACKS,
} from "src/lib/filter-options";

export function ScenarioSearchFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [techStackSearch, setTechStackSearch] = useState("");
  const { filter, setFilter, hasFilters } = useScenarioFilterParams();

  const filteredTechStacks = TECH_STACKS.filter((tech) =>
    tech.toLowerCase().includes(techStackSearch.toLowerCase())
  );

  const updateArrayFilter = (
    key: string,
    value: string,
    checked: boolean,
    currentArray: string[] | null
  ) => {
    const current = currentArray || [];
    const updated = checked ? [...current, value] : current.filter((item) => item !== value);

    setFilter({
      ...filter,
      [key]: updated.length > 0 ? updated : null,
    });
  };

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
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredTechStacks.map((tech) => (
                    <DropdownMenuCheckboxItem
                      key={tech}
                      checked={filter.stack?.includes(tech) || false}
                      onCheckedChange={(checked) =>
                        updateArrayFilter("stack", tech, checked, filter.stack)
                      }
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
                {SKILL_LEVELS.map((level) => (
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
                {DURATIONS.map((duration) => (
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
                {ROLES.map((role) => (
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
                {SKILLS.map((skill) => (
                  <DropdownMenuCheckboxItem
                    key={skill.value}
                    checked={filter.skills?.includes(skill.value) || false}
                    onCheckedChange={(checked) =>
                      updateArrayFilter("skills", skill.value, checked, filter.skills)
                    }
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
            const mapping = FILTER_MAPPINGS[key];
            const displayValue = mapping ? mapping.getLabel(value as FilterValue) : String(value);

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
