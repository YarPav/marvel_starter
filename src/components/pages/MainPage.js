import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {useState} from "react";
import CharacterSearchForm from "../characterSearchForm/CharacterSearchForm";

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
                    <div style={
                        {
                            position: 'sticky',
                            right: 0,
                            top: 0
                        }
                    }>
                        <CharInfo characterId={selectedCharacter}/>
                        <CharacterSearchForm/>
                    </div>
                </ErrorBoundary>
            </div>
        </>
    );
}

export default MainPage;