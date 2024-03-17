import { useEffect, useState } from "react";
import { Button, type TableColumnsType, type TableProps } from "antd";
import { Resizable } from "react-resizable";
import ReactDragListView from "react-drag-listview";
import "./custom.css";
import RowDragTable from "./RowDragTable";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";

interface CTableProps extends TableProps<any> {
  onColumnOrderChange?: (columns: any) => void;
  onDataSourceChange?: (dataSource: any) => void;
  onClickAdd?: () => void;
}

interface CTableColumnsType extends TableColumnsType<any> {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResizableTitle = (props: any) => {
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

const TableView = (props: CTableProps) => {
  const defaultColumns: any = [
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
  const columns = [
    ...(props?.columns?.map((i) => ({
      ...i,
      title: <span className="dragHandler">{i.title ?? ""}</span>,
    })) || []),
    {
      key: "sort",
    },
  ];
  // const [columns, setColumns] = useState<CTableColumnsType>(
  //   props?.columns || []
  // );
  const [selectingColumn, setSelectingColumn] = useState(0);

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

      // setColumns(nextColumns);
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
    // setColumns(createColumns());
  }, []);

  return (
    <>
      <ReactDragListView.DragColumn
        // {...dragProps}
        nodeSelector="th"
        handleSelector=".dragHandler"
        ignoreSelector="react-resizable-handle"
        onDragEnd={(fromIndex, toIndex) => {
          if (props?.expandable) {
            fromIndex -= 1;
            toIndex -= 1;
          }

          const newColumns = [...(props?.columns ?? [])];
          newColumns.splice(toIndex, 0, newColumns.splice(fromIndex, 1)[0]);

          props?.onColumnOrderChange?.(newColumns);
        }}
      >
        <RowDragTable
          {...props}
          columns={columns}
          pagination={false}
          // bordered
          // components={{
          //   header: {
          //     cell: ResizableTitle,
          //   },
          // }}
          // columns={columns}
          // dataSource={data}
        />
      </ReactDragListView.DragColumn>
      <div className="footer">
        <Button
          onClick={props?.onClickAdd}
          className="add-btn"
          icon={<PlusCircleOutlined />}
        />
      </div>
      {/* {dezfaultColumns.map((col, index) => (
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
      /> */}
      {/* <RowDragTable /> */}
    </>
  );
};

export default TableView;
