import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Table } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import "./custom.css";

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const defaultColumns = [
  {
    title: <span className="dragHandler">Key</span>,
    dataIndex: "key",
    render: (text) => <span>{text}</span>,
    width: 50,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: <span className="dragHandler">Name</span>,
    dataIndex: "name",
    width: 200,
  },
  {
    title: <span className="dragHandler">Gender</span>,
    dataIndex: "gender",
    width: 100,
  },
  {
    title: <span className="dragHandler">Age</span>,
    dataIndex: "age",
    width: 100,
  },
  {
    title: <span className="dragHandler">Address</span>,
    dataIndex: "address",
  },
];

const TableView = (props) => {
  const [columns, setColumns] = useState(defaultColumns);

  const data = [
    {
      key: "1",
      name: "Boran",
      gender: "male",
      age: "12",
      address: "New York",
    },
    {
      key: "2",
      name: "JayChou",
      gender: "male",
      age: "38",
      address: "TaiWan",
    },
    {
      key: "3",
      name: "Lee",
      gender: "female",
      age: "22",
      address: "BeiJing",
    },
    {
      key: "4",
      name: "ChouTan",
      gender: "male",
      age: "31",
      address: "HangZhou",
    },
    {
      key: "5",
      name: "AiTing",
      gender: "female",
      age: "22",
      address: "Xi’An",
    },
  ];

  const dragProps = useMemo(() => {
    return {
      nodeSelector: "th",
      handleSelector: ".dragHandler",
      ignoreSelector: "react-resizable-handle",
    };
  }, [data, columns]);

  const handleResize =
    (index) =>
    (_, { size }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      console.log({ columns, nextColumns });

      setColumns(nextColumns);
    };

  useEffect(() => {
    columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));
  }, []);

  return (
    <ReactDragListView.DragColumn
      {...dragProps}
      onDragEnd={(fromIndex, toIndex) => {
        let newColumns = [...columns];
        newColumns.splice(toIndex, 0, newColumns.splice(fromIndex, 1)[0]);
        setColumns(newColumns);
      }}
    >
      <Table
        bordered
        components={{
          header: {
            cell: ResizableTitle,
          },
        }}
        columns={columns}
        dataSource={data}
      />
    </ReactDragListView.DragColumn>
  );
};

export default TableView;
