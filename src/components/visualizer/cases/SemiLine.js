import React from 'react';
import { Circle, Layer, Line } from 'react-konva';

const SemiLine = () => (
  <Layer>
    <Line
      points={[100, 300, 900, 150]}
      stroke={5}
      strokeWidth={10}
    />
    <Circle
      x={100}
      y={300}
    />
  </Layer>
);

export default SemiLine;
