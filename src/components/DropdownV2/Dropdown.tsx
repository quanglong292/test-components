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
  </Menu>
);

const DropdownComponent = () => (
  <Dropdown overlay={menu} trigger={["click"]}>
    <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      Click me
    </a>
  </Dropdown>
);

export default DropdownComponent;
