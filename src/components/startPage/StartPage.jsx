import { connect } from "react-redux";
import { setField, toggleShowField } from "../../redux/field-reducers";

export const StartPage = (props) => {
  return (
    <div className="start-page">
      <button className="button button-start"
        onClick={() => {
          props.setField();
          props.toggleShowField();
        }}
      >
        Start
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isShowField: state.field.isShowField };
};

export default connect(mapStateToProps, { toggleShowField, setField })(
  StartPage
);
