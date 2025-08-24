import logo from '/logo-spaced.svg';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <ProtectedRoute>
      <div className="flex-rows flex items-center">
        <img src={logo} className="h-8" />
        <p className="font-outfit text-lg">Keepin' Tabs</p>
      </div>
    </ProtectedRoute>
  );
}

export default App;
