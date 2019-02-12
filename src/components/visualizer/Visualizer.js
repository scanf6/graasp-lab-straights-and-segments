import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Circle,
  Stage,
  Layer,
  Line,
  Text,
} from 'react-konva';
import { AppState } from '../../config/AppState';
import Liner from './cases/Liner';
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

  render() {
    const { showLine, showSegment, showSemiLine } = this.props;

    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );
    return (
      <div className="visualizer-container">
        { showSegment ? (
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              <Line
                points={[100, 400, 600, 200]}
                stroke={5}
                strokeWidth={10}
              />
              <Circle
                x={100}
                y={400}
                stroke={5}
                fill="#000"
                radius={10}
                strokeWidth={5}
                shadowBlur={5}
              />
              <Circle
                x={600}
                y={200}
                stroke={5}
                fill="#000"
                radius={10}
                strokeWidth={5}
                shadowBlur={5}
              />
              <Text
                x={50}
                y={350}
                text="A"
                fontSize={40}
                fill="#000"
              />
              <Text
                x={600}
                y={130}
                text="B"
                fontSize={40}
                fill="#000"
              />
              {this.renderHorizontalGrid()}
              {this.renderVerticalGrid()}
            </Layer>
          </Stage>
        )
          : ''
        }
        { showLine ? (
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              <Liner />
              {this.renderHorizontalGrid()}
              {this.renderVerticalGrid()}
            </Layer>
          </Stage>
        )
          : ''
        }
        { showSemiLine ? (
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              <Line
                points={[100, 400, 600, 200]}
                stroke={5}
                strokeWidth={10}
              />
              <Line
                points={[600, 200, 800, 120]}
                stroke={5}
                strokeWidth={10}
              />
              <Circle
                x={100}
                y={400}
                stroke={5}
                fill="#000"
                radius={10}
                strokeWidth={5}
                shadowBlur={5}
              />
              <Circle
                x={600}
                y={200}
                stroke={5}
                fill="#000"
                radius={10}
                strokeWidth={5}
                shadowBlur={5}
              />
              <Text
                x={50}
                y={350}
                text="A"
                fontSize={40}
                fill="#000"
              />
              <Text
                x={600}
                y={130}
                text="B"
                fontSize={40}
                fill="#000"
              />
              {this.renderHorizontalGrid()}
              {this.renderVerticalGrid()}
            </Layer>
          </Stage>
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
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});

const ConnectedComponent = connect(mapStateToProps)(Visualizer);

export default ConnectedComponent;
