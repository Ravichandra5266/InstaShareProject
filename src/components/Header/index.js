import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import InstaShareContext from '../../InstaShareContext/InstaShareContext'

import './index.css'

const Header = props => (
  <InstaShareContext.Consumer>
    {value => {
      const {
        searchValue,
        onChangeSearchValue,
        onClickToggleSearchIconBtn,
        onClickHamburgerActive,
        onClickSearchBoxActive,
        onClickHomeTextActive,
        onClickProfileTextActive,
        isHomeTextActive,
        isProfileTextActive,
        isHamburgerActive,
        isSearchBoxActive,
      } = value

      const onClickHamburger = () => {
        onClickHamburgerActive(true)
      }

      const onClickCloseHamburger = () => {
        onClickHamburgerActive(false)
      }

      const onClickLogout = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const onClickSearchTextBtn = () => {
        onClickSearchBoxActive(true)
        onClickHomeTextActive(false)
        onClickProfileTextActive(false)
      }

      const onClickSearchIconBtn = () => {
        onClickToggleSearchIconBtn(true)
      }

      const onChangeSearch = event => {
        onChangeSearchValue(event.target.value)
      }

      const onClickHomeTextBtn = () => {
        onClickHomeTextActive(true)
        onClickProfileTextActive(false)
        onClickSearchBoxActive(false)
      }

      const onClickProfileTextBtn = () => {
        onClickHomeTextActive(false)
        onClickProfileTextActive(true)
        onClickSearchBoxActive(false)
      }

      const HomeActiveTextStyle = isHomeTextActive && 'active'
      const ProfileActiveTextStyle = isProfileTextActive && 'active'
      const SearchActiveTextStyle = isSearchBoxActive && 'active'

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
              <li className="lg-searchBoxContainer">
                <input
                  type="search"
                  placeholder="Search Caption"
                  className="searchInput"
                  value={searchValue}
                  onChange={onChangeSearch}
                />
                <button
                  type="button"
                  className="search-icon-btn"
                  onClick={onClickSearchIconBtn}
                >
                  <FaSearch className="search-icon" />
                </button>
              </li>
              <Link to="/" className="route-link" onClick={onClickHomeTextBtn}>
                <li className={`nav-item ${HomeActiveTextStyle}`}>Home</li>
              </Link>
              <Link
                to="/my-profile"
                className="route-link"
                onClick={onClickProfileTextBtn}
              >
                <li className={`nav-item ${ProfileActiveTextStyle}`}>
                  Profile
                </li>
              </Link>
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
                <Link
                  to="/"
                  className="route-link"
                  onClick={onClickHomeTextBtn}
                >
                  <li className={`nav-item ${HomeActiveTextStyle}`}>Home</li>
                </Link>
                <li className="nav-item">
                  <button
                    type="button"
                    className={`search-text-btn ${SearchActiveTextStyle} `}
                    onClick={onClickSearchTextBtn}
                  >
                    Search
                  </button>
                </li>
                <Link
                  to="/my-profile"
                  className="route-link"
                  onClick={onClickProfileTextBtn}
                >
                  <li className={`nav-item ${ProfileActiveTextStyle}`}>
                    Profile
                  </li>
                </Link>
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
                <img
                  src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674815618/Shape_gpkpc9.png"
                  alt="cross"
                />
              </button>
            </div>
          )}
          {isSearchBoxActive && (
            <div className="searchBoxContainer">
              <input
                type="search"
                placeholder="Search Caption"
                className="searchInput"
                value={searchValue}
                onChange={onChangeSearch}
              />
              <button
                type="button"
                className="search-icon-btn"
                onClick={onClickSearchIconBtn}
              >
                <FaSearch className="search-icon" />
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
