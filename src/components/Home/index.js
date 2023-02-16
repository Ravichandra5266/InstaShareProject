import HomeStories from '../HomeStories'

import Posts from '../Posts'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-page-container">
    <Header />
    <HomeStories />
    <Posts />
  </div>
)

export default Home
