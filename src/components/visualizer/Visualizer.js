import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AppState } from '../../config/AppState';
import Line from './cases/Line';
import Segment from './cases/Segment';
import SemiLine from './cases/SemiLine';
import './Visualizer.css';

// importing all different child components and
// pass them params they need
export class Visualizer extends Component {
  state = AppState;

  render() {
    const { showLine, showSegment, showSemiLine } = this.props;
    return (
      <div className="visualizer-container">
        { showLine ? <Line /> : ''}
        { showSegment ? <Segment /> : ''}
        { showSemiLine ? <SemiLine /> : '' }
      </div>
    );
  }
}

Visualizer.propTypes = {
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});

const ConnectedComponent = connect(mapStateToProps)(Visualizer);

export default ConnectedComponent;
