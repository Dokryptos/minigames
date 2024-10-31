import background from '@/assets/img/DB-griffures-Grises.png?lqip';
import Image from './image';

const Background = () => (
  <Image
    className="fixed left-0 top-0 -z-10 size-full"
    src={background.src}
    alt="background"
    height={background.height}
    width={background.width}
    lqip={background.lqip}
  />
);

export default Background;
