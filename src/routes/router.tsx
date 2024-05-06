import {Home, Popular, Movie, TopRated} from '../pages';
import { RouteObject, createBrowserRouter } from "react-router-dom";

import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
import { ROUTES } from "./constants";
import { NowPlaying } from '../pages/NowPlaying';
import { MyFavorites } from '../pages/MyFavorites';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />,
        children: [
            { path: ROUTES.HOME,            element: <Home /> },
            { path: ROUTES.POPULAR,         element: <Popular />},
            { path: `${ROUTES.MOVIE}:id`,   element: <Movie />},  // For Movies details
            { path: ROUTES.TOP_RATED,       element: <TopRated />},
            { path: ROUTES.NOW_PLAYING,     element: <NowPlaying/>},
            { path: ROUTES.MY_FAVORITES,    element: <MyFavorites />},  
        ]
    }, 
    // In case of using a public router
    // {
    //     path: '/', element: <PublicRouter />,
    //     children: [
    //         { path: "/", element: <Home /> },
    //     ]
    // }
]

export const router = createBrowserRouter(routes);