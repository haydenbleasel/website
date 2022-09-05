import type { SliceSimulatorProps } from '@prismicio/slice-simulator-react';
import { SliceSimulator } from '@prismicio/slice-simulator-react';
import { SliceZone } from '@prismicio/react';

import type { FC } from 'react';
import state from '../.slicemachine/libraries-state.json';
import { components } from '../slices';

const sliceSimulatorZone: SliceSimulatorProps['sliceZone'] = (props) => (
  <SliceZone {...props} components={components} />
);

const SliceSimulatorPage: FC = () => (
  <SliceSimulator sliceZone={sliceSimulatorZone} state={state} />
);

export default SliceSimulatorPage;
