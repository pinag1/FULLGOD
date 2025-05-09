import { useEffect, useRef } from "react";
import Table from "../../components/Table/Table";
import PlayIcon from "../../icons/PlayIcon";
import styles from "../../styles/global.module.css"; // ✅ Use CSS module
import MissingImage from "./../../images/missing-slot-image.jpg";

const AllGamesTable = ({ data, index }) => {
  const games = data.games || [];
  const nowPlaying = data.nowPlaying || {};
  const currentGame = nowPlaying?.currentGame?.name;
  const currentGameRef = useRef(null);

  useEffect(() => {
    if (currentGameRef.current) {
      currentGameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentGame]);

  const columns = [
    { key: "index", label: "#", className: styles.tableCellId },
    {
      key: "slot",
      label: "SLOT",
      className: styles.tableCellSlot,
      render: (value, row) => (
        <div
          className={`${styles.slotContainer} ${
            row.slot?.isCurrentGame ? styles.highlightRow : ""
          }`}
        >
          <div
            className={`${styles.imageWrapper} ${
              row.slot?.isCurrentGame ? styles.currentGameBorder : ""
            }`}
          >
            <img
              src={value.image || MissingImage}
              alt="Slot"
              className={styles.slotImageTable}
            />
            {row.slot?.isCurrentGame && <PlayIcon />}
          </div>
          <span
            className={`${styles.slotName} ${
              value.isSuper ? styles.superBorder : ""
            }`}
          >
            {value.slotName}
          </span>
        </div>
      ),
    },
    {
      key: "provider",
      label: "PROVIDER",
      className: styles.tableCellProvider,
    },
    {
      key: "bet",
      label: "BET",
      className: styles.tableCellBet,
    },
    {
      key: "multi",
      label: "MULTI",
      className: styles.tableCellMulti,
    },
    {
      key: "win",
      label: "WIN",
      className: styles.tableCellWin,
      render: (value) => (
        <span className={value ? styles.winBold : ""}>{value}</span>
      ),
    },
  ];

  const customRender = {
    win: (value) => <span className={value ? styles.winBold : ""}>{value}</span>,
  };

  const tableData = games.map((game, i) => {
    const slotName = game.slot?.name ? game.slot.name.split("|")[0] : "-";
    const isCurrentGame = currentGame === game.slot?.name;

    return {
      index: index + i,
      slot: {
        slotName: slotName,
        image: game.slot?.image || MissingImage,
        isSuper: game.super,
        isCurrentGame: isCurrentGame,
      },
      provider: game.slot?.provider?.name || "-",
      bet: game.bet ? `${game.bet}€` : "-",
      multi: game.multi ? `X${Math.round(game.multi)}` : "-",
      win: game.win ? `${parseFloat(game.win).toFixed(2)}€` : "-",
    };
  });

  return (
    <Table
      columns={columns}
      data={tableData}
      customRender={customRender}
      currentGameRef={currentGameRef}
    />
  );
};

export default AllGamesTable;
