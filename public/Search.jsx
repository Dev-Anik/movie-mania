import React from 'react'
import searchIcon from '/search.svg'

const Search = ({ searchItem, setSearchItem }) => {
    return (
        <div className='search'>
            <div>
                <img src={searchIcon} alt="Search Icon" />
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