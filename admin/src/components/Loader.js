import React from 'react';
import { ScaleLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="text-center">
      <ScaleLoader color="#36d7b7" />
    </div>
  );
}

export default Loader;