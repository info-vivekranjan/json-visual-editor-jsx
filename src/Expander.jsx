import React, { useState, useCallback } from 'react';

const Expander = ({ defaultValue, onChangeExpansion }) => {
  const [expanded, setExpanded] = useState(defaultValue);

  const onClick = useCallback(() => {
    const newValue = !expanded;
    setExpanded(newValue);
    onChangeExpansion && onChangeExpansion(newValue);
  }, [expanded, onChangeExpansion]);

  const classes = [
    'component-expander',
    expanded ? 'expanded' : '',
    'btn',
    'btn-link',
  ].join(' ');

  return (
    <button className={classes} onClick={onClick}>
      <i className="fas fa-chevron-down" />
    </button>
  );
};

export default Expander;
