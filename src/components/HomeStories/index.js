import {Component} from 'react'

import {TailSpin} from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Slider from 'react-slick'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeStories extends Component {
  state = {
    storiesApiStatus: apiStatusConstant.initial,
    storiesListData: [],
  }

  componentDidMount() {
    this.getStoriesData()
  }

  getStoriesData = async () => {
    this.setState({storiesApiStatus: apiStatusConstant.inProgress})
    const StoriesApi = 'https://apis.ccbp.in/insta-share/stories'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(StoriesApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const updatedData = responseData.users_stories.map(eachStory => ({
        userId: eachStory.user_id,
        userName: eachStory.user_name,
        storyUrl: eachStory.story_url,
      }))
      //   console.log(updatedData)
      this.setState({
        storiesApiStatus: apiStatusConstant.success,
        storiesListData: updatedData,
      })
    } else {
      this.setState({storiesApiStatus: apiStatusConstant.failure})
    }
  }

  renderStoriesLoadingView = () => (
    <div className="stories-loading-container">
      <TailSpin type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  renderStoriesSuccessView = () => {
    const {storiesListData} = this.state
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <ul className="stories-list-container">
        <Slider {...settings}>
          {storiesListData.map(eachStory => (
            <li className="story-img-container" key={eachStory.userId}>
              <img
                src={eachStory.storyUrl}
                alt="user story"
                className="slider-story-img"
              />
              <h1 className="slider-user-name">{eachStory.userName}</h1>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  onClickConnectToStories = () => {
    this.getStoriesData()
  }

  renderStoriesFailureView = () => (
    <div className="stories-failure-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
        alt="failure view"
        className="stories-failure-img"
      />
      <p className="stories-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="stories-failure-btn"
        onClick={this.onClickConnectToStories}
      >
        Try again
      </button>
    </div>
  )

  renderStories = () => {
    const {storiesApiStatus} = this.state
    let showCurrentResults = null
    switch (storiesApiStatus) {
      case apiStatusConstant.success:
        showCurrentResults = this.renderStoriesSuccessView()
        break
      case apiStatusConstant.failure:
        showCurrentResults = this.renderStoriesFailureView()
        break
      case apiStatusConstant.inProgress:
        showCurrentResults = this.renderStoriesLoadingView()
        break
      default:
        showCurrentResults = null
        break
    }
    return showCurrentResults
  }

  render() {
    return (
      <div className="home-stories-page-container">
        {this.renderStories()}
        {/* <hr className="line" /> */}
      </div>
    )
  }
}

export default HomeStories
