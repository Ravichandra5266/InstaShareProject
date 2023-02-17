import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Header from '../Header'

import PostsDetails from '../PostsDetails'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
  empty: 'Empty',
}

class SearchPosts extends Component {
  state = {
    searchPostsApiStatus: apiStatusConstant.initial,
    searchPostsList: [],
  }

  componentDidMount() {
    this.getSearchPostsData()
  }

  getSearchPostsData = async () => {
    this.setState({searchPostsApiStatus: apiStatusConstant.inProgress})
    const {searchValue} = this.props
    const SearchPostsApi = `https://apis.ccbp.in/insta-share/posts?search=${searchValue}`
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const responseUrl = await fetch(SearchPostsApi, options)
    // console.log(responseUrl)
    if (responseUrl.ok) {
      const responseData = await responseUrl.json()
      //   console.log(responseData)
      if (responseData.posts.length === 0) {
        this.setState({searchPostsApiStatus: apiStatusConstant.empty})
      } else {
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
          searchPostsApiStatus: apiStatusConstant.success,
          searchPostsList: updatedData,
        })
      }
    } else {
      this.setState({searchPostsApiStatus: apiStatusConstant.failure})
    }
  }

  renderSearchPostsLoadingView = () => (
    <div className="searchPosts-loading-container">
      <Loader type="TailSpin" color="blue" height={50} width={50} />
    </div>
  )

  onClickIncrementLikeCount = async value => {
    console.log(value)
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
        searchPostsList: prevState.searchPostsList.map(eachPost => {
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
    console.log(value)
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
        searchPostsList: prevState.searchPostsList.map(eachPost => {
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

  renderSearchPostsSuccessView = () => {
    const {searchPostsList} = this.state

    return (
      <>
        <h1 className="searchPosts-heading">Search Results</h1>
        <ul className="searchPosts-list-container">
          {searchPostsList.length > 0 &&
            searchPostsList.map(eachPost => (
              <PostsDetails
                eachPost={eachPost}
                key={eachPost.postId}
                onClickIncrementLikeCount={this.onClickIncrementLikeCount}
                onClickDecrementUnlikeCount={this.onClickDecrementUnlikeCount}
              />
            ))}
        </ul>
      </>
    )
  }

  onClickConnectToSearchPosts = () => {
    this.getSearchPostsData()
  }

  renderSearchPostsFailureView = () => (
    <div className="searchPosts-failure-container">
      <img
        src="https://res.cloudinary.com/dnmaskg3n/image/upload/v1674886994/Group_7737_ipxqpg.png"
        alt="failure view"
        className="searchPosts-failure-img"
      />
      <p className="searchPosts-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="searchPosts-failure-btn"
        onClick={this.onClickConnectToSearchPosts}
      >
        Try again
      </button>
    </div>
  )

  renderSearchPostsEmptyView = () => (
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
  )

  renderSearchPosts = () => {
    const {searchPostsApiStatus} = this.state
    let showCurrentResults = null
    switch (searchPostsApiStatus) {
      case apiStatusConstant.success:
        showCurrentResults = this.renderSearchPostsSuccessView()
        break
      case apiStatusConstant.failure:
        showCurrentResults = this.renderSearchPostsFailureView()
        break
      case apiStatusConstant.inProgress:
        showCurrentResults = this.renderSearchPostsLoadingView()
        break
      case apiStatusConstant.empty:
        showCurrentResults = this.renderSearchPostsEmptyView()
        break
      default:
        showCurrentResults = null
        break
    }
    return showCurrentResults
  }

  render() {
    return (
      <div className="searchPosts-page-container">
        <Header />
        {this.renderSearchPosts()}
      </div>
    )
  }
}

export default SearchPosts
