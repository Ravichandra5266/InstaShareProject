import {Link, withRouter} from 'react-router-dom'

import {useState} from 'react'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import './index.css'

const Header = props => {
  const [isHamburgerActive, setIsHamburgerActive] = useState(false)
  const [isSearchBoxActive, setIsSearchBoxActive] = useState(false)

  const onClickHamburger = () => {
    setIsHamburgerActive(true)
  }

  const onClickCloseHamburger = () => {
    setIsHamburgerActive(false)
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickSearchTextBtn = () => {
    setIsSearchBoxActive(true)
  }

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
            />
            <button type="button" className="search-icon-btn">
              <FaSearch className="search-icon" />
            </button>
          </li>
          <Link to="/" className="route-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/my-profile" className="route-link">
            <li className="nav-item">Profile</li>
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
            <Link to="/" className="route-link">
              <li className="nav-item">Home</li>
            </Link>
            <li className="nav-item">
              <button
                type="button"
                className="search-text-btn"
                onClick={onClickSearchTextBtn}
              >
                Search
              </button>
            </li>
            <Link to="/my-profile" className="route-link">
              <li className="nav-item">Profile</li>
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
          />
          <button type="button" className="search-icon-btn">
            <FaSearch className="search-icon" />
          </button>
        </div>
      )}
    </nav>
  )
}

export default withRouter(Header)
