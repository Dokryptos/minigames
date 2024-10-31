
import '@/utils/i18n';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'overlayscrollbars/overlayscrollbars.css';
import Router from './router';
import { GlobalToastRegion } from './components/toast-provider';
import LoaderSuspense from './components/loader-suspense';
import './utils/sentry';

// eslint-disable-next-line react-refresh/only-export-components
const ProviderPile = React.lazy(() => import('./components/provider-pile'));

window.onerror = (message, source, lineno, colno, error) => {
  // Log the error details to Logtail or any other logging service
  const errorDetails = {
    message: message,
    source: source,
    lineno: lineno,
    colno: colno,
    error: error,
  };

  if (import.meta.env.NODE_ENV !== 'production') {
    console.error(errorDetails);
  }

  return true;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<LoaderSuspense />}>
      <ProviderPile>
        <Router />
      </ProviderPile>
    </React.Suspense>
    <GlobalToastRegion />
  </React.StrictMode>
);
