import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import { Layout } from '@/Layout';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { HomePage, FormBuilderPage, FormFillerPage, FormResponsesPage } from '@/pages';
import { ROUTES } from '@/shared/config/routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={ROUTES.formNew} element={<FormBuilderPage />} />
      <Route path={ROUTES.formFill} element={<FormFillerPage />} />
      <Route path={ROUTES.formResponses} element={<FormResponsesPage />} />
      <Route path="*" element={<ErrorMessage message="Page not found." />} />
    </Route>
  )
);

export function App() {
  return <RouterProvider router={router} />;
}
