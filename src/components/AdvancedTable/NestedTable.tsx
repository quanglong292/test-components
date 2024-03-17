import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import TableView from "./CTable";

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

const NestedTable: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown menu={{ items }}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return (
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    );
  };

  const [columns, setColumns] = useState<TableColumnsType<DataType>>([
    { title: "Name", width: "auto", dataIndex: "name", key: "name" },
    {
      title: "Platform",
      width: "auto",
      dataIndex: "platform",
      key: "platform",
    },
    { title: "Version", width: "auto", dataIndex: "version", key: "version" },
    {
      title: "Upgraded",
      width: "auto",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
    },
    { title: "Creator", width: "auto", dataIndex: "creator", key: "creator" },
    { title: "Date", width: "auto", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Action",
      width: "auto",
      key: "operation",
      render: () => <a>Publish</a>,
    },
  ]);

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screen",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }

  const [dataSource, setDataSource] = useState<DataType[]>(data);

  return (
    <TableView
      columns={columns}
      onColumnOrderChange={(columns) => setColumns(columns)}
      onDataSourceChange={setDataSource}
      onClickAdd={() => {
        console.log("Click Add!");
        setDataSource([
          ...dataSource,
          {
            key: (dataSource.length + 1).toString(),
            name: "Screen",
            platform: "iOS",
            version: "10.3.4.5654",
            upgradeNum: 500,
            creator: "Jack",
            createdAt: "2014-12-24 23:12:00",
          },
        ]);
      }}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: [],
      }}
      dataSource={dataSource}
      size="small"
      bordered
    />
  );
};

export default NestedTable;
