import React from 'react';
import PropTypes from 'prop-types';
import {
  Line,
  Layer,
  Stage,
  Text,
} from 'react-konva';
import {
  fontSize,
  stroke,
  lineStrokeWidth,
} from '../../../config/properties';

const Liner = ({
  scale,
  renderVerticalGrid,
  renderHorizontalGrid,
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
        points={[100, 400, 700, 50]}
        stroke={stroke}
        strokeWidth={lineStrokeWidth}
      />
      <Text
        x={10}
        y={15}
        text={t('Line title')}
        fontSize={fontSize}
        fill={themeColor}
      />
    </Layer>
  </Stage>
);

Liner.propTypes = {
  scale: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  renderVerticalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  renderHorizontalGrid: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Liner;
