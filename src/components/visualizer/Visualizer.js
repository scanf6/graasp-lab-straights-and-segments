import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Line } from 'react-konva';
import { AppState } from '../../config/AppState';
import Liner from './cases/Liner';
import Segment from './cases/Segment';
import SemiLine from './cases/SemiLine';
import './Visualizer.css';
import {
  BLOCK_SNAP_SIZE,
  CANVAS_VIRTUAL_WIDTH,
  CANVAS_VIRTUAL_HEIGHT,
} from '../../config/constants';

export class Visualizer extends Component {
  state = AppState;

  renderVerticalGrid = () => {
    const width = window.innerWidth;
    const height = (4 / 5) * (window.innerHeight);
    const lines = [];
    const grouped = width / BLOCK_SNAP_SIZE;
    for (let i = 0; i < grouped; i += 1) {
      lines.push(
        <Line
          key={i}
          points={
            [
              Math.round(i * BLOCK_SNAP_SIZE) + 1, 0,
              Math.round(i * BLOCK_SNAP_SIZE) + 1, height,
            ]
          }
          stroke="#CCC"
          strokeWidth={1}
        />,
      );
    }
    return lines;
  }

  renderHorizontalGrid = () => {
    const width = window.innerWidth;
    const height = (4 / 5) * (window.innerHeight);
    const lines = [];
    const grouped = height / BLOCK_SNAP_SIZE;
    for (let j = 0; j < grouped; j += 1) {
      lines.push(
        <Line
          key={j}
          points={[0, Math.round(j * BLOCK_SNAP_SIZE), width, Math.round(j * BLOCK_SNAP_SIZE)]}
          stroke="#CCC"
          strokeWidth={1}
        />,
      );
    }
    return lines;
  }

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer';
    this.setState({ isMouseInside: true });
  }

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
    this.setState({ isMouseInside: false });
  }

  handleDragMove = (event) => {
    const { lineCoordinates, circleCoordinates } = this.state;
    const newLineCoordinates = [...lineCoordinates];
    const newCircleCoordinates = [...circleCoordinates];
    this.updateLineCoordinates(newLineCoordinates, event);
    this.updateCircleCoordinates(newCircleCoordinates, event);
  };

  updateLineCoordinates = (newLineCoordinates, event) => {
    const newX = event.target.x();
    const newY = event.target.y();
    const updatedLineCoordinates = [...newLineCoordinates];
    updatedLineCoordinates[2] = newX;
    updatedLineCoordinates[3] = newY;
    if (newX > 10 && newX < 1400 && newY > 10 && newY < 650) {
      this.setState({ lineCoordinates: updatedLineCoordinates });
    }
  }

  updateCircleCoordinates = (newCircleCoordinates, event) => {
    const newX = event.target.x();
    const newY = event.target.y();
    const updatedCircleCoordinates = [...newCircleCoordinates];
    if (newX > 10 && newX < 1400 && newY > 10 && newY < 650) {
      updatedCircleCoordinates[0] = newX;
      updatedCircleCoordinates[1] = newY;
      this.setState({ circleCoordinates: updatedCircleCoordinates });
    }
  }

  checkBoundaries = ({ x, y }) => {
    let newX = x < 20 ? 20 : x;
    newX = x >= 1380 ? 1380 : newX;
    let newY = y < 20 ? 20 : y;
    newY = y >= 650 ? 650 : newY;
    return {
      x: newX,
      y: newY,
    };
  };

  render() {
    const {
      showLine,
      showSegment,
      showSemiLine,
      themeColor,
      t,
    } = this.props;
    const { isMouseInside, lineCoordinates, circleCoordinates } = this.state;
    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );
    return (
      <div className="visualizer-container">
        { showSegment ? (
          <Segment
            handleDragMove={this.handleDragMove}
            handleMouseLeave={this.handleMouseLeave}
            handleMouseEnter={this.handleMouseEnter}
            renderVerticalGrid={this.renderVerticalGrid()}
            renderHorizontalGrid={this.renderHorizontalGrid()}
            lineCoordinates={lineCoordinates}
            circleCoordinates={circleCoordinates}
            checkBoundaries={this.checkBoundaries}
            scale={scale}
            strokeWidth={isMouseInside ? 10 : 5}
            themeColor={themeColor}
            t={t}
          />
        )
          : ''
        }
        { showLine ? (
          <Liner
            renderHorizontalGrid={this.renderHorizontalGrid()}
            renderVerticalGrid={this.renderVerticalGrid()}
            scale={scale}
            themeColor={themeColor}
            t={t}
          />
        )
          : ''
        }
        { showSemiLine ? (
          <SemiLine
            renderHorizontalGrid={this.renderHorizontalGrid()}
            renderVerticalGrid={this.renderVerticalGrid()}
            scale={scale}
            strokeWidth={isMouseInside ? 10 : 5}
            themeColor={themeColor}
            t={t}
          />
        )
          : ''
        }
      </div>
    );
  }
}

Visualizer.propTypes = {
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});

const ConnectedComponent = connect(mapStateToProps)(Visualizer);

export default withTranslation()(ConnectedComponent);
