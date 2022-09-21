import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [selectedComic, setSelectedComic] = useState(null);
    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }
    const onComicSelected = (id) => {
        setSelectedComic(id);
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                {/*<ErrorBoundary>*/}
                {/*    <RandomChar/>*/}
                {/*</ErrorBoundary>*/}
                {/*<div className="char__content">*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharList onCharacterSelected={onCharacterSelected}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo characterId={selectedCharacter}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                <ErrorBoundary>
                    <ComicsList onComicSelected={onComicSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <SingleComic comicId={selectedComic}/>
                </ErrorBoundary>
            </main>
        </div>
    );
}

export default App;