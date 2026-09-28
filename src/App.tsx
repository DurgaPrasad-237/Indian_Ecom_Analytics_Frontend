import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes/AppRoutes';

export default function App() {
  return useRoutes(routes);
}
