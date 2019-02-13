import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Explanation = ({
  showLine,
  showSegment,
  showSemiLine,
  t,
}) => (
  <div className="explanation-component">
    { showSemiLine ? (
      <div className="expression-container">
        <h2>
          {t('Expression')}
          : (AB]
        </h2>
        <p>
          {t('SemiLine Explanation')}
        </p>
      </div>
    ) : ''
    }
    { showSegment ? (
      <div className="expression-container">
        <h2>
          {t('Expression')}
          : [AB]
        </h2>
        <p>
          {t('Segment Explanation')}
        </p>
      </div>
    ) : ''
    }
    { showLine ? (
      <div className="expression-container">
        <h2>
          {t('Expression')}
          : (AB)
        </h2>
        <p>
          {t('Line Explanation')}
        </p>
      </div>
    ) : ''
    }
  </div>
);

Explanation.propTypes = {
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});


const ConnectedComponent = connect(mapStateToProps)(Explanation);

export default ConnectedComponent;
