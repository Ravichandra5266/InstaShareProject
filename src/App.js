import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import UsersProfile from './components/UsersProfile'

import MyProfile from './components/MyProfile'

import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/users/:userId" component={UsersProfile} />
    <ProtectedRoutes exact path="/my-profile" component={MyProfile} />
  </Switch>
)

export default App
