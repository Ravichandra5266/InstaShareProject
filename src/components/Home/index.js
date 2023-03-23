import HomeStories from '../HomeStories'

import Posts from '../Posts'

import Header from '../Header'

import InstaShareContext from '../../InstaShareContext/InstaShareContext'

import './index.css'

const Home = () => (
  <InstaShareContext.Consumer>
    {value => {
      const {searchBoxActive} = value
      return (
        <div className="home-page-container">
          <Header />
          <HomeStories />
          <Posts searchBoxActive={searchBoxActive} />
        </div>
      )
    }}
  </InstaShareContext.Consumer>
)

export default Home
