import React from 'react';
import './MainSpinner.css'
const MainSpinner = () => {
    return (
      <div className='maindiv'>
        <div id="spinner" className="active">
          <span id="first" className="ball"></span>
          <span id="second" className="ball"></span>
          <span id="third" className="ball"></span>
        </div>
      </div>
    );
};
export default MainSpinner;