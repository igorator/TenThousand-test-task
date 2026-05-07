import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { Layout } from '@/shared/components/Layout';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { HomePage } from '@/pages/HomePage';
import { ROUTES } from '@/shared/config/routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route
        path={ROUTES.formNew}
        lazy={async () => {
          const { FormBuilderPage } = await import('@/pages/FormBuilderPage');
          return { Component: FormBuilderPage };
        }}
      />
      <Route
        path={ROUTES.formFillPattern}
        lazy={async () => {
          const { FormFillerPage } = await import('@/pages/FormFillerPage');
          return { Component: FormFillerPage };
        }}
      />
      <Route
        path={ROUTES.formResponsesPattern}
        lazy={async () => {
          const { FormResponsesPage } = await import('@/pages/FormResponsesPage');
          return { Component: FormResponsesPage };
        }}
      />
      <Route path="*" element={<ErrorMessage message="Page not found." />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}
