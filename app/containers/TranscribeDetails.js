import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Details from '../components/Transcribe/Details';
import * as TranscribeActions from '../components/Transcribe/TranscribeActions';
import * as UserFormActions from '../components/Transcribe/UserFormActions';

function mapStateToProps(state) {
  return {
    home: state.home,
    transcribe: state.transcribe,
    userForm: state.userForm
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...TranscribeActions, ...UserFormActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
