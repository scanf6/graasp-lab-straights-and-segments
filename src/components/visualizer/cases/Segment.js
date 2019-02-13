import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  Stage,
  Layer,
  Line,
  Text,
} from 'react-konva';
import {
  fill,
  stroke,
  fontSize,
  circleRadius,
  circleShadowBlur,
  circleStrokeWidth,
  lineStrokeWidth,
} from '../../../config/properties';
import {
  CIRCLE_COMMON_X_0,
  CIRCLE_COMMON_Y_0,
  CIRCLE_TEXT_X_0,
  CIRCLE_TEXT_Y_0,
} from '../../../config/coordinates';

const Segment = ({
  handleDragMove,
  handleMouseEnter,
  handleMouseLeave,
  renderHorizontalGrid,
  renderVerticalGrid,
  scale,
  strokeWidth,
  lineCoordinates,
  circleCoordinates,
  checkBoundaries,
}) => (
  <Stage
    width={window.innerWidth}
    height={window.innerHeight}
    scaleX={scale}
    scaleY={scale}
  >
    <Layer>
      {renderHorizontalGrid}
      {renderVerticalGrid}
      <Line
        points={lineCoordinates}
        stroke={stroke}
        strokeWidth={lineStrokeWidth}
      />
      <Circle
        x={CIRCLE_COMMON_X_0}
        y={CIRCLE_COMMON_Y_0}
        stroke={stroke}
        fill={fill}
        radius={circleRadius}
        shadowBlur={circleShadowBlur}
        strokeWidth={circleStrokeWidth}
      />
      <Circle
        x={circleCoordinates[0]}
        y={circleCoordinates[1]}
        stroke={stroke}
        fill={fill}
        radius={circleRadius}
        shadowBlur={circleShadowBlur}
        strokeWidth={strokeWidth}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onDragMove={handleDragMove}
        draggable
        dragBoundFunc={pos => checkBoundaries(pos)}
      />
      <Text
        x={CIRCLE_TEXT_X_0}
        y={CIRCLE_TEXT_Y_0}
        text="A"
        fontSize={fontSize}
        fill={fill}
      />
      <Text
        x={circleCoordinates[0] + 30}
        y={circleCoordinates[1]}
        text="B"
        fontSize={fontSize}
        fill={fill}
      />
    </Layer>
  </Stage>
);

Segment.propTypes = {
  scale: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  handleDragMove: PropTypes.func.isRequired,
  checkBoundaries: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  renderVerticalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderHorizontalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lineCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  circleCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default Segment;
