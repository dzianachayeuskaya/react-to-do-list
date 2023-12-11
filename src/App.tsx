import { Layout } from './components/Layout';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/reducer';
import { Provider } from 'react-redux';
import { Content } from './components/Content';
import DBManager from './utils/DBManager';
import { useEffect } from 'react';

const store = configureStore({ reducer: rootReducer });

function App() {
  useEffect(() => {
    const indexedDBManager = new DBManager('myDatabase', 'myStore');

    const saveDataBeforeUnload = async () => {
      const data = store.getState();
      await indexedDBManager.saveData('todoListState', data);
    };

    window.addEventListener('beforeunload', saveDataBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', saveDataBeforeUnload);
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Content />
      </Layout>
    </Provider>
  );
}

export default App;
