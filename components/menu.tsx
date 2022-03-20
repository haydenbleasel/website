import { useKBar } from "kbar";
import type { FC } from "react";
import { Menu as MenuList } from "react-feather";
import tailwindConfig from "../tailwind.config";

const Menu: FC = () => {
  const kbar = useKBar();

  return (
    <div
      className="fixed top-0 right-0 p-4"
      onClick={() => kbar.query.toggle()}
      onKeyDown={() => kbar.query.toggle()}
      role="button"
      tabIndex={0}
    >
      <MenuList size={16} color={tailwindConfig.theme.colors.gray[400]} />
    </div>
  );
};

export default Menu;
