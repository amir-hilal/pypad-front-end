import React from 'react';
import 'ldrs/lineSpinner';
import 'ldrs/ring'
const Loading = () => {
  return (

    <l-line-spinner
      size="40"
      stroke="3"
      speed="1"
      color="black"
    ></l-line-spinner>
  );
};

export default Loading;
