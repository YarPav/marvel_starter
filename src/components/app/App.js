import AppHeader from "../appHeader/AppHeader";
import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Spinner from "../spinner/Spinner";
const Page404 = lazy(() => import('../pages/Page404')),
    MainPage = lazy(() => import('../pages/MainPage')),
    ComicsPage = lazy(() => import('../pages/ComicsPage')),
    SingleComicPage = lazy(() => import('../pages/SingleComicPage')),
    SingleCharacterPage = lazy(() => import('../pages/SingleCharacterPage'));


const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='/comics' element={<ComicsPage/>}/>
                            <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                            <Route path='/characters/:comicId' element={<SingleCharacterPage/>}/>
                            <Route path='*' element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    );
}

export default App;