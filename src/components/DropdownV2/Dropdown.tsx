import React from "react";
import { Dropdown, Menu } from "antd";
import CCalendar from "../CCalendar";

const { SubMenu } = Menu;

const menu = (
  <Menu>
    <Menu.Item>Option 1</Menu.Item>
    <SubMenu title="Submenu">
      <Menu.Item>
        <div onClick={(e) => e.stopPropagation()}>
          <CCalendar open />
        </div>
      </Menu.Item>
    </SubMenu>
    <SubMenu title="Submenu">
      <Menu.Item>
        <div
          onKeyDown={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input />
        </div>
      </Menu.Item>
    </SubMenu>
  </Menu>
);

const DropdownComponent = () => (
  <Dropdown dropdownRender={() => menu} trigger={["click"]}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      Click me
    </a>
  </Dropdown>
);

export default DropdownComponent;
