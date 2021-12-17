import React, { useEffect, useState } from 'react';

import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import { Switch } from 'react-router-dom';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import BrandDashboard from '../../features/brands/dashboard/BrandDashboard';
import BrandForm from '../../features/brands/form/BrandForm';
import UserDashboard from '../../features/users/dashboard/UserDashboard';
import UserForm from '../../features/users/form/UserForm';
import UserProfile from '../../features/users/form/UserProfile';

function App() {
  const location = useLocation(); //returns location object from router, useful for the key
  const { commonStore, userStore } = useStore();

  //Dark Mode
  const [theme, setTheme] = useState('dark');


  function handleToggleTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
    console.log(theme);

  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light');
    root.classList.remove('dark');
    root.classList.add(theme);
  }, [theme])

  //do something when this component loads
  //in this case, get the current user (otherwise reloading browser will clear mobx)
  useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded())
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <ModalContainer />
      <div className="h-full bg-gray-50 ">
        <Route exact path='/' component={HomePage} />
        <Route
          path={'/(.+)'}
          render={() => (
            <>
              <NavBar setTheme={handleToggleTheme} />
              <main>
                <div className="pl-24 pr-8 py-8">
                  <Switch>
                    <Route exact path='/activities' component={ActivityDashboard} />
                  

                    <Route exact path='/brands' component={BrandDashboard} />
                    <Route exact key={location.key} path={['/createBrand', '/editBrand/:id']} component={BrandForm} />
                    
                    <Route exact path='/users' component={UserDashboard} />
                    <Route exact path='/createUser' component={UserForm} />

                    <Route exact key={location.key} path={['/editUser', '/editUser/:id']} component={UserProfile} />


                    <Route path={'/errors'} component={TestErrors} />
                    <Route path={'/server-error'} component={ServerError} />
                    <Route path={'/login'} component={LoginForm} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </main>
            </>
          )} />
      </div>



    </>
  );
}

export default observer(App);
