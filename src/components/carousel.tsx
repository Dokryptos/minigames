import * as React from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { cn } from '@/utils/cn';
import { Icon } from '@iconify-icon/react';

type EmblaOptionsType = Parameters<typeof useEmblaCarousel>[0];
type EmblaCarouselType = UseEmblaCarouselType[1];

const CarouselContext = React.createContext<
  (EmblaCarouselType & { selectedIndex: number }) | undefined
>(undefined);

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = React.useCallback((api: NonNullable<EmblaCarouselType>) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api: NonNullable<EmblaCarouselType>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type DotButtonProps = React.PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

const DotButton = (props: DotButtonProps) => {
  const { children, className, ...restProps } = props;

  return (
    <button
      type="button"
      {...restProps}
      className={cn('h-2.5 w-2.5 rounded-full shrink-0 bg-black transition', className)}
    >
      {children}
    </button>
  );
};

const arrowButtonClassName =
  'absolute transition top-1/2 z-10 size-12 flex items-center justify-center -translate-y-1/2 rounded-full bg-white p-2 shadow-md text-[1.625rem] text-gray-900';

type CarouselProps = {
  buttonArrows?: boolean;
  buttonNavigation?: boolean;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  onChange?: (emblaApi: EmblaCarouselType) => void;
  options?: EmblaOptionsType;
};

const Carousel = React.forwardRef<
  { emblaApi: EmblaCarouselType; selectedIndex: number },
  CarouselProps
>((props, ref) => {
  const {
    buttonArrows,
    buttonNavigation,
    children,
    className,
    containerClassName,
    onChange,
    options,
  } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  React.useImperativeHandle(ref, () => ({ emblaApi, selectedIndex }), [emblaApi, selectedIndex]);

  React.useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') emblaApi?.scrollPrev();
      if (event.key === 'ArrowRight') emblaApi?.scrollNext();
    };

    /**
     * Add keydown event listener
     */
    emblaApi?.rootNode()?.addEventListener('keydown', keydownHandler);

    /**
     * Trigger onChange callback
     */
    const handler = emblaApi && onChange && emblaApi.on('slidesInView', onChange);

    return () => {
      removeEventListener('keydown', keydownHandler);
      handler?.clear();
    };
  }, [emblaApi]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <CarouselContext.Provider value={{ ...emblaApi!, selectedIndex }}>
      <div
        tabIndex={React.Children.count(children) > 1 ? 0 : undefined}
        className={cn('flex flex-col overflow-hidden', className)}
        ref={emblaRef}
      >
        <div className={cn('flex gap-4', containerClassName)}>{children}</div>
      </div>
      {buttonArrows && (
        <button
          type="button"
          aria-label="previous"
          onClick={() => emblaApi?.scrollPrev()}
          className={cn(
            arrowButtonClassName,
            !emblaApi?.canScrollPrev() && 'cursor-not-allowed opacity-50 text-gray-500',
            'left-4'
          )}
        >
          <Icon icon="lucide:chevron-left" className="" />
        </button>
      )}
      {buttonArrows && (
        <button
          type="button"
          aria-label="next"
          onClick={() => emblaApi?.scrollNext()}
          className={cn(
            arrowButtonClassName,
            !emblaApi?.canScrollNext() && 'cursor-not-allowed opacity-50 text-gray-500',
            'right-4'
          )}
        >
          <Icon icon="lucide:chevron-left" className="rotate-180 " />
        </button>
      )}
      {buttonNavigation && (
        <div className="mx-auto my-8 flex flex-wrap justify-center gap-5 px-4">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={index === selectedIndex ? 'bg-slate-200' : ''}
            />
          ))}
        </div>
      )}
    </CarouselContext.Provider>
  );
});

export { CarouselContext };
export default Carousel;
