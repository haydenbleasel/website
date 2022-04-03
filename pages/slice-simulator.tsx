/* eslint-disable */
// @ts-nocheck

import { SliceSimulator } from '@prismicio/slice-simulator-react';
import { SliceZone } from '@prismicio/react';

import state from '../.slicemachine/libraries-state.json';
import { components } from '../slices';
import { FC } from 'react';

const SliceSimulatorPage: FC = () => (
  <SliceSimulator
    sliceZone={({ slices }) => (
      <SliceZone slices={slices} components={components} />
    )}
    state={state}
  />
);

export default SliceSimulatorPage;
