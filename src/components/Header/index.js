import {Link, NavLink, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {CgCloseO} from 'react-icons/cg'

import InstaShareContext from '../../InstaShareContext/InstaShareContext'

import './index.css'

const Header = props => (
  <InstaShareContext.Consumer>
    {value => {
      const {
        onClickHamburgerActive,
        isHamburgerActive,
        onClickSearchBoxActive,
        searchBoxActive,
      } = value

      const onClickHamburger = () => {
        onClickHamburgerActive(true)
      }

      const onClickCloseHamburger = () => {
        onClickHamburgerActive(false)
      }

      const onClickLogout = () => {
        if (window.confirm('Are you sure you want to Logout')) {
          Cookies.remove('jwt_token')
          const {history} = props
          history.replace('/login')
        }
      }

      const onclickSearchBox = () => {
        onClickSearchBoxActive(true)
      }

      const activeText = searchBoxActive && 'active'

      return (
        <nav className="nav-container">
          <div className="nav-flex-container1">
            <div className="nav-flex-container2">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674705428/Standard_Collection_8_otzjni.png"
                  alt="website logo"
                  className="nav-logo"
                />
              </Link>
              <h1 className="nav-logo-title">Insta Share</h1>
            </div>
            <button
              type="button"
              className="hamburger-btn"
              onClick={onClickHamburger}
            >
              <img
                src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674815500/menu_lat0s8.png"
                alt="hamburger"
                className="hamburger-img"
              />
            </button>
            <ul className="lg-nav-list-items-container">
              <NavLink
                exact
                activeClassName="link-active"
                to="/"
                className="route-link"
              >
                <li className="nav-item">Home</li>
              </NavLink>
              <NavLink
                exact
                activeClassName="link-active"
                to="/my-profile"
                className="route-link"
              >
                <li className="nav-item">Profile</li>
              </NavLink>
              <button
                type="button"
                className="search-box-btn"
                onClick={onclickSearchBox}
              >
                <li className={`nav-item ${activeText}`}>Search</li>
              </button>
              <li className="nav-item">
                <button
                  type="button"
                  className="nav-logout-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          {isHamburgerActive && (
            <div className="nav-flex-container1">
              <ul className="nav-items-list-container">
                <NavLink
                  exact
                  to="/"
                  activeClassName="link-active"
                  className="route-link"
                >
                  <li className="nav-item">Home</li>
                </NavLink>

                <NavLink
                  exact
                  to="/my-profile"
                  activeClassName="link-active"
                  className="route-link"
                >
                  <li className="nav-item">Profile</li>
                </NavLink>
                <button
                  type="button"
                  className="search-box-btn"
                  onClick={onclickSearchBox}
                >
                  <li className={`nav-item ${activeText}`}>Search</li>
                </button>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-logout-btn"
                    onClick={onClickLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <button
                type="button"
                className="cross-btn"
                onClick={onClickCloseHamburger}
              >
                <CgCloseO className="cross-icon" />
              </button>
            </div>
          )}
          <hr className="hr-link" />
        </nav>
      )
    }}
  </InstaShareContext.Consumer>
)

export default withRouter(Header)
