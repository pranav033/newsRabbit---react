import React, { Component } from 'react'
import loading from './loading.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt={loading} height="30%" width="30%" />
      </div>
    )
  }
}

export default Spinner
