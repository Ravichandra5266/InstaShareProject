import {BsGrid3X3} from 'react-icons/bs'

import {BiCamera} from 'react-icons/bi'

import './index.css'

const MyProfileDetails = props => {
  const {myProfileData} = props
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
  } = myProfileData
  return (
    <li className="myProfile-details">
      <div className="sm-myProfile-container">
        <h1 className="myProfile-name">{userName}</h1>
        <ul className="myProfile-head-flex-container">
          <img src={profilePic} alt="my profile" className="myProfile-img" />
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
        <h1 className="myProfile-userId">{userId}</h1>
        <p className="myProfile-bio">{userBio}</p>
      </div>
      <div className="lg-myProfile-container">
        <img src={profilePic} alt="my profile" className="myProfile-img" />
        <div className="lg-myProfile-text-container">
          <h1 className="myProfile-name">{userName}</h1>
          <ul className="myProfile-head-flex-container">
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
          <h1 className="myProfile-userId">{userId}</h1>
          <p className="myProfile-bio">{userBio}</p>
        </div>
      </div>
      <ul className="myProfile-stories-list-container">
        {stories.map(eachStory => (
          <li key={eachStory.id} className="myProfile-story-container">
            <img
              src={eachStory.image}
              alt="my story"
              className="myProfile-story"
            />
          </li>
        ))}
      </ul>
      <hr className="hr-line" />
      <div className="post-head-flex-container">
        <BsGrid3X3 className="grid-icon" />
        <h1 className="posts-title">Posts</h1>
      </div>
      <ul className="myProfile-posts-list-container">
        {posts.length > 0 ? (
          posts.map(eachPost => (
            <li key={eachPost.id} className="myProfilePost">
              <img
                src={eachPost.image}
                alt="my post"
                className="myProfile-post"
              />
            </li>
          ))
        ) : (
          <div className="myProfile-post-empty-container">
            <BiCamera className="camera-icon" />
            <h1 className="myProfile-empty-post-text">No Posts</h1>
          </div>
        )}
      </ul>
    </li>
  )
}

export default MyProfileDetails
