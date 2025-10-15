import { createStore, Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

const NewTransactionProvider = () => {
  const newStore = createStore();

  return (
    <>
      {/* // <Provider store={newStore}> */}
      <Outlet />
      {/* </Provider> */}
    </>
  );
};

export default NewTransactionProvider;
