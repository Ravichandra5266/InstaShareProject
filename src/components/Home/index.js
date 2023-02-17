import HomeStories from '../HomeStories'

import Posts from '../Posts'

import Header from '../Header'

import SearchPosts from '../SearchPosts'

import InstaShareContext from '../../InstaShareContext/InstaShareContext'

import './index.css'

const Home = () => (
  <InstaShareContext.Consumer>
    {value => {
      const {searchValue, isSearchIconBtnActive} = value

      /* console.log(isSearchIconBtnActive) */

      return (
        <div className="home-page-container">
          {isSearchIconBtnActive ? (
            <SearchPosts searchValue={searchValue} />
          ) : (
            <>
              <Header />
              <HomeStories />
              <Posts />
            </>
          )}
        </div>
      )
    }}
  </InstaShareContext.Consumer>
)

export default Home
