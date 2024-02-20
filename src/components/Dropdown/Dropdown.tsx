import React, { ReactNode, useContext, useEffect, useRef } from "react";
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
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!buttonRef) return;

    const rect = buttonRef?.current?.getBoundingClientRect();
    // const target = e.target as HTMLElement;
    // const rect = target.getBoundingClientRect();

    if (!rect) return;

    setClickPosition({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
  };

  useEffect(() => {
    setMenu(menu);
  }, [menu, setMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if (clickPosition?.x && clickPosition?.y) {
        handleClick();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [clickPosition]);

  return (
    <div className="dropdown">
      <div ref={buttonRef} id="event-trigger-dropdown" onClick={handleClick}>
        {children}
      </div>
      {document.getElementById("dropdown-option") &&
        createPortal(
          <DropdownOption {...clickPosition} />,
          document.getElementById("dropdown-option")!
        )}
    </div>
  );
};

export default CustomDropdown;
