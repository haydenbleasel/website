import { Navigation } from './navigation';
import { Theme } from './theme';

export const Sidebar = () => (
  <div className="sticky top-16 hidden h-[calc(100vh-4rem)] flex-col justify-center p-4 md:flex">
    <Navigation />
    <div className="absolute bottom-0 left-0 p-4">
      <Theme />
    </div>
  </div>
);
