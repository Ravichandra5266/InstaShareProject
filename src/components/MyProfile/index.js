import {Component} from 'react'

import {TailSpin} from 'react-loader-spinner'

import Cookies from 'js-cookie'

import MyProfileDetails from '../MyProfileDetails'

import Header from '../Header'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class MyProfile extends Component {
  state = {
    myProfileApisStatus: apiStatusConstant.initial,
    myProfileData: {},
  }

  componentDidMount() {
    this.getMyProfileData()
  }

  getMyProfileData = async () => {
    this.setState({myProfileApisStatus: apiStatusConstant.inProgress})

    const MyProfileApi = 'https://apis.ccbp.in/insta-share/my-profile'
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(MyProfileApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const data = responseData.profile
      const updatedData = {
        followersCount: data.followers_count,
        followingCount: data.following_count,
        id: data.id,
        posts: data.posts.map(eachPosts => ({
          id: eachPosts.id,
          image: eachPosts.image,
        })),
        postsCount: data.posts_count,
        stories: data.stories.map(eachStories => ({
          id: eachStories.id,
          image: eachStories.image,
        })),
        userBio: data.user_bio,
        userId: data.user_id,
        userName: data.user_name,
        profilePic: data.profile_pic,
      }
      //   console.log(updatedData)
      this.setState({
        myProfileApisStatus: apiStatusConstant.success,
        myProfileData: updatedData,
      })
    } else {
      this.setState({myProfileApisStatus: apiStatusConstant.failure})
    }
  }

  renderMyProfileLoadingView = () => (
    <div className="myProfile-loading-container">
      <TailSpin type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  renderMyProfileSuccessView = () => {
    const {myProfileData} = this.state
    return (
      <ul className="myProfile-data-container">
        <MyProfileDetails
          myProfileData={myProfileData}
          key={myProfileData.id}
        />
      </ul>
    )
  }

  onClickConnectToMyProfile = () => {
    this.getMyProfileData()
  }

  renderMyProfileFailureView = () => (
    <div className="myProfile-failure-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
        alt="failure view"
        className="myProfile-failure-img"
      />
      <p className="myProfile-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="myProfile-failure-btn"
        onClick={this.onClickConnectToMyProfile}
      >
        Try again
      </button>
    </div>
  )

  renderMyProfileData = () => {
    const {myProfileApisStatus} = this.state
    let showCurrentResults = null
    switch (myProfileApisStatus) {
      case apiStatusConstant.success:
        showCurrentResults = this.renderMyProfileSuccessView()
        break
      case apiStatusConstant.failure:
        showCurrentResults = this.renderMyProfileFailureView()
        break
      case apiStatusConstant.inProgress:
        showCurrentResults = this.renderMyProfileLoadingView()
        break
      default:
        showCurrentResults = null
        break
    }
    return showCurrentResults
  }

  render() {
    return (
      <div className="my-profile-page-container">
        <Header />
        {this.renderMyProfileData()}
      </div>
    )
  }
}

export default MyProfile
