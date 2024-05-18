import React, { useState } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./fixedTable.css";

const FixedHeaderTable: React.FC = () => {
  const [columns, setColumns] = useState([
    { title: "Column 1", dataIndex: "column1", key: "column1", fixed: true },
    { title: "Column 2", dataIndex: "column2", key: "column2", fixed: true },
  ]);
  const [dataSource, setDatasource] = useState<any[]>([
    { column1: "Data 1", column2: "Data 2" },
    { column1: "Data 1", column2: "Data 2" },
    { column1: "Data 1", column2: "Data 2" },
  ]);
  const handleAddColumn = () => {
    const newColumn = {
      title: `Column ${columns.length + 1}`,
      dataIndex: `column${columns.length + 1}`,
      key: `column${columns.length + 1}`,
      fixed: false,
    };
    setColumns([...columns, newColumn]);
  };

  const handleAddRow = () => {
    const newRow = columns.map((column) => ({
      [column.dataIndex]: `Data ${dataSource.length + 1}`,
    }));
    setDatasource([...dataSource, newRow]);
  };

  return (
    <div className="fixed-table">
      <div className="table-section" style={{ width: columns.length * 200 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ y: 500, x: columns.length * 150 }}
          pagination={false}
        />
        <div className="add-column-section">
          <Button
            type="primary"
            className="add-column-button"
            onClick={handleAddColumn}
            icon={<PlusOutlined />}
          />
          <div>Add new column</div>
        </div>
      </div>
      <Button type="primary" onClick={handleAddRow} icon={<PlusOutlined />} />
    </div>
  );
};

export default FixedHeaderTable;
