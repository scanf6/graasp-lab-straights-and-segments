import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const Resume = ({
  t,
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
        className="use-case"
      >
        {t('Line')}
      </Button>
      <br />
      <Button
        outline
        color="secondary"
        className="use-case semi-line"
      >
        {t('Semi-line')}
      </Button>
      <br />
      <Button
        outline
        color="secondary"
        className="use-case"
      >
        {t('Segment')}
      </Button>
    </div>
  </div>
);

Resume.propTypes = {
  t: PropTypes.func.isRequired,
};
export default Resume;
