import React from 'react'

const InstaShareContext = React.createContext({
  isHamburgerActive: false,
  onClickHamburgerActive: () => {},
  searchBoxActive: false,
  onClickSearchBoxActive: () => {},
})
export default InstaShareContext
