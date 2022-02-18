import React, { ReactElement } from 'react';
import validator from 'validator';

const StringType = ({ data }) => {
  let result = '';
  if (validator.isURL(data)) {
    if (data.match(/\.(jpg|jpeg|png|gif)$/)) {
      result = (
        <a href={data} target="_blank" rel="noopener noreferrer">
          <img src={data} alt={data} />
          <br />
          <span>{data}</span>
        </a>
      );
    } else {
      result = (
        <a href={data} target="_blank" rel="noopener noreferrer">
          <span>{data}</span>
        </a>
      );
    }
  } else {
    result = `"${data}"`;
  }
  return <span className="string-type">{result}</span>;
};

export default StringType;
