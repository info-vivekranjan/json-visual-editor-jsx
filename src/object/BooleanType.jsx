import React, { ChangeEvent } from 'react';

const BooleanType = ({ data, readOnly = true, onChange }) => {
  return (
    <label className="boolean-type">
      <input
        type="checkbox"
        checked={data}
        readOnly={readOnly}
        onChange={onChange}
      />
      <span>{data ? 'true' : 'false'}</span>
    </label>
  );
};

export default BooleanType;
