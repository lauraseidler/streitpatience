import { arrayOf, string } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { COLORS, GRID_GAP } from '../../variables';

const Wrapper = styled.div`
  left: ${GRID_GAP};
  margin: auto;
  max-width: 500px;
  position: absolute;
  right: ${GRID_GAP};
  text-align: center;
  top: ${GRID_GAP};
  width: 100vw;
`;

const Message = styled.p`
  background: ${COLORS.RED};
  color: ${COLORS.WHITE};
  margin-top: 0;
  padding: 5px;
`;

const Errors = props => (
  <Wrapper>
    {props.errorMessages.map(error => <Message key={error}>{error}</Message>)}
  </Wrapper>
);

Errors.propTypes = {
  errorMessages: arrayOf(string).isRequired
};

const mapStateToProps = state => ({ errorMessages: state.errorMessages });

export default connect(mapStateToProps)(Errors);
