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
  stroke,
  fontSize,
  circleRadius,
  circleShadowBlur,
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

const SemiLine = ({
  scale,
  renderVerticalGrid,
  renderHorizontalGrid,
  strokeWidth,
  themeColor,
  t,
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
        fill={themeColor}
        radius={circleRadius}
        strokeWidth={strokeWidth}
        shadowBlur={circleShadowBlur}
      />
      <Circle
        x={CIRCLE_COMMON_X_1}
        y={CIRCLE_COMMON_Y_1}
        stroke={stroke}
        fill={themeColor}
        radius={circleRadius}
        strokeWidth={strokeWidth}
        shadowBlur={circleShadowBlur}
      />
      <Text
        x={10}
        y={15}
        text={t('Semi Line title')}
        fontSize={fontSize}
        fill={themeColor}
      />
      <Text
        x={CIRCLE_TEXT_X_0}
        y={CIRCLE_TEXT_Y_0}
        text="A"
        fontSize={fontSize}
        fill={themeColor}
      />
      <Text
        x={CIRCLE_TEXT_X_1}
        y={CIRCLE_TEXT_Y_1}
        text="B"
        fontSize={fontSize}
        fill={themeColor}
      />
    </Layer>
  </Stage>
);

SemiLine.propTypes = {
  scale: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
  renderVerticalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderHorizontalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default SemiLine;
