import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  useNavigation,
} from 'react-router-dom';
import Error from './pages/error';
import NotFound from './pages/not-found';
import LoaderSuspense from './components/loader-suspense';
import Background from './components/background';

const RootLayout = () => {
  const navigation = useNavigation();

  return (
    <>
      <Background />
      <Outlet />
      <LoaderSuspense show={navigation.state === 'loading'} />
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} errorElement={<Error />}>
      <Route path="/*" element={<NotFound />} />

      <Route lazy={() => import('./pages/ciao-bella/layout')}>
        <Route path="/ciao-bella" lazy={() => import('./pages/ciao-bella/home/page')} />
        <Route
          path="/ciao-bella/fingerprints"
          lazy={() => import('./pages/ciao-bella/minigames/fingerprints/page')}
        />
        <Route
          path="/ciao-bella/facial-composite"
          lazy={() => import('./pages/ciao-bella/minigames/facial-composite/page')}
        />
        <Route
          path="/ciao-bella/neighbourhood-investigation"
          lazy={() => import('./pages/ciao-bella/minigames/neighbourhood-investigation/page')}
        />
        <Route
          path="/ciao-bella/gang-hideout"
          lazy={() => import('./pages/ciao-bella/minigames/gang-hideout/page')}
        />
        <Route
          path="/ciao-bella/camera-hack"
          lazy={() => import('./pages/ciao-bella/minigames/camera-hack/page')}
        />
        <Route
          path="/ciao-bella/lonewood-flat"
          lazy={() => import('./pages/ciao-bella/minigames/lonewood-flat/page')}
        />
        <Route
          path="/ciao-bella/safe"
          lazy={() => import('./pages/ciao-bella/minigames/safe/page')}
        />
        <Route
          path="/ciao-bella/a1d5sqlcn34vpalx"
          lazy={() => import('./pages/ciao-bella/minigames/a1d5sqlcn34vpalx/page')}
        />
      </Route>
    </Route>
  )
);

const Router = () => <RouterProvider router={router} />;

export default Router;
