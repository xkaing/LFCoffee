import React, { useContext } from "react";
import { Space, Table, Tag } from "antd";
import { CoffeeDataContext } from "../contexts/CoffeeDataContext";
import NameTag from "../components/NameTag";
import CupsTag from "../components/CupsTag";
import Decimal from "decimal.js";

const columns = [
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "星期",
    dataIndex: "week",
    key: "week",
  },
  {
    title: "买单",
    dataIndex: "payer_name",
    key: "payer_name",
    filters: [
      {
        text: "姜振",
        value: "姜振",
      },
      {
        text: "刘磊",
        value: "刘磊",
      },
      {
        text: "李泽晋",
        value: "李泽晋",
      },
      {
        text: "汪潇翔",
        value: "汪潇翔",
      },
      {
        text: "周洋",
        value: "周洋",
      },
      {
        text: "曹海洋",
        value: "曹海洋",
      },
      {
        text: "汪潇凯",
        value: "汪潇凯",
      },
    ],
    onFilter: (value, record) => record.payer_name.indexOf(value) === 0,
    render: (payer_name) => <NameTag payer={payer_name} />,
  },
  {
    title: "总费用",
    dataIndex: "income",
    key: "income",
    sorter: (a, b) => a.income - b.income,
  },
  {
    title: "咖啡费用",
    dataIndex: "expend",
    key: "expend",
    sorter: (a, b) => a.expend - b.expend,
  },
  {
    title: "小费",
    dataIndex: "profix",
    sorter: (a, b) => a.profix - b.profix,
    key: "profix",
    render: (profix) => {
      if (profix > 0) {
        return <p style={{ color: "green" }}>+{profix}</p>;
      } else if (profix < 0) {
        return <p style={{ color: "red" }}>{profix}</p>;
      } else {
        return <p>{profix}</p>;
      }
    },
  },
  {
    title: "杯数",
    dataIndex: "drinker_list",
    key: "drinker_list",
    // render: (drinker_list) => <p>{drinker_list.length}</p>,
    render: (drinker_list) => <CupsTag count={drinker_list.length} />,
    width: "150px",
  },
];
// const onChange = (pagination, filters, sorter, extra) => {
//   console.log("params", pagination, filters, sorter, extra);
// };
const OrderTable = () => {
  const contextData = useContext(CoffeeDataContext);
  const coffeeData = contextData ? contextData.sourceDataArr : [];
  const data = coffeeData.map((item, index) => {
    return {
      ...item,
      key: index + 1,
      profix: Decimal.sub(item.income, item.expend).toNumber(),
    };
  });
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      // onChange={onChange}
    />
  );
};

export default OrderTable;
