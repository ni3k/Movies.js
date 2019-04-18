import React from 'react';
import { css } from '@emotion/core';

import { ScaleLoader } from 'react-spinners';

const override = css`
    display: block !important;
    margin: 0 auto !important;
    position: fixed;
    left: 50%;
    top: 50%;
`;

const Loading = () => (
  <div className="sweet-loading" style={{ height: '100vh' }}>
    <ScaleLoader
      css={override}
      type="bubbles"
      sizeUnit="px"
    //   size={150}
      color="white"
      loading
    />
  </div>
);


export default Loading;
