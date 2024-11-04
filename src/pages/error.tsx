import * as React from "react";
import Button from "@/components/button";
import Header from "@/components/header";
import Menu from "@/components/menu";
// import { AuthContext } from '@/context/auth-context';
import { enableShortcuts } from "@/utils/env";
import Sentry from "@/utils/sentry";
import {
  Link,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";

function ErrorPage() {
  // const { logout } = React.useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const requestError = error as Error | Response;

    if (
      import.meta.env.PROD &&
      "message" in requestError &&
      (requestError.message.includes(
        "Failed to fetch dynamically imported module"
      ) ||
        requestError.message.includes("Importing a module script failed"))
    ) {
      window.location.pathname = location.pathname;
    }

    if ("json" in requestError) {
      requestError.json().then((err) => {
        console.error(err);
        Sentry.captureException(err);
      });
    } else {
      console.error(requestError);
      Sentry.captureException(requestError);
    }

    if (
      requestError &&
      "status" in requestError &&
      requestError.status === 401
    ) {
      // logout();

      navigate("/sign-in");
    }
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="mx-auto flex size-full min-h-[650px] max-w-screen-2xl flex-col gap-4 p-8 sm:h-screen">
      <Header>
        {/* <Menu>{ <Menu.Item onClick={logout}>Déconnexion</Menu.Item> }</Menu> */}
      </Header>

      <div className="flex grow flex-col items-center justify-center gap-8">
        <p className="text-3xl">Oups! Une erreur est survenue</p>

        {enableShortcuts && "stack" in (error as Error) && (
          <div className="min-w-80 space-y-2 rounded border border-solid bg-white/25 p-4 text-left">
            <p className="whitespace-pre-wrap">{(error as Error).stack}</p>
          </div>
        )}

        <Link to="/">
          <Button>Retourner à l&apos;enquête</Button>
        </Link>
      </div>
    </main>
  );
}
export default ErrorPage;
