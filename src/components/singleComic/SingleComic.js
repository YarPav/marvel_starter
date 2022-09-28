import '../pages/singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from "../../services/UseMarvelService";
import {useState, useEffect} from "react";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const SingleComic = (props) => {
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [props.comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    const updateComic = () => {
        clearError();
        const id = props.comicId;
        // id = 1017100;
        if (!id) {
            return;
        }
        getComic(id)
            .then(onComicLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null,
        spinner = loading ? <Spinner/> : null,
        content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {name, description, thumbnail, price, lang, pageCount} = comic,
        imgStyle = {
            objectFit: thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                ? "contain" : "cover"
        };
    return (
        <>
            <div className="single-comic">
                <img src={thumbnail} alt={name} style={imgStyle} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{name}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount} pages</p>
                    <p className="single-comic__descr">Language: {lang}</p>
                    <div className="single-comic__price">{price}$</div>
                </div>
                <a href="#" className="single-comic__back">Back to all</a>
            </div>
        </>
    );
}

export default SingleComic;