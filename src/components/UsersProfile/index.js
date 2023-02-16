import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import UserProfileDetails from '../UsersProfileDetails'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class UsersProfile extends Component {
  state = {
    usersProfileApisStatus: apiStatusConstant.initial,
    userProfileData: {},
  }

  componentDidMount() {
    this.getUsersProfileData()
  }

  getUsersProfileData = async () => {
    this.setState({usersProfileApisStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {userId} = params
    const UserProfileApi = `https://apis.ccbp.in/insta-share/users/${userId}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(UserProfileApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const data = responseData.user_details
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
        usersProfileApisStatus: apiStatusConstant.success,
        userProfileData: updatedData,
      })
    } else {
      this.setState({usersProfileApisStatus: apiStatusConstant.failure})
    }
  }

  renderUserProfileLoadingView = () => (
    <div className="usersProfile-loading-container">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  renderUserProfileSuccessView = () => {
    const {userProfileData} = this.state
    return (
      <ul className="userProfile-data-container">
        <UserProfileDetails
          userProfileData={userProfileData}
          key={userProfileData.userId}
        />
      </ul>
    )
  }

  renderUsersProfileData = () => {
    const {usersProfileApisStatus} = this.state
    let showCurrentResults = null
    switch (usersProfileApisStatus) {
      case apiStatusConstant.success:
        showCurrentResults = this.renderUserProfileSuccessView()
        break
      case apiStatusConstant.failure:
        showCurrentResults = this.renderUserProfileFailureView()
        break
      case apiStatusConstant.inProgress:
        showCurrentResults = this.renderUserProfileLoadingView()
        break
      default:
        showCurrentResults = null
        break
    }
    return showCurrentResults
  }

  render() {
    return (
      <div className="users-profile-page-container">
        {this.renderUsersProfileData()}
      </div>
    )
  }
}

export default UsersProfile
