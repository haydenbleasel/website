import { useKBar } from "kbar";
import type { FC, KeyboardEventHandler } from "react";
import { Menu as MenuList } from "react-feather";
import tailwindConfig from "../tailwind.config";

const Menu: FC = () => {
  const kbar = useKBar();

  const keyDownHandler: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.code === "Space") {
      event.preventDefault();
      event.stopPropagation();
      kbar.query.toggle();
    }
  };

  return (
    <div
      className="fixed top-0 right-0 p-4"
      onClick={() => kbar.query.toggle()}
      onKeyDown={keyDownHandler}
      role="button"
      tabIndex={0}
    >
      <MenuList size={16} color={tailwindConfig.theme.colors.gray[400]} />
    </div>
  );
};

export default Menu;
