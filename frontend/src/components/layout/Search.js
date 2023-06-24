import React, { useState } from 'react'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          searchHandler(e);
        }
      };

    return (
        <form onSubmit={searchHandler} className='search'>
            <div>
                <input
                    type="text"
                    id="search-field"
                    placeholder="Search..."
                    onChange={(e) => setKeyword(e.target.value)}
                />

            </div>
        </form>
    )
}

export default Search
