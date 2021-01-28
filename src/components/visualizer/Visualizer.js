import './Visualizer.css';
import swal from 'sweetalert';
import { isEqual } from 'lodash';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import {
  Line, Stage, Layer, Circle, Arrow,
} from 'react-konva';
import { AppState } from '../../config/AppState';

import Liner from './cases/Liner';

import {
  BLOCK_SNAP_SIZE,
  CANVAS_VIRTUAL_WIDTH,
  CANVAS_VIRTUAL_HEIGHT,
} from '../../config/constants';

const traceCondition = (condition, then, otherwise) => (condition ? then : otherwise);
const initialState = {
  drawedLinePoints: {
    startPoint: null,
    endPoint: null,
  },
  lineDrawingFinished: true,
  drawedLineEquation: {
    a: null,
    b: null,
  },
  segmentLinePoint: null,
};

export class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.hackCircleRef = React.createRef();
    this.state = {
      ...AppState,
      ...initialState,
    };
  }

  componentDidUpdate(props) {
    // Reset the drawing area when we switch between line, semi-line and segment
    const { simulation } = this.props;
    if (!isEqual(props.simulation, simulation)) {
      this.updateSimulation();
    }
  }

  updateSimulation = () => {
    this.setState({
      drawedLinePoints: {
        startPoint: null,
        endPoint: null,
      },
      lineDrawingFinished: false,
      drawedLineEquation: {
        a: null,
        b: null,
      },
    });
  }

  renderVerticalGrid = () => {
    const width = window.innerWidth;
    const height = (4 / 5) * window.innerHeight;
    const lines = [];
    const grouped = width / BLOCK_SNAP_SIZE;
    for (let i = 0; i < grouped; i += 1) {
      lines.push(
        <Line
          key={i}
          points={[
            Math.round(i * BLOCK_SNAP_SIZE) + 1,
            0,
            Math.round(i * BLOCK_SNAP_SIZE) + 1,
            height,
          ]}
          stroke="#CCC"
          strokeWidth={1}
        />,
      );
    }
    return lines;
  };

  renderHorizontalGrid = () => {
    const width = window.innerWidth;
    const height = (4 / 5) * window.innerHeight;
    const lines = [];
    const grouped = height / BLOCK_SNAP_SIZE;
    for (let j = 0; j < grouped; j += 1) {
      lines.push(
        <Line
          key={j}
          points={[
            0,
            Math.round(j * BLOCK_SNAP_SIZE),
            width,
            Math.round(j * BLOCK_SNAP_SIZE),
          ]}
          stroke="#CCC"
          strokeWidth={1}
        />,
      );
    }
    return lines;
  };

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer';
    this.setState({ isMouseInside: true });
  };

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
    this.setState({ isMouseInside: false });
  };

  handleDragMove = (event) => {
    const { lineCoordinates, circleCoordinates } = this.state;
    const newLineCoordinates = [...lineCoordinates];
    const newCircleCoordinates = [...circleCoordinates];
    this.updateLineCoordinates(newLineCoordinates, event);
    this.updateCircleCoordinates(newCircleCoordinates, event);
  };

  updateLineCoordinates = (newLineCoordinates, event) => {
    const newX = event.target.x();
    const newY = event.target.y();
    const updatedLineCoordinates = [...newLineCoordinates];
    updatedLineCoordinates[2] = newX;
    updatedLineCoordinates[3] = newY;
    if (newX > 10 && newX < 1400 && newY > 10 && newY < 650) {
      this.setState({ lineCoordinates: updatedLineCoordinates });
    }
  };

  updateCircleCoordinates = (newCircleCoordinates, event) => {
    const newX = event.target.x();
    const newY = event.target.y();
    const updatedCircleCoordinates = [...newCircleCoordinates];
    if (newX > 10 && newX < 1400 && newY > 10 && newY < 650) {
      updatedCircleCoordinates[0] = newX;
      updatedCircleCoordinates[1] = newY;
      this.setState({ circleCoordinates: updatedCircleCoordinates });
    }
  };

  checkBoundaries = ({ x, y }) => {
    let newX = x < 20 ? 20 : x;
    newX = x >= 1380 ? 1380 : newX;
    let newY = y < 20 ? 20 : y;
    newY = y >= 650 ? 650 : newY;
    return { x: newX, y: newY };
  };

  getLineEquation = (firstPoint, secondPoint) => {
    // y = ax + b
    const a = (secondPoint[1] - firstPoint[1]) / (secondPoint[0] - firstPoint[0]);
    const b = firstPoint[1] - a * firstPoint[0];
    this.setState({ drawedLineEquation: { a, b } });
  };

  /**
   *
   * @param {Array} pointCoordinates
   * @returns {Boolean} True or False whether the point is on the line or not
   */
  isPointOnLine = (pointCoordinates) => {
    // y = ax + b
    const { drawedLineEquation } = this.state;
    if (
      Math.abs(
        pointCoordinates[1]
          - (drawedLineEquation.a * pointCoordinates[0] + drawedLineEquation.b),
      ) <= 10
    ) {
      return true;
    }
    return false;
  };

  snapToClosestPoint = (clickedPosition) => {
    const {
      circle0Coordinates,
      circleCoordinates,
      circle3Coordinates,
    } = this.state;
    if (
      Math.abs(clickedPosition[0] - circle0Coordinates[0]) <= 12
      && Math.abs(clickedPosition[1] - circle0Coordinates[1]) <= 12
    ) {
      return circle0Coordinates;
    } if (
      Math.abs(clickedPosition[0] - circleCoordinates[0]) <= 12
      && Math.abs(clickedPosition[1] - circleCoordinates[1]) <= 12
    ) {
      return circleCoordinates;
    } if (
      Math.abs(clickedPosition[0] - circle3Coordinates[0]) <= 12
      && Math.abs(clickedPosition[1] - circle3Coordinates[1]) <= 12
    ) {
      return circle3Coordinates;
    } return clickedPosition;
  };

  handleClick = (e, shape) => {
    const {
      drawedLinePoints: { startPoint, endPoint },
    } = this.state;

    if (shape === 'line') {
      const node = e.currentTarget;
      const { drawedLinePoints } = this.state;
      const { x, y } = this.relativeNodePosition(node);
      // Snap clicked point to closest present point if any
      const clickedPosition = this.snapToClosestPoint([x, y]);

      if (startPoint && endPoint) {
        this.setState({ lineDrawingFinished: true });
        // Calculate line equation here
        const newEndPoint = [
          endPoint[0] + startPoint[0],
          endPoint[1] + startPoint[1],
        ];
        this.getLineEquation(startPoint, newEndPoint);
        this.linePoint();
      } else {
        this.setState({
          lineDrawingFinished: false,
          drawedLinePoints: {
            ...drawedLinePoints,
            startPoint: clickedPosition,
            endPoint: [0, 0],
          },
        });
      }
    }
    return null;
  };

  relativeNodePosition = (node) => {
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition();
    const { x, y } = transform.point(pos);
    return { x, y };
  };

  handleMouseMove = (e) => {
    const {
      lineDrawingFinished,
      circle0Coordinates,
      circleCoordinates,
      circle3Coordinates,
      drawedLinePoints,
    } = this.state;
    const { startPoint } = drawedLinePoints;
    if (startPoint && !lineDrawingFinished) {
      const node = this.hackCircleRef.current;
      const { x, y } = this.relativeNodePosition(node);

      const nodeAbsolute = e.currentTarget;
      const { x: xAbs, y: yAbs } = this.relativeNodePosition(nodeAbsolute);
      const finishedPoint = this.snapToClosestPoint([xAbs, yAbs]);
      this.setState({
        drawedLinePoints: {
          ...drawedLinePoints,
          endPoint:
            finishedPoint === circle0Coordinates // COULD CAUSE A PROBLEME MAYBE
            || finishedPoint === circleCoordinates // COULD CAUSE A PROBLEME MAYBE
            || finishedPoint === circle3Coordinates // COULD CAUSE A PROBLEME MAYBE
              ? [
                finishedPoint[0] - startPoint[0],
                finishedPoint[1] - startPoint[1],
              ]
              : [x, y],
        },
      });
    }
  };

  checkResults = () => {
    const { simulation, t } = this.props;
    const { showLine, showSemiLine, showSegment } = simulation;
    const {
      drawedLinePoints,
      circle0Coordinates,
      circleCoordinates,
      circle3Coordinates,
    } = this.state;
    const { startPoint, endPoint } = drawedLinePoints;

    if (!startPoint || !endPoint) {
      const shouldTrace = traceCondition(showLine, 'une droite', '')
      || traceCondition(showSemiLine, 'une demi-droite', '')
      || traceCondition(showSegment, 'un segment', '');
      /* const shouldTrace = showLine ?
       'une droite' : showSemiLine ? 'une demi-droite' : showSegment ? 'un segment' : ''; */
      swal({
        title: t("Error!"),
        text: `Veuillez tracer ${shouldTrace}!`,
        icon: 'error',
        button: 'Super!',
      });
      return;
    }

    const newEndPoint = [
      endPoint[0] + startPoint[0],
      endPoint[1] + startPoint[1],
    ];

    if (showLine) {
      // Handling result check for line
      if (
        isEqual(startPoint, circle0Coordinates)
        || isEqual(startPoint, circleCoordinates)
        || isEqual(startPoint, circle3Coordinates)
      ) {
        // alert("FAUX: Ceci n'est pas une droite!");
        swal({
          title: t('Wrong!'),
          text: t("This is not a line"),
          icon: 'error',
          button: 'Ok!',
        });
        return;
      }

      if (
        isEqual(newEndPoint, circle0Coordinates)
        || isEqual(
          [endPoint[0] + startPoint[0], endPoint[1] + startPoint[1]],
          circleCoordinates,
        )
        || isEqual(
          [endPoint[0] + startPoint[0], endPoint[1] + startPoint[1]],
          circle3Coordinates,
        )
      ) {
        // alert("FAUX: Ceci n'est pas une droite!");
        swal({
          title: t('Wrong!'),
          text: t("This is not a line"),
          icon: 'error',
          button: 'Ok!',
        });
        return;
      }

      if (
        !this.isPointOnLine(circle0Coordinates)
        && !this.isPointOnLine(circleCoordinates)
        && !this.isPointOnLine(circle3Coordinates)
      ) {
        // alert("Veuillez utilisez les points prevues sur le plan!");
        swal(t("Error!"), t("Please use the points provided on the map!"), 'error');
        return;
      }

      if (
        (this.isPointOnLine(circle0Coordinates)
          && this.isPointOnLine(circleCoordinates))
        || (this.isPointOnLine(circle0Coordinates)
          && this.isPointOnLine(circle3Coordinates))
        || (this.isPointOnLine(circleCoordinates)
          && this.isPointOnLine(circle3Coordinates))
      ) {
        // alert("BRAVO: Vous venez de tracer une droite!");
        swal({
          title: t("Well done!"),
          text: t('You have just drawn a line!'),
          icon: 'success',
          button: 'Super!',
        });
      } else {
        // alert("Veuillez utiliser deux points du plan!");
        swal(t("Error!"), t('Please use two points on the map!'), 'error');
      }
    } else if (showSemiLine) {
      // Handling result check for semi-line
      if (
        (isEqual(startPoint, circle0Coordinates)
          && isEqual(newEndPoint, circleCoordinates))
        || (isEqual(startPoint, circle0Coordinates)
          && isEqual(newEndPoint, circle3Coordinates))
        || (isEqual(startPoint, circleCoordinates)
          && isEqual(newEndPoint, circle0Coordinates))
        || (isEqual(startPoint, circleCoordinates)
          && isEqual(newEndPoint, circle3Coordinates))
        || (isEqual(startPoint, circle3Coordinates)
          && isEqual(newEndPoint, circle0Coordinates))
        || (isEqual(startPoint, circle3Coordinates)
          && isEqual(newEndPoint, circleCoordinates))
      ) {
        // alert("FAUX: Ceci n'est pas une demi-droite!");
        swal({
          title: t('Wrong!'),
          text: t('This is not a semi-line!'),
          icon: 'error',
          button: 'Ok!',
        });
        return;
      }

      if (
        (isEqual(startPoint, circle0Coordinates)
          && (this.isPointOnLine(circleCoordinates)
            || this.isPointOnLine(circle3Coordinates)))
        || (isEqual(startPoint, circleCoordinates)
          && (this.isPointOnLine(circle0Coordinates)
            || this.isPointOnLine(circle3Coordinates)))
        || (isEqual(startPoint, circle3Coordinates)
          && (this.isPointOnLine(circle0Coordinates)
            || this.isPointOnLine(circleCoordinates)))
      ) {
        // alert("BRAVO: Vous venez de tracer une demi-droite!");
        swal({
          title: t("Well done!"),
          text: t("You have just drawn a semi-line!"),
          icon: 'success',
          button: 'Super!',
        });
      } else if (
        (isEqual(newEndPoint, circle0Coordinates)
          && (this.isPointOnLine(circleCoordinates)
            || this.isPointOnLine(circle3Coordinates)))
        || (isEqual(newEndPoint, circleCoordinates)
          && (this.isPointOnLine(circle0Coordinates)
            || this.isPointOnLine(circle3Coordinates)))
        || (isEqual(newEndPoint, circle3Coordinates)
          && (this.isPointOnLine(circle0Coordinates)
            || this.isPointOnLine(circleCoordinates)))
      ) {
        // alert("BRAVO: Vous venez de tracer une demi-droite!");
        swal({
          title: "Well done!",
          text: t("You have just drawn a semi-line!"),
          icon: 'success',
          button: 'Super!',
        });
      } else {
        // alert("FAUX: Ceci n'est pas une demi-droite!");
        swal({
          title: t('Wrong!'),
          text: t('This is not a semi-line!'),
          icon: 'error',
          button: 'Ok!',
        });
      }
    } else if (showSegment) {
      // Handling result check for semi-line
      if (
        (isEqual(startPoint, circle0Coordinates)
          && isEqual(newEndPoint, circleCoordinates))
        || (isEqual(startPoint, circle0Coordinates)
          && isEqual(newEndPoint, circle3Coordinates))
        || (isEqual(startPoint, circleCoordinates)
          && isEqual(newEndPoint, circle0Coordinates))
        || (isEqual(startPoint, circleCoordinates)
          && isEqual(newEndPoint, circle3Coordinates))
        || (isEqual(startPoint, circle3Coordinates)
          && isEqual(newEndPoint, circle0Coordinates))
        || (isEqual(startPoint, circle3Coordinates)
          && isEqual(newEndPoint, circleCoordinates))
      ) {
        // alert("BRAVO: Vous avez tracer un segment!");
        swal({
          title: "Well done!",
          text: t('You have just drawn a segment!'),
          icon: 'success',
          button: 'Super!',
        });
      } else {
        // alert("FAUX: Ceci n'est pas un segment!");
        swal({
          title: t('Wrong!'),
          text: t('This is not a segment!'),
          icon: 'error',
          button: 'Ok!',
        });
      }
    }
  };

  reset = () => {
    this.setState({ ...initialState });
  }

  linePoint = () => {
    const { drawedLinePoints: { startPoint, endPoint } } = this.state;
    const ptStart = { x: 0, y: 0 };
    const ptEnd = { x: endPoint[0], y: endPoint[1] };

    const sz = {
      width: Math.abs(ptEnd.x - ptStart.x),
      height: Math.abs(ptEnd.y - ptStart.y),
    };

    const adj = {
      width: sz.width * 0.2,
      height: sz.height * 0.2,
    };

    // Compute new position of arrow.
    const drawX = (startPoint[0] > startPoint[0] + endPoint[0])
      ? (startPoint[0] + adj.width) : (startPoint[0] - adj.width);

    const drawY = (startPoint[1] > endPoint[1])
      ? startPoint[1] + adj.height : startPoint[1] - adj.height;

    this.setState({ segmentLinePoint: [drawX, drawY] });
  }

  render() {
    const {
      showLine, showSegment, showSemiLine, themeColor, t,
    } = this.props;
    const {
      isMouseInside,
      lineCoordinates,
      circle0Coordinates,
      circleCoordinates,
      circle3Coordinates,
      lineDrawingFinished,
      drawedLinePoints: { startPoint, endPoint },
      segmentLinePoint,
    } = this.state;
    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );
    // console.log(segmentLinePoint);
    return (
      <div className="visualizer-container">
        <div>
          <div className="mb-2">
            {t('Please draw ')}
            { t(traceCondition(showLine, 'a line', ''))
             || t(traceCondition(showSemiLine, 'a semi-line', ''))
             || t(traceCondition(showSegment, 'a segment', ''))
            }
            <span>
              <Button
                className="ml-2"
                size="tiny"
                outline
                color="success"
                onClick={this.checkResults}
              >
                {t('Check')}
              </Button>
            </span>
            <span>
              <Button
                className="ml-2"
                size="tiny"
                outline
                color="danger"
                onClick={this.reset}
              >
                {t('Restart')}
              </Button>
            </span>
          </div>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onContentClick={e => this.handleClick(e, 'line')}
            onMouseMove={e => this.handleMouseMove(e, 'line')}
            scaleX={scale}
            scaleY={scale}
          >
            <Layer>
              {this.renderHorizontalGrid()}
              {this.renderVerticalGrid()}
              <Liner
                handleDragMove={this.handleDragMove}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                lineCoordinates={lineCoordinates}
                circle0Coordinates={circle0Coordinates}
                circleCoordinates={circleCoordinates}
                circle3Coordinates={circle3Coordinates}
                checkBoundaries={this.checkBoundaries}
                strokeWidth={isMouseInside ? 10 : 5}
                themeColor={themeColor}
                t={t}
              />

              {/* !!!!!!!! TRACE A LINE ALONG WITH THE LINE SEGMENT  !!!!!!!! */}
              {segmentLinePoint && showSegment && startPoint && endPoint && lineDrawingFinished && (
              <Arrow
                pointerAtBeginning
                scaleX={1.4}
                scaleY={1.4}
                stroke="rgb(0, 61, 55)"
                x={segmentLinePoint[0]}
                y={segmentLinePoint[1]}
                points={[0, 0, ...endPoint]}
              />
              )}
              {/* !!!!!!!! TRACE A LINE ALONG WITH THE LINE SEGMENT !!!!!!!! */}

              {startPoint && (
                <>
                  <Circle
                    ref={this.hackCircleRef}
                    x={startPoint[0]}
                    y={startPoint[1]}
                    radius={0} // This is a hack, to set the endPoint position x, y
                  />
                  {showSegment ? (
                    <Line
                      pointerAtBeginning={showLine}
                      stroke="rgb(0, 150, 136)"
                      x={startPoint[0]}
                      y={startPoint[1]}
                      points={[0, 0, ...endPoint]}
                    />
                  ) : (
                    <Arrow
                      pointerAtBeginning={showLine}
                      stroke="rgb(0, 150, 136)"
                      x={startPoint[0]}
                      y={startPoint[1]}
                      points={[0, 0, ...endPoint]}
                    />
                  )}
                </>
              )}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

Visualizer.propTypes = {
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  simulation: PropTypes.shape({
    showLine: PropTypes.bool.isRequired,
    showSemiLine: PropTypes.bool.isRequired,
    showSegment: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  simulation: state.simulation,
  themeColor: state.layout.themeColor,
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});

const ConnectedComponent = connect(mapStateToProps)(Visualizer);

export default withTranslation()(ConnectedComponent);
