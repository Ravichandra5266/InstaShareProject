import {Component} from 'react'

import Cookies from 'js-cookie'

import {BiHide, BiShow} from 'react-icons/bi'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    isFormSubmitted: false,
    showPassword: false,
    userName: '',
    userPassword: '',
    loginErrorMsg: '',
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({userPassword: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userName, userPassword} = this.state
    const LoginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username: userName, password: userPassword}),
    }
    const responseUrl = await fetch(LoginApi, options)
    const responseData = await responseUrl.json()
    // console.log(responseData)
    if (responseUrl.ok) {
      Cookies.set('jwt_token', responseData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({
        loginErrorMsg: responseData.error_msg,
        isFormSubmitted: true,
      })
    }
  }

  render() {
    const {
      isFormSubmitted,
      showPassword,
      userName,
      userPassword,
      loginErrorMsg,
    } = this.state

    // console.log(showPassword)

    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674805961/Layer_2_d2m8jk.png"
          alt="website login"
          className="login-landing-img"
        />
        <div className="login-content-container">
          <div className="login-logo-content-container">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674705428/Standard_Collection_8_otzjni.png"
              alt="website logo"
              className="login-logo"
            />
            <h1 className="logo-title">Insta Share</h1>
          </div>
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <label htmlFor="username" className="login-form-labels">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={this.onChangeUserName}
              placeholder="Username"
              className="login-user-input"
            />

            <label htmlFor="password" className="login-form-labels">
              PASSWORD
            </label>
            <div className="password-container">
              {showPassword ? (
                <input
                  type="text"
                  id="password"
                  value={userPassword}
                  onChange={this.onChangeUserPassword}
                  placeholder="Password"
                  className="login-form-inputs"
                />
              ) : (
                <input
                  type="password"
                  id="password"
                  value={userPassword}
                  onChange={this.onChangeUserPassword}
                  placeholder="Password"
                  className="login-form-inputs"
                />
              )}
              <button
                type="button"
                className="password-icon-btn"
                onClick={this.onClickShowPassword}
              >
                {showPassword ? (
                  <BiShow className="password-icon" />
                ) : (
                  <BiHide className="password-icon" />
                )}
              </button>
            </div>
            {isFormSubmitted && (
              <p className="login-error-msg">{loginErrorMsg}</p>
            )}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
