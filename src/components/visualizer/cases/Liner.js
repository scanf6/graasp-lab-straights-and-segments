import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Group, Text, Circle } from 'react-konva';
import {
  stroke,
  fontSize,
  circleRadius,
  circleShadowBlur,
} from '../../../config/properties';
import {
  CIRCLE_TEXT_X_0,
  CIRCLE_TEXT_Y_0,
} from '../../../config/coordinates';

const Liner = ({
  circle0Coordinates,
  circleCoordinates,
  circle3Coordinates,
  themeColor,
}) => {
  const [strokeCircle1, setStrokeCircle1] = useState(null);
  const [strokeCircle2, setStrokeCircle2] = useState(null);
  const [strokeCircle3, setStrokeCircle3] = useState(null);

  return (
    <Group>
      <Circle
        x={circle0Coordinates[0]}
        y={circle0Coordinates[1]}
        stroke={strokeCircle1}
        fill={themeColor}
        radius={circleRadius}
        shadowBlur={circleShadowBlur}
        onMouseEnter={() => setStrokeCircle1(stroke)}
        onMouseLeave={() => setStrokeCircle1(null)}
        // strokeWidth={circleStrokeWidth}
      />
      <Circle
        x={circleCoordinates[0]}
        y={circleCoordinates[1]}
        stroke={strokeCircle2}
        fill={themeColor}
        radius={circleRadius}
        shadowBlur={circleShadowBlur}
        onMouseEnter={() => setStrokeCircle2(stroke)}
        onMouseLeave={() => setStrokeCircle2(null)}
        // strokeWidth={strokeWidth}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onDragMove={handleDragMove}
        // draggable
        // dragBoundFunc={pos => checkBoundaries(pos)}
      />
      <Circle
        x={circle3Coordinates[0]}
        y={circle3Coordinates[1]}
        stroke={strokeCircle3}
        fill={themeColor}
        radius={circleRadius}
        shadowBlur={circleShadowBlur}
        onMouseEnter={() => setStrokeCircle3(stroke)}
        onMouseLeave={() => setStrokeCircle3(null)}
        // strokeWidth={circleStrokeWidth}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onDragMove={handleDragMove}
        // draggable
        // dragBoundFunc={pos => checkBoundaries(pos)}
      />
      <Text
        x={CIRCLE_TEXT_X_0}
        y={CIRCLE_TEXT_Y_0}
        text="A"
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
};

Liner.propTypes = {
  themeColor: PropTypes.string.isRequired,
  circle0Coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  circleCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  circle3Coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Liner;
