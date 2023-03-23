import {Component} from 'react'

import {TailSpin} from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import PostsDetails from '../PostsDetails'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Posts extends Component {
  state = {
    postsApiStatus: apiStatusConstant.initial,
    postsListData: [],
    searchValue: '',
  }

  componentDidMount() {
    this.getPostsData()
  }

  getPostsData = async () => {
    this.setState({postsApiStatus: apiStatusConstant.inProgress})
    const {searchValue} = this.state
    const PostsApi = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const token = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(PostsApi, option)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      const updatedData = responseData.posts.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        isLikePost: false,
      }))
      //   console.log(updatedData)
      this.setState({
        postsApiStatus: apiStatusConstant.success,
        postsListData: updatedData,
      })
    } else {
      this.setState({postsApiStatus: apiStatusConstant.failure})
    }
  }

  renderPostsLoadingView = () => (
    <div className="posts-loading-container">
      <TailSpin type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  onClickIncrementLikeCount = async value => {
    // console.log(value)
    const PostLikeApi = `https://apis.ccbp.in/insta-share/posts/${value}/like`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      body: JSON.stringify({like_status: true}),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(PostLikeApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      this.setState(prevState => ({
        postsListData: prevState.postsListData.map(eachPost => {
          if (eachPost.postId === value) {
            return {
              ...eachPost,
              isLikePost: true,
              likesCount: eachPost.likesCount + 1,
            }
          }
          return eachPost
        }),
      }))
    }
  }

  onClickDecrementUnlikeCount = async value => {
    // console.log(value)
    const PostLikeApi = `https://apis.ccbp.in/insta-share/posts/${value}/like`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      body: JSON.stringify({like_status: false}),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(PostLikeApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      this.setState(prevState => ({
        postsListData: prevState.postsListData.map(eachPost => {
          if (eachPost.postId === value) {
            return {
              ...eachPost,
              isLikePost: false,
              likesCount: eachPost.likesCount - 1,
            }
          }
          return eachPost
        }),
      }))
    }
  }

  renderPostsSuccessView = () => {
    const {postsListData} = this.state
    return (
      <ul className="posts-list-container">
        {postsListData.length > 0 ? (
          postsListData.map(eachPost => (
            <PostsDetails
              eachPost={eachPost}
              key={eachPost.postId}
              onClickIncrementLikeCount={this.onClickIncrementLikeCount}
              onClickDecrementUnlikeCount={this.onClickDecrementUnlikeCount}
            />
          ))
        ) : (
          <div className="searchNot-found-container">
            <img
              src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1675684039/Group_i0rx3y.png"
              alt="search not found"
              className="search-not-found-img"
            />
            <h1 className="searchNot-found-title">Search Not Found</h1>
            <p className="searchNot-found-para">
              Try different keyword or search again
            </p>
          </div>
        )}
      </ul>
    )
  }

  onClickConnectToPosts = () => {
    this.getPostsData()
  }

  renderPostsFailureView = () => (
    <div className="posts-failure-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
        alt="failure view"
        className="posts-failure-img"
      />
      <p className="posts-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="posts-failure-btn"
        onClick={this.onClickConnectToPosts}
      >
        Try again
      </button>
    </div>
  )

  renderPosts = () => {
    const {postsApiStatus} = this.state
    let showCurrentResults = null
    switch (postsApiStatus) {
      case apiStatusConstant.success:
        showCurrentResults = this.renderPostsSuccessView()
        break
      case apiStatusConstant.failure:
        showCurrentResults = this.renderPostsFailureView()
        break
      case apiStatusConstant.inProgress:
        showCurrentResults = this.renderPostsLoadingView()
        break
      default:
        showCurrentResults = null
        break
    }
    return showCurrentResults
  }

  onChangeSearchValue = event => {
    this.setState({searchValue: event.target.value}, this.getPostsData)
  }

  render() {
    const {searchValue} = this.state
    const {searchBoxActive} = this.props

    return (
      <div className="posts-page-container">
        {searchBoxActive && (
          <div className="searchBoxContainer">
            <input
              type="search"
              placeholder="Search Caption"
              className="searchInput"
              value={searchValue}
              onChange={this.onChangeSearchValue}
            />
            <button type="button" className="search-icon-btn">
              <FaSearch className="search-icon" />
            </button>
          </div>
        )}
        {this.renderPosts()}
      </div>
    )
  }
}

export default Posts
