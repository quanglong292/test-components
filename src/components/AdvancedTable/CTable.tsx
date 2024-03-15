import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { Button, Slider, Table } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import "./custom.css";
import create from "@ant-design/icons/lib/components/IconFont";

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

const TableView = (props) => {
  const defaultColumns = [
    {
      title: <span className="dragHandler">Key</span>,
      dataIndex: "key",
      render: (text) => <span>{text}</span>,
      width: 50,
      sorter: (a, b) => a.age - b.age,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(0),
      }),
    },
    {
      title: <span className="dragHandler">Name</span>,
      dataIndex: "name",
      width: 200,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(1),
      }),
    },
    {
      title: <span className="dragHandler">Gender</span>,
      dataIndex: "gender",
      width: 100,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(2),
      }),
    },
    {
      title: <span className="dragHandler">Age</span>,
      dataIndex: "age",
      width: 100,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(3),
      }),
    },
    {
      title: <span className="dragHandler">Address</span>,
      dataIndex: "address",
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(4),
      }),
    },
  ];
  const [columns, setColumns] = useState(defaultColumns);
  const [selectingColumn, setSelectingColumn] = useState(0);

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
      console.log("column 2: ", columns[index].width);

      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };

      console.log("column 2: ", nextColumns[index].width);

      setColumns(nextColumns);
    };

  const createColumns = () => {
    return defaultColumns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }));
  };

  useEffect(() => {
    setColumns(createColumns());
  }, []);

  return (
    <>
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
      {defaultColumns.map((col, index) => (
        <Button onClick={() => setSelectingColumn(index)}>{col.title}</Button>
      ))}
      <Slider
        onChange={(e) => {
          const index = selectingColumn;
          const nextColumns = [...columns];
          nextColumns[index] = {
            ...nextColumns[index],
            width: e + 100,
          };

          console.log("column 2: ", nextColumns[index].width);

          setColumns(nextColumns);
        }}
      />
    </>
  );
};

export default TableView;
