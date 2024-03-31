import React, { useEffect, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { CheckboxOptionType, TableColumnsType } from "antd";
import { Badge, Checkbox, Dropdown, Space, Table } from "antd";
import TableView from "./CTable";
import FreezeColumn from "./FreezeColumn";

export interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
  hidden: boolean;
  fixed: boolean;
  title: string;
  columnIndex: number;
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

const AdvancedTable: React.FC = () => {
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
            {/* <Dropdown menu={{ items }}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown> */}
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
    {
      title: "Name",
      width: 300,
      dataIndex: "name",
      key: "name",
      fixed: true,
    },
    {
      title: "Platform",
      width: 300,
      dataIndex: "platform",
      key: "platform",
      fixed: true,
    },
    {
      title: "Version",
      width: 300,
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Upgraded",
      width: 300,
      dataIndex: "upgradeNum",
      key: "upgradeNum",
    },
    {
      title: "Creator",
      width: 300,
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Date",
      width: 300,
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Date",
      width: 300,
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Date",
      width: 300,
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      width: 300,
      key: "operation",
      render: () => <a>Publish</a>,
    },
  ]);
  const [checkedList, setCheckedList] = useState(
    columns.map((item) => item.key as string)
  );

  const options = columns.map(({ key, title }) => ({
    label: title,
    value: key,
  }));

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

  console.log({
    checkedList,
    columns: columns.map((item) => ({
      ...item,
      hidden: !checkedList.includes(item.key as string),
    })),
  });

  useEffect(() => {
    setColumns(columns.map((i, index) => ({ ...i, columnIndex: index })));
  }, []);

  return (
    <div className="advanced-table">
      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />
      <FreezeColumn columns={(columns as DataType[])} setColumns={setColumns} />
      <TableView
        columns={columns.filter((item) =>
          checkedList.includes(item.key as string)
        )}
        onColumnOrderChange={(columns) => setColumns(columns)}
        onDataSourceChange={setDataSource}
        onClickAdd={() => {
          console.log("Click Add!");
          setDataSource([
            ...dataSource,
            {
              key: (dataSource.length + 1).toString(),
              columnIndex: dataSource.length + 1,
              name: "Screen",
              title: "Screen",
              platform: "iOS",
              version: "10.3.4.5654",
              upgradeNum: 500,
              creator: "Jack",
              createdAt: "2014-12-24 23:12:00",
              hidden: false,
              fixed: false,
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
        scroll={{ x: 1200 }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default AdvancedTable;
