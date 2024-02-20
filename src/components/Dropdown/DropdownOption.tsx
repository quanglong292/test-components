import React, { useContext } from "react";
import DropdownContext from "./DropdownContext";

interface DropdownOptionProps {
  x?: number;
  y?: number;
}

const DropdownOption = (props: DropdownOptionProps) => {
  const { menu } = useContext(DropdownContext);
  const x = props?.x;
  const y = props?.y;

  if (!x && !y) return <></>;

  const style: any = {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    background: "black",
  };

  return (
    <div style={style}>
      {menu.map((item, index) =>
        !item?.children ? (
          <div key={item.label} onClick={() => item?.action(item, index)}>
            {item.label}
          </div>
        ) : (
          <div key={item.label} className="sub-dropdown">
            <div key={item.label}>
              {item.label} <span>{">"}</span>
            </div>
            <div className="sub-dropdown-node-item">
              {React.isValidElement(item?.children)
                ? item?.children
                : item?.children?.length
                ? item?.children?.map((child, index) => (
                    <div
                      key={child.label}
                      onClick={() => child?.action(child, index)}
                    >
                      {child.label}
                    </div>
                  ))
                : null}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DropdownOption;
