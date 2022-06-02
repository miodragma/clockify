import Layout from './components/Layout/Layout';
import Routes from './route/Route';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchUserData } from './components/User/store/user-actions';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  return (
    <Layout>
      <Routes/>
    </Layout>
  );
}

export default App;
