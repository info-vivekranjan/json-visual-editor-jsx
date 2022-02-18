import React from 'react';

export const Header= () => {
  return (
    <header className="navbar navbar-dark bg-dark">
      <a
        className="navbar-brand"
        href="https://json-visual-editor-new.netlify.app/"
      >
        JSON Visual Editor <span className="badge badge-secondary">v2</span>
      </a>
    </header>
  );
};
