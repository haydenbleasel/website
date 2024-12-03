import { ViewAnimation } from '../../providers/view-animation';
import { Links } from './links';
import { Status } from './status';
import { ThemeSwitcher } from './theme-switcher';

export const Footer = () => (
  <footer className="container mx-auto flex flex-col gap-16 px-4 py-16 sm:px-0">
    <Links />
    <div className="grid grid-cols-3">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.4}
      >
        <Status />
      </ViewAnimation>
      <div className="flex items-center justify-center">
        <ViewAnimation
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.8}
        >
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Hayden Bleasel. All rights
            reserved.
          </p>
        </ViewAnimation>
      </div>
      <div className="flex items-center justify-end">
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
