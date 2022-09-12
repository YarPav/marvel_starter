import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import {useState} from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ErrorBoundary>
                    <RandomChar/>
                </ErrorBoundary>
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharacterSelected={onCharacterSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo characterId={selectedCharacter}/>
                    </ErrorBoundary>
                </div>
            </main>
        </div>
    );
}

export default App;