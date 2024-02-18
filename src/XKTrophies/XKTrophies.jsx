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
    },
    {
      title: "Buy Date",
      dataIndex: "buy_date",
      key: "buy_date",
      render: (buy_date) => <YearColorTag date={buy_date} />,
    },
    {
      title: "Name",
      dataIndex: "game_name",
      key: "game_name",
    },
    {
      title: "Source",
      dataIndex: "buy_source",
      key: "buy_source",
      render: (buy_source) => <SourceColorTag channel={buy_source} />,
    },
    {
      title: "Price(¥)",
      key: "buy_price",
      dataIndex: "buy_price",
    },
    {
      title: "Platinum Date",
      key: "play_platinum_date",
      dataIndex: "play_platinum_date",
      render: (play_platinum_date) => (
        <YearColorTag date={play_platinum_date} />
      ),
    },
    {
      title: "Trophy",
      key: "game_trophy",
      dataIndex: "game_trophy",
      render: (game_trophy) => <TrophyProgress progress={game_trophy} />,
    },
    {
      title: "Developer",
      key: "game_developer",
      dataIndex: "game_developer",
    },
    {
      title: "Publisher",
      key: "game_publisher",
      dataIndex: "game_publisher",
    },
    {
      title: "Release Date",
      key: "game_release_date",
      dataIndex: "game_release_date",
      render: (game_release_date) => <YearColorTag date={game_release_date} />,
    },
    {
      title: "time(h)",
      key: "play_time",
      dataIndex: "play_time",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={reactArrData}
      size="small"
      pagination={{
        pageSize: 60,
      }}
      footer={() => (
        <Text strong>
          PSN为58款，Call of Duty: Modern Warfare 3为DLC，Final Fantasy VII
          Rebirth还未发售
        </Text>
      )}
      // scroll={{
      //   y: 600,
      // }}
    />
  );
};

export default XKTrophies;
