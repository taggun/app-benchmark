import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home/Home';
import * as HomeActions from '../components/Home/HomeActions';

function mapStateToProps(state) {
  return {
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
