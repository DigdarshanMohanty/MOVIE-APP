
const Search = ({SearchTerm,setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src="search.svg" alt="search" />
      <input
        type="text"
        value={SearchTerm}
        placeholder="Search for a movie seamlessly"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
    </div>
  )
}

export default Search