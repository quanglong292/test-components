import React, { ReactNode, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Dropdown.css"; // Import the CSS
import DropdownContext from "./DropdownContext";
import DropdownOption from "./DropdownOption";

export type Menu = {
  label: string;
  action: () => void;
  children?: Menu[] | ReactNode;
};

interface CustomDropdownProps {
  children: ReactNode;
  menu: Menu[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ children, menu }) => {
  const { clickPosition, setClickPosition, setMenu } =
    useContext(DropdownContext);

  const handleClick = (e) => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    setClickPosition({ x: rect.left + 4, y: rect.bottom + 4 });
  };

  useEffect(() => {
    setMenu(menu);
  }, [menu, setMenu]);

  return (
    <div className="dropdown">
      <div onClick={handleClick}>{children}</div>
      {document.getElementById("dropdown-option") &&
        createPortal(
          <DropdownOption {...clickPosition} />,
          document.getElementById("dropdown-option")!
        )}
    </div>
  );
};

export default CustomDropdown;
