import styles from "../../styles/global.module.css"; // ✅ Import CSS module
import BreaksComponent from "./BreaksComponent";
import RoundRenderer from "./RoundRenderer";
import WinnerBox from "./WinnerBox";

const Bracket = ({ data, setSelectedSlots, selectedSlots }) => {
  const handleGameClick = (slot1, slot2, roundIndex) => {
    if (!slot1 || !slot2) {
      console.warn("Missing slot data!", { slot1, slot2 });
      return;
    }
    setSelectedSlots([
      { ...slot1, round: roundIndex },
      { ...slot2, round: roundIndex },
    ]);
  };

  return (
    <div className={styles.bracketContainer}>
      <div className={styles.brackets}>
        <div className={styles.containerasd}>
          <div className={styles.item}>BONUS BUY TOURNAMENT</div>
          <div className={styles.item}>FINAL</div>
          <div className={styles.item}>SEMI-FINAL</div>
          <div className={styles.item}>PLAY-OFF</div>
        </div>

        <div className={styles.leftBracketsContainer}>
          <div className={styles.bracket + " " + styles.left}>
            <div className={styles.playoffs + " " + styles.section}>
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[1, 2]}
                  bracketSide="left"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
              <div className={styles.breaks + " " + styles.left}>
                <BreaksComponent
                  slot1={data.rounds.round1.slot1}
                  slot2={data.rounds.round1.slot2}
                  variant="up"
                />
                <BreaksComponent
                  slot1={data.rounds.round2.slot1}
                  slot2={data.rounds.round2.slot2}
                  variant="down"
                />
              </div>
            </div>

            <div
              className={
                styles.playoffs + " " + styles.semifinal + " " + styles.withSemifinalSpacing
              }
            >
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[5]}
                  bracketSide="left"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
              <div className={styles.breaks + " " + styles.left}>
                <BreaksComponent
                  slot1={data.rounds.round5.slot1}
                  slot2={data.rounds.round5.slot2}
                  variant="semi"
                />
              </div>
            </div>

            <div className={styles.playoffs + " " + styles.finalbracket + " " + styles.section}>
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[7]}
                  bracketSide="left"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
            </div>
          </div>

          <div className={styles.bracketMid}>
            <WinnerBox
              winnerSlot={data.winner.slot}
              finalSlot1={data.rounds.round7.slot1}
              finalSlot2={data.rounds.round7.slot2}
            />
          </div>

          <div className={styles.bracket + " " + styles.right}>
            <div className={styles.playoffs + " " + styles.finalbracket + " " + styles.section}>
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[7]}
                  bracketSide="right"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
            </div>

            <div className={styles.playoffs + " " + styles.semifinal + " " + styles.section}>
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[6]}
                  bracketSide="right"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
              <div className={styles.breaks + " " + styles.right}>
                <BreaksComponent
                  slot1={data.rounds.round6.slot1}
                  slot2={data.rounds.round6.slot2}
                  variant="semi"
                />
              </div>
            </div>

            <div className={styles.playoffs + " " + styles.section}>
              <div className={styles.games}>
                <RoundRenderer
                  rounds={data.rounds}
                  roundIndexes={[3, 4]}
                  bracketSide="right"
                  selectedSlots={selectedSlots}
                  handleGameClick={handleGameClick}
                />
              </div>
              <div className={styles.breaks + " " + styles.right}>
                <BreaksComponent
                  slot1={data.rounds.round3.slot1}
                  slot2={data.rounds.round3.slot2}
                  variant="up"
                />
                <BreaksComponent
                  slot1={data.rounds.round4.slot1}
                  slot2={data.rounds.round4.slot2}
                  variant="down"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bracket;
