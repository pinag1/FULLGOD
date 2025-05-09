import { useEffect, useRef } from "react";
import PlayIcon from "../../icons/PlayIcon";
import styles from '../../styles/global.module.css'; // Import the CSS module
import Table from "../Table/Table";
import MissingImage from "./../../images/missing-slot-image.jpg";

const KingOfTheHillGamesTable = ({ data }) => {
  const { games, nowAndNext } = data;
  const currentGameRef = useRef(null);

  useEffect(() => {
    if (nowAndNext?.now && currentGameRef.current) {
      currentGameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [nowAndNext?.now]);

  const isNowPlaying = (game) =>
    nowAndNext?.now?.slot?.name === game.slot?.name &&
    nowAndNext?.now?.player === game.player;

  const columns = [
    { key: "number", label: "#", className: styles.tableCellId },
    { key: "player", label: "PLAYER", className: styles.tableCellProvider },
    { key: "slot", label: "SLOT", className: styles.tableCellSlot },
    {
      key: "bonusValue",
      label: "BONUS VALUE",
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
    slot: (slot) => {
      if (!slot || typeof slot !== "object") return <span>Desconhecido</span>;

      const isCurrentGame = nowAndNext?.now.slot?.name === slot?.name;

      return (
        <div
          className={`${styles.slotContainer} ${isCurrentGame ? styles.highlightRow : ""}`}
        >
          <div
            className={`${styles.imageWrapper} ${isCurrentGame ? styles.currentGameBorder : ""}`}
          >
            <img
              src={slot.image || MissingImage}
              alt={slot.name || "Slot"}
              className={styles.slotImageTable}
            />
            {isCurrentGame && <PlayIcon />}
          </div>
          <span className={`${styles.slotName} ${slot.isSuper ? styles.superBorder : ""}`}>
            {slot.name ? slot.name.split("|")[0] : "Nome Indisponível"}
          </span>
        </div>
      );
    },
    win: (value) => <span className={value ? styles.winBold : ""}>{value}</span>,
  };

  const tableData = games.map((game, index) => ({
    number: index + 1,
    player: game.player,
    slot: game.slot,
    bonusValue: game.bonusValue,
    multi: game.multi ? `X${Math.round(game.multi)}` : "-",
    win: game.win ? `${parseFloat(game.win).toFixed(2)}€` : "-",
    isCurrentGame: isNowPlaying(game),
  }));

  return (
    <Table
      columns={columns}
      data={tableData}
      customRender={customRender}
      currentGameRef={currentGameRef}
    />
  );
};

export default KingOfTheHillGamesTable;
