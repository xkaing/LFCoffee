import React from "react";
import { Table, Typography } from "antd";
import { getTrophyData } from "../serve";
import { useLoaderData } from "react-router-dom";
import YearColorTag from "./YearColorTag";
import SourceColorTag from "./SourceColorTag";
import TrophyProgress from "./TrophyProgress";

const { Text, Link } = Typography;

export async function loader() {
  const sourceData = await getTrophyData();
  return { sourceData };
}

const XKTrophies = () => {
  const { sourceData } = useLoaderData();
  const dataSource = sourceData.trophies;
  const reactArrData = dataSource.map((item, index) => {
    return { ...item, key: index + 1 };
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Buy Date",
      dataIndex: "buy_date",
      key: "buy_date",
      render: (buy_date) => <YearColorTag date={buy_date} />,
      sorter: (a, b) => new Date(a.buy_date) - new Date(b.buy_date),
    },
    {
      title: "Name",
      dataIndex: "game_name",
      key: "game_name",
      ellipsis: true,
    },
    {
      title: "Source",
      dataIndex: "buy_source",
      key: "buy_source",
      render: (buy_source) => <SourceColorTag channel={buy_source} />,
      filters: [
        {
          text: "Physical Disc",
          value: "Physical Disc",
        },
        {
          text: "Game Catalogue",
          value: "Game Catalogue",
        },
        {
          text: "PS Store",
          value: "PS Store",
        }
      ],
      onFilter: (value, record) => record.buy_source.indexOf(value) === 0,
    },
    {
      title: "Price",
      key: "buy_price",
      dataIndex: "buy_price",
      width: 70,
      sorter: (a, b) => a.buy_price - b.buy_price,
    },
    {
      title: "Platinum Date",
      key: "play_platinum_date",
      dataIndex: "play_platinum_date",
      render: (play_platinum_date) => (
        <YearColorTag date={play_platinum_date} />
      ),
      sorter: (a, b) => {
        const defaultDate = new Date();
        const aTime = a.play_platinum_date === "-" ? defaultDate : new Date(a.play_platinum_date);
        const bTime = b.play_platinum_date === "-" ? defaultDate : new Date(b.play_platinum_date);
        return aTime - bTime;
      }
    },
    {
      title: "Trophy",
      key: "game_trophy",
      dataIndex: "game_trophy",
      render: (game_trophy) => <TrophyProgress progress={game_trophy} />,
      width: 70,
      sorter: (a, b) => a.game_trophy - b.game_trophy,
    },
    {
      title: "Developer",
      key: "game_developer",
      dataIndex: "game_developer",
      ellipsis: true,
    },
    {
      title: "Publisher",
      key: "game_publisher",
      dataIndex: "game_publisher",
      ellipsis: true,
    },
    {
      title: "Release Date",
      key: "game_release_date",
      dataIndex: "game_release_date",
      render: (game_release_date) => <YearColorTag date={game_release_date} />,
      sorter: (a, b) => new Date(a.game_release_date) - new Date(b.game_release_date),
    },
    {
      title: "time(h)",
      key: "play_time",
      dataIndex: "play_time",
      sorter: (a, b) => a.play_time - b.play_time,
    },
  ];

  const dlcColumns = [
    {
      title: "DLC",
      dataIndex: "key",
      width: 100
    },
    {
      title: "Name",
      dataIndex: "game_name",
      // width: 100,
      ellipsis: true,
    },
    {
      title: "Buy Date",
      dataIndex: "buy_date",
      render: (buy_date) => <YearColorTag date={buy_date} />,
      width: 100
    },
    {
      title: "Release Date",
      dataIndex: "game_release_date",
      render: (game_release_date) => <YearColorTag date={game_release_date} />,
      width: 100
    },
    {
      title: "Source",
      dataIndex: "buy_source",
      render: (buy_source) => <SourceColorTag channel={buy_source} />,
      width: 100
    },
    {
      title: "Price",
      dataIndex: "buy_price",
      width: 50
    },
    {
      title: "Trophy",
      dataIndex: "game_trophy",
      render: (game_trophy) => <TrophyProgress progress={game_trophy} />,
    },
  ]

  const dlcTable = (record) => {
    const dlcArrData = record.game_dlc.map((item, index) => {
      return { ...item, key: index + 1 };
    });
    return (<Table columns={dlcColumns} dataSource={dlcArrData} pagination={false} style={{
      marginLeft: 155,
    }} />)
  }

  return (
    <Table
      columns={columns}
      dataSource={reactArrData}
      size="small"
      pagination={{
        pageSize: 100,
      }}
      scroll={{
        // y: 55 * 15,
      }}
      expandable={{
        expandedRowRender: (record) => dlcTable(record),
        rowExpandable: (record) => record.game_dlc,
      }}
    />
  );
};

export default XKTrophies;
