import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  Layer,
  Line,
  Text,
  Stage,
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
  CIRCLE_COMMON_X_1,
  CIRCLE_COMMON_Y_0,
  CIRCLE_COMMON_Y_1,
  CIRCLE_TEXT_X_0,
  CIRCLE_TEXT_X_1,
  CIRCLE_TEXT_Y_0,
  CIRCLE_TEXT_Y_1,
  COMMON_LINE_POINTS,
} from '../../../config/coordinates';

const SemiLine = ({ scale, renderVerticalGrid, renderHorizontalGrid }) => (
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
        points={COMMON_LINE_POINTS}
        stroke={stroke}
        strokeWidth={lineStrokeWidth}
      />
      <Line
        points={[600, 200, 800, 120]}
        stroke={stroke}
        strokeWidth={lineStrokeWidth}
      />
      <Circle
        x={CIRCLE_COMMON_X_0}
        y={CIRCLE_COMMON_Y_0}
        stroke={stroke}
        fill={fill}
        radius={circleRadius}
        strokeWidth={circleStrokeWidth}
        shadowBlur={circleShadowBlur}
      />
      <Circle
        x={CIRCLE_COMMON_X_1}
        y={CIRCLE_COMMON_Y_1}
        stroke={stroke}
        fill={fill}
        radius={circleRadius}
        strokeWidth={circleStrokeWidth}
        shadowBlur={circleShadowBlur}
      />
      <Text
        x={CIRCLE_TEXT_X_0}
        y={CIRCLE_TEXT_Y_0}
        text="A"
        fontSize={fontSize}
        fill={fill}
      />
      <Text
        x={CIRCLE_TEXT_X_1}
        y={CIRCLE_TEXT_Y_1}
        text="B"
        fontSize={fontSize}
        fill={fill}
      />
    </Layer>
  </Stage>
);

SemiLine.propTypes = {
  scale: PropTypes.number.isRequired,
  renderVerticalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderHorizontalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SemiLine;
