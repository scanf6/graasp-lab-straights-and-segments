import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  Group,
  Text,
} from 'react-konva';
import {
  stroke,
  fontSize,
  circleRadius,
  circleShadowBlur,
  circleStrokeWidth,
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
  circleCoordinates,
  circle3Coordinates,
  checkBoundaries,
  strokeWidth,
  themeColor,
  t,
}) => (
  <Group>
    {/* <Line
      points={lineCoordinates}
      stroke={stroke}
      strokeWidth={lineStrokeWidth}
    /> */}
    <Circle
      x={CIRCLE_COMMON_X_0}
      y={CIRCLE_COMMON_Y_0}
      stroke={stroke}
      fill={themeColor}
      radius={circleRadius}
      shadowBlur={circleShadowBlur}
      strokeWidth={circleStrokeWidth}
    />
    <Circle
      x={circleCoordinates[0]}
      y={circleCoordinates[1]}
      stroke={stroke}
      fill={themeColor}
      radius={circleRadius}
      shadowBlur={circleShadowBlur}
      strokeWidth={strokeWidth}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragMove={handleDragMove}
      dragBoundFunc={pos => checkBoundaries(pos)}
    />
    <Circle
      x={circle3Coordinates[0]}
      y={circle3Coordinates[1]}
      stroke={stroke}
      fill={themeColor}
      radius={circleRadius}
      shadowBlur={circleShadowBlur}
      strokeWidth={strokeWidth}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragMove={handleDragMove}
      dragBoundFunc={pos => checkBoundaries(pos)}
    />
    <Text
      x={CIRCLE_TEXT_X_0}
      y={CIRCLE_TEXT_Y_0}
      text="A"
      fontSize={fontSize}
      fill={themeColor}
    />
    <Text
      x={10}
      y={15}
      text={t('Segment title')}
      fontSize={fontSize}
      fill={themeColor}
    />
    <Text
      x={circleCoordinates[0] + 30}
      y={circleCoordinates[1]}
      text="B"
      fontSize={fontSize}
      fill={themeColor}
    />
    <Text
      x={circle3Coordinates[0] + 30}
      y={circle3Coordinates[1]}
      text="C"
      fontSize={fontSize}
      fill={themeColor}
    />
  </Group>
);

Segment.propTypes = {
  t: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  handleDragMove: PropTypes.func.isRequired,
  checkBoundaries: PropTypes.func.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  circleCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  circle3Coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Segment;
