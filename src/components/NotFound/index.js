import {withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const onClickToHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1675249086/erroring_2_ltrbel.png"
        alt="page not found"
        className="not-found-image"
      />
      <h1 className="not-found-title">PAGE NOT FOUND</h1>
      <p className="not-found-para">
        we are sorry, the page you requested could not be found
      </p>
      <button type="button" className="not-found-btn" onClick={onClickToHome}>
        Home Page
      </button>
    </div>
  )
}
export default withRouter(NotFound)
