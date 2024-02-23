import React from 'react'
import Search from './Search'

const Header = () => {
    return (
        <>
            <nav className='header row sticky-top'>
                <img src="/assets/logo.png" alt='logo' className='logo' />

                <div className='search_filter'>
                    <Search />
                </div>
                <span class="material-symbols-outlined web_logo">
                    account_circle
                </span>
            </nav>
        </>
    )
}

export default Header