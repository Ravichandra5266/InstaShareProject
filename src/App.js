import {Switch, Route, Redirect} from 'react-router-dom'

import {Component} from 'react'

import Login from './components/Login'

import Home from './components/Home'

import UsersProfile from './components/UsersProfile'

import MyProfile from './components/MyProfile'

import ProtectedRoutes from './components/ProtectedRoutes'

import NotFound from './components/NotFound'

import InstaShareContext from './InstaShareContext/InstaShareContext'

class App extends Component {
  state = {
    isHamburgerActive: false,
    searchBoxActive: false,
  }

  onClickHamburgerActive = value => {
    this.setState({isHamburgerActive: value})
  }

  onClickSearchBoxActive = () => {
    this.setState(prevState => ({searchBoxActive: !prevState.searchBoxActive}))
  }

  render() {
    const {isHamburgerActive, searchBoxActive} = this.state
    // console.log(isSearchIconBtnActive)
    return (
      <InstaShareContext.Provider
        value={{
          isHamburgerActive,
          onClickHamburgerActive: this.onClickHamburgerActive,
          searchBoxActive,
          onClickSearchBoxActive: this.onClickSearchBoxActive,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoutes exact path="/" component={Home} />
          <ProtectedRoutes
            exact
            path="/users/:userId"
            component={UsersProfile}
          />
          <ProtectedRoutes exact path="/my-profile" component={MyProfile} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </InstaShareContext.Provider>
    )
  }
}

export default App
