import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter/Counter';
import * as CounterActions from '../components/Counter/CounterActions';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
