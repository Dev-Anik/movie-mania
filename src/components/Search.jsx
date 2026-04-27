import React from 'react'

const Search = ({ searchItem, setSearchItem }) => {
    return (
        <div className='search'>
            <div>
                <img src="./src/assets/search.svg" alt="Search Icon" />
                <input
                    type="text"
                    placeholder='Search through thousands of movies'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)} />
            </div>
        </div>
    )
}

export default Search