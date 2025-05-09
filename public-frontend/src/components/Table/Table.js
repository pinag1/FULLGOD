import { useMemo } from "react";
import useMobile from "../../hooks/useMobile";
import styles from "../../styles/global.module.css"; // Import the CSS module

const Table = ({ columns, data, customRender, currentGameRef }) => {
  const isMobile = useMobile();

  const updatedColumns = useMemo(() => {
    const days = ["day1", "day2", "day3", "day4", "day5"];
    const isLeaderboardTable = columns.length === 4;

    return columns
      .map((col) => {
        if (col.key === "slot" && isMobile && !isLeaderboardTable) {
          return { ...col, label: "Slot" };
        }
        return col;
      })
      .filter((col) => {
        const removeBonusValue = col.key === "bonusValue" && isMobile;
        const removeProvider = col.key === "provider" && isMobile;
        const removeDayColumn = isMobile && days.includes(col.key);

        return !(removeProvider || removeBonusValue || removeDayColumn);
      });
  }, [columns, isMobile]);

  const isPlayerTable = updatedColumns.length === 9;
  const isSlotTable = updatedColumns.length === 6;
  const isLeaderboardTable = updatedColumns.length === 4;

  const isCurrentGame = (row) => row.slot?.isCurrentGame || row.isCurrentGame;

  const tableClass = isPlayerTable
    ? styles.playerTable
    : isSlotTable
    ? styles.slotTable
    : isLeaderboardTable
    ? styles.leaderboardTable
    : "";

  return (
    <div className={styles.tableContainer}>
      <div className={`${styles.rowHeader} ${tableClass}`}>
        {updatedColumns.map((column) => (
          <div key={column.key} className={column.className || ""}>
            {column.label}
          </div>
        ))}
      </div>
      <div className={styles.bonusHuntWrapper}>
        {data.map((row, rowIndex) => {
          const isHighlighted = isCurrentGame?.(row);
          return (
            <div
              key={rowIndex}
              ref={isHighlighted ? currentGameRef : null}
              className={`${styles.row1} ${tableClass} ${isHighlighted ? styles.highlightRow : ""}`}
            >
              {updatedColumns.map((column) => {
                const value = row[column.key];
                const customRenderFn = customRender?.[column.key];
                const renderFn = column.render || customRenderFn;
                const content = renderFn
                  ? renderFn(value, row, isMobile)
                  : value;

                return (
                  <div key={column.key} className={column.className || ""}>
                    {content}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
