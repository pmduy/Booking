import './App.css';
import React,{Suspense } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Register from 'containers/client/Auth/Register/Register';
import { Toaster } from 'react-hot-toast';
import  createBrowserHistory  from "history/createBrowserHistory"
import { adminRoutes, clientRoutes } from 'routes';
import ClientLayout from 'layout/ClientLayout';
import BookingTicket from 'containers/client/Booking/BookingTicket';
import Navbar from 'containers/admin/Sidebar';
import AdminLayout from 'layout/AdminLayout';
import PageNotFound from 'containers/Shared/PageNotFound';
import Login from 'containers/client/Auth/Login/Login';
export const history = createBrowserHistory()

function App() {
  const renderLayout=(routes,Layout)=>{
    return routes.map(route=>{
      const {path,component,exact,isPrivate} = route;
      return (
        <Layout path={path}
        component={component}
        exact={exact}
        isPrivate={isPrivate}
          />
      )
    })
  }
  return (
    <div className="App">
      <Toaster/>
      <Router history={history}>
        <Switch>  
          {renderLayout(clientRoutes,ClientLayout)}
          {renderLayout(adminRoutes,AdminLayout)}
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/register" component={Register}></Route>
          <Route exact path="/seat-plan/:id" component={BookingTicket}></Route>
          <Route  path="*" component={PageNotFound}></Route>
        </Switch>
      </Router>
    </div>
  )
}
export default App;
