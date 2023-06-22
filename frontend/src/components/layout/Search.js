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
        <form className="search" onSubmit={searchHandler} >
            <div >
                <input
                    type="text"    
                    placeholder="Search... "
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                
            </div>
        </form>
    )
}

export default Search
