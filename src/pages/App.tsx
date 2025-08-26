import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/sidebar/Sidebar';
import { db } from '../firebase/firestore';

function App() {
  useEffect(() => {
    const specialOfTheDay = doc(db, 'specials/honey-roast');

    const docData = {
      description: 'honey roasted ham for christmas',
      price: 5.99,
      vegan: false,
      cusine: 'delicious',
    };

    setDoc(specialOfTheDay, docData);
  }, []);

  return (
    <ProtectedRoute>
      <div className="bg-olive text-cream flex min-h-dvh w-full justify-end overflow-x-hidden overflow-y-scroll">
        <Outlet />
        <Sidebar />
      </div>
    </ProtectedRoute>
  );
}

export default App;
