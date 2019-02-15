import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Line, Stage, Layer } from 'react-konva';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { AppState } from '../../config/AppState';
import Liner from './cases/Liner';
import Segment from './cases/Segment';
import SemiLine from './cases/SemiLine';
import DrawLine from './practices/DrawLine';
import DrawSegment from './practices/DrawSegment';
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

  handleClick = (e, shape) => {
    const {
      isDrawing,
      isDrawingMode,
      shapes,
      segmentShapes,
    } = this.state;
    if (!isDrawingMode) return;
    // if we are drawing a shape, a click finishes the drawing
    if (isDrawing) {
      this.setState({ isDrawing: !isDrawing });
      return;
    }

    // otherwise, add a new rectangle at the mouse position with 0 width and height,
    // and set isDrawing to true
    let newShapes = shape === 'line' ? shapes : segmentShapes;
    newShapes = newShapes.slice();
    newShapes.push({
      x: e.evt.layerX,
      y: e.evt.layerY,
      width: e.evt.layerX,
      height: e.evt.layerY,
    });

    this.setState({ isDrawing: true });
    if (shape === 'line') this.setState({ shapes: newShapes });
    if (shape === 'segment') this.setState({ segmentShapes: newShapes });
  };

  handleMouseMove = (e, shape) => {
    const {
      isDrawing,
      isDrawingMode,
      shapes,
      segmentShapes,
    } = this.state;
    if (!isDrawingMode) return;

    // update the current line's width and height based on the mouse position
    if (isDrawing) {
      const newShapes = shape === 'line' ? shapes : segmentShapes;
      // get the current shape (the last shape in this.state.shapes)
      const currShapeIndex = newShapes.length - 1;
      const currShape = newShapes[currShapeIndex];

      const newShapesList = newShapes.slice();
      newShapesList[currShapeIndex] = {
        x: currShape.x, // keep starting position the same
        y: currShape.y,
        width: e.evt.layerX, // new width and height
        height: e.evt.layerY,
      };
      if (shape === 'line') this.setState({ shapes: newShapesList });
      if (shape === 'segment') this.setState({ segmentShapes: newShapesList });
    }
  };

  handleDrawingMode = () => {
    // toggle drawing mode
    const { isDrawingMode } = this.state;
    this.setState({ isDrawingMode: !isDrawingMode });
  };

  render() {
    const {
      showLine,
      showSegment,
      showSemiLine,
      themeColor,
      t,
    } = this.props;
    const {
      isMouseInside,
      lineCoordinates,
      circleCoordinates,
      shapes,
      segmentShapes,
      isDrawingMode,
    } = this.state;
    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );
    return (
      <div className="visualizer-container">
        { showSegment ? (
          <div>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isDrawingMode}
                  onChange={this.handleDrawingMode}
                  value="checkDrawer"
                  style={{ color: themeColor }}
                />
              )}
              label="Drawing Mode"
            />
            <Stage
              width={window.innerWidth}
              height={window.innerHeight}
              onContentClick={e => this.handleClick(e, 'segment')}
              onContentMouseMove={e => this.handleMouseMove(e, 'segment')}
              scalex={scale}
              scaley={scale}
            >
              <Layer>
                {this.renderHorizontalGrid()}
                {this.renderVerticalGrid()}
                <Segment
                  handleDragMove={this.handleDragMove}
                  handleMouseLeave={this.handleMouseLeave}
                  handleMouseEnter={this.handleMouseEnter}
                  lineCoordinates={lineCoordinates}
                  circleCoordinates={circleCoordinates}
                  checkBoundaries={this.checkBoundaries}
                  scale={scale}
                  strokeWidth={isMouseInside ? 10 : 5}
                  themeColor={themeColor}
                  t={t}
                />
                {segmentShapes.map(shape => (
                  <DrawSegment
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    isDrawingMode={isDrawingMode}
                    t={t}
                    themeColor={themeColor}
                    circleCoordinates={circleCoordinates}
                  />
                ))
                }
              </Layer>
            </Stage>
          </div>
        )
          : ''
        }
        { showLine ? (
          <div>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={isDrawingMode}
                  onChange={this.handleDrawingMode}
                  value="checkDrawer"
                  style={{ color: themeColor }}
                />
              )}
              label="Drawing Mode"
            />
            <Stage
              width={window.innerWidth}
              height={window.innerHeight}
              onContentClick={e => this.handleClick(e, 'line')}
              onContentMouseMove={e => this.handleMouseMove(e, 'line')}
              scalex={scale}
              scaley={scale}
            >
              <Layer>
                {this.renderHorizontalGrid()}
                {this.renderVerticalGrid()}
                <Liner
                  scale={scale}
                  themeColor={themeColor}
                  t={t}
                />
                {shapes.map(shape => (
                  <DrawLine
                    key={shape.id}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    isDrawingMode={isDrawingMode}
                    scale={scale}
                    t={t}
                    themeColor={themeColor}
                  />
                ))
                }
              </Layer>
            </Stage>
          </div>
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
