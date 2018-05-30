import React from 'react';
import Loadable from 'react-loadable';

const LoadableHelper = (componentImport) => Loadable({
  loader: componentImport,
  loading: () => <div>Loading...</div>,
});

export default LoadableHelper