import React from 'react';
import { Line } from 'react-konva';

const Liner = () => (
  <Line
    points={[100, 500, 700, 50]}
    stroke={5}
    strokeWidth={10}
  />
);

export default Liner;
