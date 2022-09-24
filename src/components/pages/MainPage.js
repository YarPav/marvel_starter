import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from "react";

const MainPage = () => {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const onCharacterSelected = (id) => {
        setSelectedCharacter(id);
    }

    return (
        <>
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
        </>
    );
}

export default MainPage;