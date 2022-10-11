import { useEffect } from "react";
import { connect } from "react-redux";
import { setField } from "../../redux/field-reducers";
import {
  changeDirection,
  createBonus,
  growing,
  move,
  pause,
  restart,
  startTimer,
  toggleLoosing,
} from "../../redux/snake-reducers";
import { Cell } from "../cell/Cell";

export const Field = (props) => {
  const fieldGrid = {
    display: "grid",
    width: `${props.width * 20}px`,
    gridTemplateColumns: `repeat(${props.width}, 20px)`,
    position: "relative",
  };

  useEffect(() => {
    const { coordinateX, coordinateY } = props.snake[0];
    if (
      coordinateX < 1 ||
      coordinateX > props.width ||
      coordinateY < 1 ||
      coordinateY > props.height ||
      props.snake
        .filter((cell, index) => index !== 0)
        .some(
          (cell) =>
            cell.coordinateX === coordinateX && cell.coordinateY === coordinateY
        )
    ) {
      props.toggleLoosing(true);
    }
  }, [props.snake]);

  useEffect(() => {
    const setIntervalTimerId = setInterval(props.startTimer, 100);
    if (props.isLoose || props.isPause) {
      clearInterval(setIntervalTimerId);
    }
    return () => clearInterval(setIntervalTimerId);
  }, [props.isLoose, props.isPause]);

  useEffect(() => {
    const setIntervalId = setInterval(props.move, 200);
    if (props.isLoose || props.isPause) {
      clearInterval(setIntervalId);
    }
    return () => clearInterval(setIntervalId);
  }, [props.isLoose, props.isPause]);

  useEffect(() => {
    props.createBonus();
  }, []);

  useEffect(() => {
    const pressKey = (evt) => {
      switch (evt.code) {
        case "ArrowUp":
          props.changeDirection(-1);
          break;
        case "ArrowRight":
          props.changeDirection(2);
          break;
        case "ArrowDown":
          props.changeDirection(1);
          break;
        case "ArrowLeft":
          props.changeDirection(-2);
          break;
        case "KeyP":
          props.pause(!props.isPause);
          break;
        case "KeyR":
          props.restart();
          props.createBonus();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", pressKey);
    return () => document.removeEventListener("keydown", pressKey);
  });
  return (
    <>
      <div className="field-container">
        <div className="field" style={fieldGrid}>
          {props.field.map((cell) => {
            const isSnake = props.snake.some(
              (cellSnake) =>
                cellSnake.coordinateX === cell.coordinateX &&
                cellSnake.coordinateY === cell.coordinateY
            );
            let isBonus = false;
            if (
              props.bonus !== null &&
              cell.coordinateX === props.bonus.coordinateX &&
              cell.coordinateY === props.bonus.coordinateY
            ) {
              isBonus = true;
            }
            return <Cell key={cell.id} isSnake={isSnake} isBonus={isBonus} />;
          })}
          {props.isLoose && (
            <div className="loose-baner">
              <div>You loose</div>
              <button
                className="button restart-button"
                onClick={() => {
                  props.restart();
                  props.createBonus();
                }}
              >
                Restart
              </button>
            </div>
          )}
        </div>
        <div className="field-panel">
          <div className="score">Score: {props.score}</div>
          <div className="timer">
            {new Intl.NumberFormat({ minimumIntegerDigits: 4 }).format(
              props.timer.minutes
            )}
            :
            {new Intl.NumberFormat("en-IN", { minimumIntegerDigits: 2 }).format(
              props.timer.seconds
            )}
            :
            {new Intl.NumberFormat("en-IN", { minimumIntegerDigits: 1 }).format(
              props.timer.milliseconds
            )}
          </div>
          {props.isPause ? (
            <button
              className="button stop-button"
              onClick={() => props.pause(false)}
            >
              Continue
            </button>
          ) : (
            <button
              className="button stop-button"
              onClick={() => props.pause(true)}
            >
              Pause
            </button>
          )}
          <dl className="info-list">
            <div className="info-term">
              <dt className="">P</dt>
              <dd className="info-definition">- pause</dd>
            </div>
            <div className="info-term">
              <dt>R</dt>
              <dd className="info-definition">- restart</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    width: state.field.fieldWidth,
    height: state.field.fieldHeight,
    field: state.field.field,
    bonus: state.snake.bonus,
    snake: state.snake.snake,
    isLoose: state.snake.isLoose,
    isPause: state.snake.isPause,
    score: state.snake.score,
    timer: state.snake.timer,
  };
};

export default connect(mapStateToProps, {
  setField,
  move,
  changeDirection,
  createBonus,
  growing,
  toggleLoosing,
  restart,
  pause,
  startTimer,
})(Field);
