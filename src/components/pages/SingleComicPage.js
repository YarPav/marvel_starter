import './singleComic.scss';
import useMarvelService from "../../services/UseMarvelService";
import {useState, useEffect} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const SingleComic = (props) => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const onComicLoaded = (comic) => {
        setComic(comic);
    }
    const updateComic = () => {
        clearError();
        const id = comicId;
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
                <Link to='/comics'  className="single-comic__back">Back to all</Link>
            </div>
        </>
    );
}

export default SingleComic;