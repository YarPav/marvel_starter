import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
    _apiKey = 'apikey=1135e1038c7027996b56f1e58cd15152',
    _itemsOnPage = 9;

    const getAllCharacters = async (uploadCount) => {
         let offset = uploadCount * _itemsOnPage;
         const res = await request
         (`${_apiBase}characters?offset=${offset}&limit=9&${_apiKey}`);
         return res.data.results.map(_transformCharacter);
    }
    const getCharacter = async (id) => {
        const res = await request
        (`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (character) => {
         return {
             id: character.id,
             name: character.name,
             description: character.description,
             thumbnail: character.thumbnail.path + '.' + character.thumbnail.extension,
             homepage: character.urls[0].url,
             wiki: character.urls[1].url,
             comics: character.comics.items
         }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError};
}

export default useMarvelService;