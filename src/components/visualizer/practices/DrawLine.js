import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group, Text } from 'react-konva';
import { fontSize, lineStrokeWidth, stroke } from '../../../config/properties';

const DrawLine = ({
  x,
  y,
  height,
  width,
  themeColor,
}) => (
  <Group>
    <Line points={[x, y, width, height]} stroke={stroke} strokeWidth={lineStrokeWidth} />
    <Text
      x={width}
      y={height}
      text="(D)"
      fontSize={fontSize}
      fill={themeColor}
    />
  </Group>
);

DrawLine.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
};

export default DrawLine;
