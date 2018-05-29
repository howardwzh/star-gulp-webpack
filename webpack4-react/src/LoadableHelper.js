import React from 'react';
import Loadable from 'react-loadable';

const LoadableHelper = (componentPath) => Loadable({
  loader: () => import(`${componentPath}`),
  loading: () => <div>Loading...</div>,
});

export default LoadableHelper