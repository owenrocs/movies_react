import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../routes/constants'

export const Header = () => {

    const location = useLocation();

    const getLinkStyle = (path: string) : string => {
        return location.pathname === path 
            ? 'block mt-4 lg:inline-block lg:mt-0 text-semibold text-[#E50914]' 
            : 'block mt-4 lg:inline-block lg:mt-0 text-white hover:text-[#E50914]';
    }
    
    return (
        <header className="fixed top-0 left-0 w-full z-50">
            <nav className="flex items-center justify-between bg-[#141414] p-4 opacity-90">
                <div className="flex-grow">
                    {/* Empty div can be used to push content to the right */}
                    <div className="flex justify-start ">
                        <div className="font-bebas text-5xl pl-16 text-[#B20710]">
                                NETFLIX
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end px-16">
                    <div className="text-sm">

                            <Link to={ROUTES.HOME} className={`${getLinkStyle(ROUTES.HOME)} mr-6`}>
                                Home
                            </Link>
                            <Link to={ROUTES.POPULAR} className={`${getLinkStyle(ROUTES.POPULAR)} mr-6`}>
                                Popular
                            </Link>
                            <Link to={ROUTES.TOP_RATED} className={`${getLinkStyle(ROUTES.TOP_RATED)} mr-6`}>
                                Top Rated
                            </Link>
                            <Link to={ROUTES.NOW_PLAYING} className={`${getLinkStyle(ROUTES.NOW_PLAYING)} mr-6`}>
                                Now Playing
                            </Link>
                            <Link to={ROUTES.MY_FAVORITES} className={`${getLinkStyle(ROUTES.MY_FAVORITES)}`}>
                                My Favorites
                            </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
  };

export default Header;