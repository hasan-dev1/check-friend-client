import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decNumber, incNumber } from '../../../actions';

const Upanddown = () => {
    const counterInitialvalue = useSelector((state)=> state.changeTheNumber);
    const dispatch = useDispatch()
    return (
      <div className="m-24">
        <button onClick={() => dispatch(decNumber())}>minus</button>
        <input className="px-3" type="text" value={counterInitialvalue} />
        <button onClick={() => dispatch(incNumber())}>plus</button>
      </div>
    );
};

export default Upanddown;