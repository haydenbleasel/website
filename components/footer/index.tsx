import { cn } from '@/lib/utils';
import { ViewAnimation } from '../../providers/view-animation';
import { Links } from './links';
import { Status } from './status';
import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => (
  <footer
    className={cn(
      'container mx-auto flex flex-col gap-4 px-4 py-8',
      'sm:gap-16 sm:px-8 sm:py-16'
    )}
  >
    <Links />
    <div className="grid items-center gap-4 sm:grid-cols-3">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
      >
        <Status />
      </ViewAnimation>
      <div className="flex items-center sm:justify-center">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <p className="whitespace-nowrap text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Hayden Bleasel. All rights
            reserved.
          </p>
        </ViewAnimation>
      </div>
      <div className="flex items-center sm:justify-end">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={1.2}
        >
          <ThemeSwitcher />
        </ViewAnimation>
      </div>
    </div>
  </footer>
);
