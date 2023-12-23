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
      <span className="flex items-center gap-2.5">
        <Icon className="w-4 h-4 shrink-0" />
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    </SelectItem>
  );
};

export const ModeToggle: FC = () => {
  const { setTheme, themes, theme } = useTheme();
  const Icon = themeIcons[theme ?? 'system'];

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="dark:border-zinc-700">
        <SelectValue placeholder="Theme">
          <span className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 shrink-0" />
            {theme
              ? `${theme.charAt(0).toUpperCase()}${theme.slice(1)}`
              : 'System'}
            {}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {themes.map((option) => (
          <ThemeSelectItem key={option} value={option} />
        ))}
      </SelectContent>
    </Select>
  );
};
