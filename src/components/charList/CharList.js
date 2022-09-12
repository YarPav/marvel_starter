import './charList.scss';
import {useState, useEffect} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    const service = new MarvelService();

    const [charactersList, setCharactersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);
    const [isAllCharactersUploaded, setIsAllCharactersUploaded] = useState(false);
    useEffect(() => {
        updateCharactersList();
    }, [uploadCount]);

    const onError = () => {
        setLoading(false);
        setError(true);
    }
    const onCharactersLoaded = (charactersList) => {
        const isAllCharactersUploaded = charactersList.length < 9;
        setCharactersList(state => state.slice().concat(charactersList));
        setLoading(false);
        setIsAllCharactersUploaded(isAllCharactersUploaded);
    }
    const updateCharactersList = () => {
        service.getAllCharacters(uploadCount)
            .then(onCharactersLoaded)
            .catch(onError)
    }
    const uploadCharactersClick = () => {
        setUploadCount(state => state + 1);
    }
    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error) ? <View data={charactersList}
                                              uploadCharactersClick={uploadCharactersClick}
                                              isAllCharactersUploaded={isAllCharactersUploaded}
                                              onCharacterSelected=
                                                  {props.onCharacterSelected}/> : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}

        </div>
    );
}

const View = ({data, onCharacterSelected, uploadCharactersClick, isAllCharactersUploaded}) => {
    return (
        <>
            <ul className="char__grid">
                {data.map(item => {
                    const imgStyle = {
                        objectFit: item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                            ? "contain" : "cover"
                    };
                    return (
                        <li className="char__item" key={item.id} onClick={() => onCharacterSelected(item.id)}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )
                })}
            </ul>
            <button className="button button__main button__long"
                    onClick={uploadCharactersClick}
                    style={{display: `${isAllCharactersUploaded ? 'none' : null}`}}
            >
                <div className="inner">load more</div>
            </button>
        </>
    );
}

export default CharList;