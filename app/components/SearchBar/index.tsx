import React from "react"
import Search from "../icons/Search"

const SearchBar = (props) => {
  const { setSearchTerm } = props
  return (
    <form className="form" onSubmit={e => e.preventDefault()}>
      <label className="inputContainer">
        <input
          className="form"
          id="textInput"
          placeholder="Search..."
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
          name="search"
        />
        <Search />
        <hr />
      </label>
    </form>
  )
}

export default SearchBar