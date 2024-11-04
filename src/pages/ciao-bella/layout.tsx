import * as React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/header";
import AcountMenu from "./account-menu";
import NavItem from "@/components/nav-item";
import { Transition } from "@headlessui/react";
// import headerBanner from '@/assets/app-3/banner-min.jpeg?lqip';
// import background from '@/assets/app-3/background-min.jpg?lqip';
import Image from "@/components/image";
import GAME_DATA from "@/data/ciao-bella/game";
import { PortalContext, usePortalContext } from "@/context/portal-context";
import { createPortal } from "react-dom";
import Footer from "./footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <>
        {/* <Image
          className="fixed left-0 top-0 -z-10 size-full opacity-70"
          src={background.src}
          alt="background"
          height={background.height}
          width={background.width}
          lqip={background.lqip}
        /> */}

        {/* <StartupDialogs /> */}

        <div className="mx-auto flex size-full min-h-[650px] max-w-screen-2xl flex-col gap-4 p-8 sm:h-screen">
          {/* <Header banner={headerBanner} title={GAME_DATA.name}>
            <AcountMenu />
          </Header> */}

          <Transition
            appear
            as={React.Fragment}
            show={true}
            enter="transition-opacity duration-500 delay-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="flex grow flex-col lg:h-0">
              <nav className="flex gap-2">
                <NavItem
                  icon="ph:users-three"
                  title="Requêtes"
                  link="/ciao-bella"
                />

                <NavItem
                  icon="ph:question"
                  title="Demander de l'aide"
                  link="/ciao-bella/help"
                />
              </nav>

              <div className="flex-1 overflow-hidden rounded-r-lg rounded-bl-lg bg-zinc-800 shadow-md">
                {children}
              </div>
            </div>
          </Transition>

          <Footer />
        </div>
      </>
    </>
  );
};

const Portal = () => {
  const portalContext = React.useContext(PortalContext);

  return createPortal(portalContext.children, document.body);
};

const WithProviders = () => {
  const windowsContext = usePortalContext();

  return (
    <PortalContext.Provider value={windowsContext}>
      <Layout>
        <Outlet />
      </Layout>
      <Portal />
    </PortalContext.Provider>
  );
};

export const Component = WithProviders;
export default WithProviders;
