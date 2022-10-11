import Field from './components/field/Field';
import { connect } from "react-redux";
import StartPage from './components/startPage/StartPage';

function App(props) {
  return (<div className='container'>{props.field ? <Field /> : <StartPage />}</div>)
}

const mapStateToProps = (state) => {
  return {
    field: state.field.isShowField
  };
};

export default connect(mapStateToProps, {})(App);

