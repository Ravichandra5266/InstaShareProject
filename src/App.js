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
    searchValue: '',
    isSearchIconBtnActive: false,
    isHamburgerActive: false,
    isSearchBoxActive: false,
    isHomeTextActive: false,
    isProfileTextActive: false,
    isSearchTextActive: false,
  }

  onChangeSearchValue = value => {
    this.setState({searchValue: value})
  }

  onClickToggleSearchIconBtn = () => {
    const {searchValue} = this.state
    if (searchValue !== '') {
      this.setState({isSearchIconBtnActive: true})
    } else {
      this.setState({isSearchIconBtnActive: false})
    }
  }

  onClickHamburgerActive = value => {
    this.setState({isHamburgerActive: value})
  }

  onClickSearchBoxActive = value => {
    this.setState({isSearchBoxActive: value})
  }

  onClickHomeTextActive = value => {
    this.setState({isHomeTextActive: value})
  }

  onClickProfileTextActive = value => {
    this.setState({isProfileTextActive: value})
  }

  onClickSearchTextActive = value => {
    this.setState({isSearchTextActive: value})
  }

  render() {
    const {
      searchValue,
      isSearchIconBtnActive,
      isHamburgerActive,
      isSearchBoxActive,
      isHomeTextActive,
      isProfileTextActive,
      isSearchTextActive,
    } = this.state
    // console.log(isSearchIconBtnActive)
    return (
      <InstaShareContext.Provider
        value={{
          searchValue,
          isSearchIconBtnActive,
          onClickToggleSearchIconBtn: this.onClickToggleSearchIconBtn,
          onChangeSearchValue: this.onChangeSearchValue,
          isHamburgerActive,
          onClickHamburgerActive: this.onClickHamburgerActive,
          isSearchBoxActive,
          onClickSearchBoxActive: this.onClickSearchBoxActive,
          isHomeTextActive,
          onClickHomeTextActive: this.onClickHomeTextActive,
          isProfileTextActive,
          onClickProfileTextActive: this.onClickProfileTextActive,
          isSearchTextActive,
          onClickSearchTextActive: this.onClickSearchTextActive,
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
