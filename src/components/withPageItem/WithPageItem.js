import {useParams} from "react-router";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/UseMarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const withPageItem = (BaseComponent, getData) => {
    return (props) => {
        const {comicId} = useParams();
        const [item, setItem] = useState(null);
        const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            switch (getData) {
                case 'getComic':
                    updateItem(getComic)
                    break;
                case 'getCharacter':
                    updateItem(getCharacter)
                    break;
            }
        }, [comicId]);

        const onItemLoaded = (item) => {
            console.log(item);
            setItem(item);
        }
        const updateItem = (func) => {
            clearError();
            const id = comicId;
            if (!id) {
                return;
            }
             func(id)
                .then(onItemLoaded)
        }

        const errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error || !item) ? <BaseComponent data={item}/> : null;

        return (
            <>
                {errorMessage}
                {spinner}
                {content}
                {/*<BaseComponent data={item}/>*/}
            </>
        )
    }
}

export default withPageItem;