import React from 'react';

export default function Search({ searchTerm, handleSearchChange, handleSearch }) {

    return (
        <>
            <form className="d-flex align-items-center my-2" role="search" onSubmit={handleSearch}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search for tags"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {/* <button className="btn btn-outline-dark mx-1" type="submit">Search</button> */}
            </form>
        </>
    )
}
