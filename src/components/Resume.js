import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Resume = ({
  t,
  handleToggleLine,
  handleToggleSegment,
  handleToggleSemiLine,
  showLine,
  showSegment,
  showSemiLine,
  themeColor,
}) => (
  <div className="resume-container">
    <div className="description-content">
      <h2>{t('Description')}</h2>
      <p>
        {t('Lab Explanation')}
      </p>
      <hr className="separator-line" />
    </div>
    <div className="use-cases">
      <Button
        outline
        color="secondary"
        className={`${showLine ? 'line-activated' : ''} use-case`}
        onClick={handleToggleLine}
        style={{ backgroundColor: showLine ? themeColor : '' }}
      >
        {t('Line')}
      </Button>
      <br />
      <Button
        outline
        color="secondary"
        className={`${showSemiLine ? 'semi-line-activated' : ''} use-case semi-line`}
        onClick={handleToggleSemiLine}
        style={{ backgroundColor: showSemiLine ? themeColor : '' }}
      >
        {t('Semi-line')}
      </Button>
      <br />
      <Button
        outline
        color="secondary"
        className={`${showSegment ? 'segment-activated' : ''} use-case`}
        onClick={handleToggleSegment}
        style={{ backgroundColor: showSegment ? themeColor : '' }}
      >
        {t('Segment')}
      </Button>
    </div>
  </div>
);

Resume.propTypes = {
  t: PropTypes.func.isRequired,
  handleToggleLine: PropTypes.func.isRequired,
  handleToggleSegment: PropTypes.func.isRequired,
  handleToggleSemiLine: PropTypes.func.isRequired,
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});


const ConnectedComponent = connect(mapStateToProps)(Resume);

export default ConnectedComponent;
