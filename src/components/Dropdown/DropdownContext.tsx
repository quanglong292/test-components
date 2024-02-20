import React from "react";
import { Menu } from "./Dropdown";

interface DropdownContextProps {
  clickPosition: { x: number; y: number } | null;
  setClickPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
  menu: Menu[];
  setMenu: React.Dispatch<
    React.SetStateAction<{ label: string; action: () => void }[]>
  >;
}

const DropdownContext = React.createContext<DropdownContextProps>({
  clickPosition: null,
  setClickPosition: () => {},
  menu: [],
  setMenu: () => {},
});

export default DropdownContext;
