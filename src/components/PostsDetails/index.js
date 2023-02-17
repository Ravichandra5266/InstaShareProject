import {FcLike} from 'react-icons/fc'

import {BsHeart} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import {Link} from 'react-router-dom'

// import InstaShareContext from '../../InstaShareContext/InstaShareContext'

import './index.css'

const PostsDetails = props => {
  const {
    eachPost,
    onClickIncrementLikeCount,
    onClickDecrementUnlikeCount,
  } = props
  //   console.log(eachPost)
  const {
    comments,
    userId,
    userName,
    postDetails,
    isLikePost,
    createdAt,
    profilePic,
    postId,
    likesCount,
  } = eachPost

  const onClickToChangeLike = () => {
    onClickIncrementLikeCount(postId)
  }

  const onClickToChangeUnlike = () => {
    onClickDecrementUnlikeCount(postId)
  }
  return (
    <li className="post-container">
      <div className="post-head-container">
        <img
          src={profilePic}
          alt="post author profile"
          className="post-profile-pic"
        />
        <Link to={`users/${userId}`} className="route-link">
          <h1 className="post-user-name">{userName}</h1>
        </Link>
      </div>
      <img src={postDetails.imageUrl} alt="post" className="post-img" />
      <div className="post-bottom-container">
        <ul className="post-btn-container">
          <li className="post-item">
            {isLikePost ? (
              <button
                type="button"
                className="like-btn"
                onClick={onClickToChangeUnlike}
              >
                <FcLike className="like-icon" />
              </button>
            ) : (
              <button
                type="button"
                className="like-btn"
                onClick={onClickToChangeLike}
              >
                <BsHeart className="unlike-icon" />
              </button>
            )}
          </li>
          <li className="post-item">
            <FaRegComment className="comment-icon" />
          </li>
          <li className="post-item">
            <BiShareAlt className="share-icon" />
          </li>
        </ul>
        <p className="post-like">{`${likesCount} likes`}</p>
        <p className="post-caption">{postDetails.caption}</p>
        <ul className="comment-list-container">
          {comments.map(eachComment => (
            <li key={eachComment.userId}>
              <p className="post-comment-username">
                {eachComment.userId}
                <span className="post-comment-text">{eachComment.comment}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className="post-time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostsDetails
