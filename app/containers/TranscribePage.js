import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transcribe from '../components/Transcribe/Transcribe';
import * as TranscribeActions from '../components/Transcribe/TranscribeActions';
import * as UserFormActions from '../components/Transcribe/UserFormActions';
import * as HomeActions from '../components/Home/HomeActions';

function mapStateToProps(state) {
  return {
    home: state.home,
    transcribe: state.transcribe,
    userForm: state.userForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TranscribeActions, ...UserFormActions, ...HomeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transcribe);
