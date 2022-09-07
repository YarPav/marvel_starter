class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=1135e1038c7027996b56f1e58cd15152';
    _itemsOnPage = 9;
     getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async (uploadCount) => {
         let offset = uploadCount * this._itemsOnPage;
         const res = await this.getResource
         (`${this._apiBase}characters?offset=${offset}&limit=9&${this._apiKey}`);
         return res.data.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource
        (`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (character) => {
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
}

export default MarvelService;