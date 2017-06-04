import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Transcribe from '../components/Transcribe/Transcribe';
import * as TranscribeActions from '../components/Transcribe/TranscribeActions';

function mapStateToProps(state) {
  return {
    home: state.home,
    transcribe: state.transcribe
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TranscribeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transcribe);
