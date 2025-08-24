import logo from '/logo-spaced.svg';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import { db } from '../firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

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
      <Outlet />
    </ProtectedRoute>
  );
}

export default App;
