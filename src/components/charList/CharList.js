import './charList.scss';
import {useState, useEffect, useRef} from "react";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    const {loading, error, getAllCharacters} = useMarvelService();

    const [charactersList, setCharactersList] = useState([]);
    const [uploadCount, setUploadCount] = useState(0);
    const [isAllCharactersUploaded, setIsAllCharactersUploaded] = useState(false);
    useEffect(() => {
        updateCharactersList();
    }, [uploadCount]);
    const onCharactersLoaded = (newCharactersList) => {
        const isAllCharactersUploaded = newCharactersList.length < 9;
        setCharactersList(state => [...state, ...newCharactersList]);
        setIsAllCharactersUploaded(isAllCharactersUploaded);
    }
    const updateCharactersList = () => {
        getAllCharacters(uploadCount)
            .then(onCharactersLoaded)
    }
    const uploadCharactersClick = () => {
        setUploadCount(state => state + 1);
    }
    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null;
    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <View data={charactersList}
                  uploadCharactersClick={uploadCharactersClick}
                  isAllCharactersUploaded={isAllCharactersUploaded}
                  onCharacterSelected=
                      {props.onCharacterSelected}/>

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