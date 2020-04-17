import React, { Fragment } from 'react';
import spinner from './spinner.gif';

export default ()  => (
  <Fragment>
    <img src={spinner}
    style={{ width: '200px', margin: 'auto', display: 'block' }}
    alt='"PATIENCE is the antidote to anger, a way to learn to love and care for whatever we meet on the path."'/>
  </Fragment>
)