import type { ReactNode } from 'react';
import Slider from './slider';
import { fetchDribbbleShot } from '@/lib/dribbble';

type DribbbleSliderProps = {
  shots: number[];
};

const DribbbleSlider = async ({
  shots,
}: DribbbleSliderProps): Promise<ReactNode> => {
  const data = await Promise.all(
    shots.map(async (shot) => fetchDribbbleShot(shot))
  );

  return (
    <div className="my-8 -mx-4 flex flex-col gap-8 overflow-hidden px-4 sm:overflow-visible">
      <Slider data={data} />
    </div>
  );
};

export default DribbbleSlider;
