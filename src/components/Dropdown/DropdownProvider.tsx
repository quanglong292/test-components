// DropdownProvider.tsx
import { ReactNode, useEffect, useRef, useState } from "react";
import DropdownContext from "./DropdownContext";
import { Menu } from "./Dropdown";

const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [menu, setMenu] = useState<Menu[]>([]);
  const node = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const dropdownOptionRef = document.getElementById("dropdown-option");
    if (
      node.current?.contains(e.target as Node) ||
      dropdownOptionRef?.contains(e.target as Node)
    ) {
      // inside click
      return;
    }
    // outside click
    setClickPosition(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //   <DropdownOption />

  return (
    <DropdownContext.Provider
      value={{ clickPosition, setClickPosition, menu, setMenu }}
    >
      {children}
      {/* Out side of the scroll box */}
      <div id="dropdown-option"></div>
    </DropdownContext.Provider>
  );
};

export default DropdownProvider;
