import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Explanation = ({
  showLine,
  showSegment,
  showSemiLine,
}) => (
  <div className="explanation-component">
    { showSemiLine ? (
      <p>
        Une Demi-Droite, est une portion de droite limitée par un point appelé
        &nbsp;
        <b>Origine</b>
        .
        Dans notre cas, la demi-droite commence par le point
        &nbsp;
        <b>A</b>
        , et est limitée par le point
        &nbsp;
        <b>B</b>
        .
      </p>
    ) : ''
    }
    { showSegment ? (
      <p>
        Un Segment, est une portion de droite délimitée par deux points
        appelés extrémités du segment. Dans notre cas, le Segment est limité par le point
        &nbsp;
        <b>A</b>
        , et par le point
        &nbsp;
        <b>B</b>
        .
      </p>
    ) : ''
    }
    { showLine ? (
      <p>
        Une Ligne ou Droite, est une figure géométrique formé de points alignés,
        et illimitée des deux côtés.
      </p>
    ) : ''
    }
  </div>
);

Explanation.propTypes = {
  showLine: PropTypes.bool.isRequired,
  showSegment: PropTypes.bool.isRequired,
  showSemiLine: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showLine: state.simulation.showLine,
  showSegment: state.simulation.showSegment,
  showSemiLine: state.simulation.showSemiLine,
});


const ConnectedComponent = connect(mapStateToProps)(Explanation);

export default ConnectedComponent;
