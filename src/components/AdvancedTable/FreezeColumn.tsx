import React, { useState } from "react";
import { Dropdown, Checkbox, Button, Divider } from "antd";
import { PushpinOutlined } from "@ant-design/icons";
import { DataType } from "./AdvancedTable";
import { ColumnsType } from "antd/es/table";

interface FreezeColumnProps {
  columns: DataType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnsType<DataType>>>;
}

const FreezeColumn: React.FC<FreezeColumnProps> = ({ columns, setColumns }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleItemClick = (key: React.Key) => {
    setColumns(
      columns.map((col) =>
        col.key === key ? { ...col, fixed: !col.fixed } : col
      )
    );
  };

  const menu = (
    <div style={{ background: "white", padding: 14 }}>
      <h2>Choose columns to freeze</h2>
      {columns
        .sort((a, b) => a.columnIndex - b.columnIndex)
        .map((col) => (
          <div key={col.key}>
            <Checkbox
              checked={col.fixed}
              onChange={() => handleItemClick(col.key)}
            >
              {col.title}
            </Checkbox>
          </div>
        ))}
      <Divider />
      <Button type="primary" onClick={() => handleVisibleChange(false)}>
        Save to this view
      </Button>
    </div>
  );

  return (
    <Dropdown
      trigger={["click"]}
      overlay={menu}
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button icon={<PushpinOutlined />} onClick={(e) => e.stopPropagation()} />
    </Dropdown>
  );
};

export default FreezeColumn;
