import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import UsersProfile from './components/UsersProfile'

import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoutes exact path="/" component={Home} />
    <ProtectedRoutes exact path="/users/:userId" component={UsersProfile} />
  </Switch>
)

export default App
