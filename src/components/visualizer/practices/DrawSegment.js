import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  Line,
  Group,
  Text,
} from 'react-konva';
import {
  stroke,
  fontSize,
  circleRadius,
  circleShadowBlur,
  circleStrokeWidth,
  lineStrokeWidth,
} from '../../../config/properties';

const DrawSegment = ({
  x,
  y,
  height,
  width,
  themeColor,
}) => (
  <Group>
    <Line points={[x, y, width, height]} stroke={stroke} strokeWidth={lineStrokeWidth} />
    <Text
      x={x}
      y={y}
      text="A"
      fontSize={fontSize}
      fill={themeColor}
    />
    <Text
      x={width}
      y={height}
      text="B"
      fontSize={fontSize}
      fill={themeColor}
    />
    <Circle
      x={x}
      y={y}
      stroke={stroke}
      fill={themeColor}
      radius={circleRadius}
      shadowBlur={circleShadowBlur}
      strokeWidth={circleStrokeWidth}
    />
    <Circle
      x={width}
      y={height}
      stroke={stroke}
      fill={themeColor}
      radius={circleRadius}
      shadowBlur={circleShadowBlur}
      strokeWidth={5}
    />
  </Group>
);

DrawSegment.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default DrawSegment;
