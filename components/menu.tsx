import { useKBar } from "kbar";
import type { FC, KeyboardEventHandler } from "react";
import { Menu as MenuList } from "react-feather";
import toast from "react-hot-toast";

const Menu: FC = () => {
  const kbar = useKBar();

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      kbar.query.toggle();
      toast("You can also press ⌘K to open the menu!");
    }
  };

  return (
    <div
      className="fixed top-0 right-0 p-4 text-gray-400 dark:text-gray-500"
      onClick={() => kbar.query.toggle()}
      onKeyDown={keyDownHandler}
      role="button"
      tabIndex={0}
    >
      <MenuList size={16} />
    </div>
  );
};

export default Menu;
