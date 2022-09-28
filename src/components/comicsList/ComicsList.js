import './comicsList.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const ComicsList = (props) => {
    const {loading, error, getAllComics} = useMarvelService();
    const [comicsList, setComicsList] = useState([]);
    const [uploadCount, setUploadCount] = useState(0);
    const [isAllComicsUploaded, setIsAllComicsUploaded] = useState(false);
    useEffect(() => {
        updateComicsList()
    }, [uploadCount]);
    const onComicsLoaded = (comicsList) => {
        const isAllComicsUploaded = comicsList.length < 8;
        setComicsList(state => state.slice().concat(comicsList));
        setIsAllComicsUploaded(isAllComicsUploaded);
    }
    const updateComicsList = () => {
        getAllComics(uploadCount)
            .then(onComicsLoaded)
    }
    const uploadComicsClick = () => {
        setUploadCount(state => state + 1);
    }


    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error) ? <View data={comicsList}
                                              uploadCharactersClick={uploadComicsClick}
                                              isAllCharactersUploaded={isAllComicsUploaded}
                                              onCharacterSelected=
                                                  {props.onCharacterSelected}/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <View data={comicsList}
                  uploadComicsClick={uploadComicsClick}
                  isAllCharactersUploaded={isAllComicsUploaded}
                  onComicSelected=
                      {props.onComicSelected}/>
        </div>
    );
}
    const View = ({data, uploadComicsClick, isAllCharactersUploaded}) => {
        return (
            <>
                <ul className="comics__grid">
                    {data.map((item, index) => {
                        const imgStyle = {
                            objectFit: item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                                ? "contain" : "cover"
                        };
                        return (
                            <li className="comics__item" key={index}>
                                <Link to={`/comics/${item.id}`}>
                                    <img src={item.thumbnail} alt={item.name} style={imgStyle} className="comics__item-img"/>
                                    <div className="comics__item-name">{item.name}</div>
                                    <div className="comics__item-price">{item.price} $</div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <button className="button button__main button__long"
                        onClick={uploadComicsClick}
                        style={{display: `${isAllCharactersUploaded ? 'none' : null}`}}
                >
                    <div className="inner">load more</div>
                </button>
            </>
        );
}

export default ComicsList;