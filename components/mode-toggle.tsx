'use client';

import { useTheme } from 'next-themes';

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FC } from 'react';

const themeIcons: Record<string, typeof MoonIcon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: DesktopIcon,
};

const ThemeSelectItem: FC<{ readonly value: string }> = ({ value }) => {
  const Icon = themeIcons[value];

  return (
    <SelectItem value={value} key={value}>
      <div className="flex items-center gap-2.5">
        <Icon className="w-4 h-4 shrink-0" />
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </div>
    </SelectItem>
  );
};

export const ModeToggle: FC = () => {
  const { setTheme, themes, theme } = useTheme();

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="dark:border-zinc-700 flex items-center gap-2.5">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((option) => (
          <ThemeSelectItem key={option} value={option} />
        ))}
      </SelectContent>
    </Select>
  );
};
