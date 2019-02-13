import React from 'react';
import PropTypes from 'prop-types';
import { Line, Layer, Stage } from 'react-konva';
import {
  stroke,
  lineStrokeWidth,
} from '../../../config/properties';

const Liner = ({ scale, renderVerticalGrid, renderHorizontalGrid }) => (
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
        points={[100, 400, 700, 50]}
        stroke={stroke}
        strokeWidth={lineStrokeWidth}
      />
    </Layer>
  </Stage>
);

Liner.propTypes = {
  scale: PropTypes.number.isRequired,
  renderVerticalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderHorizontalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Liner;
