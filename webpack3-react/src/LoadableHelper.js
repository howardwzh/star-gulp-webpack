import React from 'react';
import Loadable from 'react-loadable';

const LoadableHelper = (componetPath) => Loadable({
  loader: () => import(`${componetPath}`),
  loading: () => <div>Loading...</div>,
});

export default LoadableHelper