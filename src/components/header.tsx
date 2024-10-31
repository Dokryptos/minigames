import logo from '@/assets/img/DB-Logo-DetectiveBox_AgenceDBBlanc.png?lqip';
import { Link } from 'react-router-dom';
import Image from './image';
import { ImageMeta } from '@/types/image-meta';
import defaultBanner from '@/assets/img/header-banner.jpeg?lqip';

type HeaderProps = {
  children?: React.ReactNode;
  banner?: ImageMeta;
  title?: React.ReactNode;
};
const Header = (props: HeaderProps) => {
  const { banner = defaultBanner, children, title } = props;

  return (
    <header className="relative flex h-16 shrink-0">
      <Image className="size-full rounded object-cover brightness-50" {...banner} alt="banner" />

      <div className="absolute left-0 top-0 flex size-full items-center gap-4 px-4 py-5">
        <Link className="h-full" to="/">
          <Image className="h-full w-auto" {...logo} alt="logo" />
        </Link>

        <h1 className="font-gabriele text-2xl uppercase text-white max-sm:hidden">{title}</h1>

        <div className="ml-auto flex items-center gap-4">{children}</div>
      </div>
    </header>
  );
};
export default Header;
