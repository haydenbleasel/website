import { useKBar } from 'kbar';
import type { FC, KeyboardEventHandler, MouseEventHandler } from 'react';
import { useState } from 'react';
import { Menu as MenuList } from 'react-feather';
import toast from 'react-hot-toast';

const Menu: FC = () => {
  const kbar = useKBar();
  const [clickNotified, setClickNotified] = useState(false);

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      kbar.query.toggle();
    }
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = () => {
    if (!clickNotified) {
      toast('You can also press ⌘K to open the menu!');
      setClickNotified(true);
    }
    kbar.query.toggle();
  };

  return (
    <div
      className="fixed top-0 right-0 z-20 p-4 text-gray-500 dark:text-gray-400 print:hidden"
      onClick={clickHandler}
      onKeyDown={keyDownHandler}
      role="button"
      tabIndex={0}
    >
      <MenuList size={16} aria-label="Menu" />
    </div>
  );
};

export default Menu;
