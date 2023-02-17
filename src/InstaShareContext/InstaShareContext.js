import React from 'react'

const InstaShareContext = React.createContext({
  searchValue: '',
  onChangeSearchValue: () => {},
  isSearchIconBtnActive: false,
  onClickToggleSearchIconBtn: () => {},
  onIncrementLikeCount: () => {},
  onDecrementLikesCount: () => {},
  isHamburgerActive: false,
  onClickHamburgerActive: () => {},
  isSearchBoxActive: false,
  onClickSearchBoxActive: () => {},
  isHomeTextActive: false,
  onClickHomeTextActive: () => {},
  isProfileTextActive: false,
  onClickProfileTextActive: () => {},
  //   isSearchTextActive: false,
  //   onClickSearchTextActive,
})
export default InstaShareContext
