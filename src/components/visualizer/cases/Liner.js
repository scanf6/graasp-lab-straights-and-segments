import React from 'react';
import PropTypes from 'prop-types';
import { Line, Group, Text } from 'react-konva';
import {
  fontSize,
  stroke,
  lineStrokeWidth,
} from '../../../config/properties';

const Liner = ({ themeColor }) => (
  <Group>
    <Line
      points={[0, 400, 1500, 50]}
      stroke={stroke}
      strokeWidth={lineStrokeWidth}
    />
    <Text
      x={1300}
      y={40}
      text="(D)"
      fontSize={fontSize}
      fill={themeColor}
    />
  </Group>
);

Liner.propTypes = { themeColor: PropTypes.string.isRequired };

export default Liner;
