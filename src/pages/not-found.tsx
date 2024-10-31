// EXPLICATION : Page Erreur 404

function NotFound() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center text-white">
      <h1 className="font-gabriele text-[6rem] leading-[11rem]">404</h1>
      <p className="text-lg">Oups! La page que vous demandez n&apos;existe pas.</p>
      <a className="mt-8 font-semibold underline-offset-2 hover:underline" href="/">
        Retourner à l&apos;enquête
      </a>
    </main>
  );
}
export default NotFound;
