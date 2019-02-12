import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Explanation from './Explanation';
import Resume from './Resume';
import {
  toggleLine,
  toggleSemiLine,
  toggleSegment,
} from '../actions';
import './Description.css';


export class Description extends Component {
  handleToggleLine = () => {
    const showLine = true;
    const showSegment = false;
    const showSemiLine = false;
    const { dispatchToggleLine } = this.props;
    dispatchToggleLine(showLine, showSegment, showSemiLine);
  };

  handleToggleSemiLine = () => {
    const showLine = false;
    const showSegment = false;
    const showSemiLine = true;
    const { dispatchToggleSemiLine } = this.props;
    dispatchToggleSemiLine(showLine, showSegment, showSemiLine);
  };

  handleToggleSegment = () => {
    const showLine = false;
    const showSegment = true;
    const showSemiLine = false;
    const { dispatchToggleSegment } = this.props;
    dispatchToggleSegment(showLine, showSegment, showSemiLine);
  };

  render() {
    const { t } = this.props;
    return (
      <div className="description-container">
        <Resume
          t={t}
          handleToggleLine={this.handleToggleLine}
          handleToggleSemiLine={this.handleToggleSemiLine}
          handleToggleSegment={this.handleToggleSegment}
        />
        <Explanation />
      </div>
    );
  }
}

Description.propTypes = {
  t: PropTypes.func.isRequired,
  dispatchToggleLine: PropTypes.func.isRequired,
  dispatchToggleSemiLine: PropTypes.func.isRequired,
  dispatchToggleSegment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
});

const mapDispatchToProps = {
  dispatchToggleLine: toggleLine,
  dispatchToggleSemiLine: toggleSemiLine,
  dispatchToggleSegment: toggleSegment,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Description);

export default withTranslation()(ConnectedComponent);
