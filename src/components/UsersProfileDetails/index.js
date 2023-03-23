import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import './index.css'

const UserProfileDetails = props => {
  const {userProfileData} = props
  //   console.log(userProfileData)
  const {
    followersCount,
    followingCount,
    posts,
    stories,
    postsCount,
    userBio,
    userId,
    userName,
    profilePic,
  } = userProfileData
  return (
    <li className="userProfile-details">
      <div className="sm-userProfile-container">
        <h1 className="userProfile-name">{userName}</h1>
        <ul className="userProfile-head-flex-container">
          <img
            src={profilePic}
            alt="user profile"
            className="userProfile-img"
          />
          <li className="post-item-container">
            <h1 className="count">{postsCount}</h1>
            <p className="count-text">posts</p>
          </li>
          <li className="followers-item-container">
            <h1 className="count">{followersCount}</h1>
            <p className="count-text">followers</p>
          </li>
          <li className="following-item-container">
            <h1 className="count">{followingCount}</h1>
            <p className="count-text">following</p>
          </li>
        </ul>
        <h1 className="userProfile-userId">{userId}</h1>
        <p className="userProfile-bio">{userBio}</p>
      </div>
      <div className="lg-userProfile-container">
        <img src={profilePic} alt="user profile" className="userProfile-img" />
        <div className="lg-userProfile-text-container">
          <h1 className="userProfile-name">{userName}</h1>
          <ul className="userProfile-head-flex-container">
            <li className="post-item-container">
              <h1 className="count">{postsCount}</h1>
              <p className="count-text">posts</p>
            </li>
            <li className="followers-item-container">
              <h1 className="count">{followersCount}</h1>
              <p className="count-text">followers</p>
            </li>
            <li className="following-item-container">
              <h1 className="count">{followingCount}</h1>
              <p className="count-text">following</p>
            </li>
          </ul>
          <h1 className="userProfile-userId">{userId}</h1>
          <p className="userProfile-bio">{userBio}</p>
        </div>
      </div>
      <ul className="userProfile-stories-list-container">
        {stories.map(eachStory => (
          <li key={eachStory.id} className="userProfile-story-container">
            <img
              src={eachStory.image}
              alt="user story"
              className="userProfile-story"
            />
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
      <div className="post-head-flex-container">
        <BsGrid3X3 className="grid-icon" />
        <h1 className="posts-title">Posts</h1>
      </div>
      <ul className="userProfile-posts-list-container">
        {posts.length > 0 ? (
          posts.map(eachPost => (
            <li key={eachPost.id} className="userProfilePost">
              <img
                src={eachPost.image}
                alt="user post"
                className="userProfile-post"
              />
            </li>
          ))
        ) : (
          <div className="userProfile-post-empty-container">
            <BiCamera className="camera-icon" />
            <h1 className="userProfile-empty-post-text">No Posts</h1>
          </div>
        )}
      </ul>
    </li>
  )
}

export default UserProfileDetails
