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
  const [selectedColumns, setSelectedColumns] = useState<DataType[]>(columns);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const handleItemClick = (key: React.Key) => {
    const newColumns = selectedColumns
      .map((col) => (col.key === key ? { ...col, fixed: !col.fixed } : col)) // create a shallow copy of the columns array
      .sort((a, b) => (a.fixed && !b.fixed ? -1 : b.fixed && !a.fixed ? 1 : 0)); // sort the columns based on the fixed property
    setSelectedColumns(newColumns);
  };

  const menu = (
    <div style={{ background: "white", padding: 14 }}>
      <h2>Choose columns to freeze</h2>
      {selectedColumns
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
      <Button
        type="primary"
        onClick={() => {
          setColumns(selectedColumns);
          handleVisibleChange(false);
        }}
      >
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
