import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey = 'apikey=1135e1038c7027996b56f1e58cd15152',
    _charactersOnPage = 9,
    _comicsOnPage = 8;

    const getAllCharacters = async (uploadCount) => {
         let offset = uploadCount * _charactersOnPage;
         const res = await request
         (`${_apiBase}characters?offset=${offset}&limit=${_charactersOnPage}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getAllComics = async (uploadCount) => {
        let offset = uploadCount * _comicsOnPage;
        const res = await request
        // ('https://gateway.marvel.com:443/v1/public/comics?limit=8&apikey=1135e1038c7027996b56f1e58cd15152');
        (`${_apiBase}comics?offset=${offset}&limit=${_comicsOnPage}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }
    const getCharacter = async (id) => {
        const res = await request
        (`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const getComic = async (id) => {
        const res = await request
        (`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
        const data = {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items
        }
        // console.log(data);
         return data;
    }
    const _transformComic = (comic) => {
        return {
            id: comic.id,
            name: comic.title,
            description: comic.description,
            pageCount: comic.pageCount,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price,
            lang: comic.textObject?.[0].language
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComic, clearError};
}

export default useMarvelService;