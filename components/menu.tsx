import type { FC, KeyboardEventHandler, MouseEventHandler } from 'react';
import { useState } from 'react';
import { Menu as MenuList } from 'react-feather';
import toast from 'react-hot-toast';
import { useCommandBar } from '@haydenbleasel/command-bar';
import getCommandKey from '../utils/getCommandKey';

const Menu: FC = () => {
  const commandBar = useCommandBar();
  const [clickNotified, setClickNotified] = useState(false);

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      commandBar.toggleOpen();
    }
  };

  const clickHandler: MouseEventHandler<HTMLDivElement> = () => {
    if (!clickNotified) {
      toast(`You can also press ${getCommandKey()}K to open the menu!`);
      setClickNotified(true);
    }
    commandBar.toggleOpen();
  };

  return (
    <div
      className="fixed top-0 right-0 z-20 p-4 text-neutral-500 dark:text-neutral-400 print:hidden"
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
