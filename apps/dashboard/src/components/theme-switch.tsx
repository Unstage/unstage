"use client";

import { Icons } from "@unstage/ui/components/icons";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@unstage/ui/components/select";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Theme = "dark" | "system" | "light";

type Props = {
  currentTheme?: Theme;
};

const ThemeIcon = ({ currentTheme }: Props) => {
  switch (currentTheme) {
    case "dark":
      return <Icons.Moon size={12} />;
    case "system":
      return <Icons.Monitor size={12} />;
    default:
      return <Icons.Sun size={12} />;
  }
};

export const ThemeSwitch = () => {
  const { theme, setTheme, themes, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-[32px]" />;
  }

  return (
    <div className="flex items-center relative">
      <Select value={theme} onValueChange={(value: Theme) => setTheme(value)}>
        <SelectTrigger className="w-full pl-6 pr-3 py-1.5 bg-transparent outline-none capitalize h-[32px] text-xs">
          <SelectValue>
            {theme ? theme.charAt(0).toUpperCase() + theme.slice(1) : "Select theme"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {themes.map((theme) => (
              <SelectItem key={theme} value={theme} className="capitalize">
                {theme}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="absolute left-2 pointer-events-none">
        <ThemeIcon currentTheme={resolvedTheme as Theme} />
      </div>
    </div>
  );
};
