export const AppState = {
  obserViewActive: true,
  showTitle: true,
  openModal: false,
  isMouseInside: false,
  lineCoordinates: [100, 400, 600, 200],
  circleCoordinates: [600, 200],

  shapes: [], // list of dimensions to be rendered as shapes
  segmentShapes: [], // list of dimensions to be rendered as shapes for the segment
  isDrawing: false, // in the process of drawing a shape
  isDrawingMode: false, // allow shapes to be drawn
};

export default AppState;
