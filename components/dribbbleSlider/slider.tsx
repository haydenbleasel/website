'use client';

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Arrow from './arrow';
import Shot from './shot';
import type { DribbbleResponse } from '@/lib/dribbble';

type SliderProps = {
  data: DribbbleResponse[];
};

const Slider: FC<SliderProps> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    loop: false,
    dragFree: false,
    draggable: false,
    align: 'start',
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const onSelect = () => {
      if (emblaApi) {
        setCanScrollNext(emblaApi.canScrollNext());
        setCanScrollPrev(emblaApi.canScrollPrev());
      }
    };

    if (emblaApi) {
      setCanScrollNext(emblaApi.canScrollNext());
      setCanScrollPrev(emblaApi.canScrollPrev());

      emblaApi.on('select', onSelect);
    }

    return () => {
      emblaApi?.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <>
      <div ref={emblaRef}>
        <div className="flex gap-8">{data.map(Shot)}</div>
      </div>
      <div className="flex gap-8">
        <Arrow
          icon={ArrowLeft}
          active={canScrollPrev}
          handleClick={() => emblaApi?.scrollPrev()}
        />
        <Arrow
          icon={ArrowRight}
          active={canScrollNext}
          handleClick={() => emblaApi?.scrollNext()}
        />
      </div>
    </>
  );
};

export default Slider;
