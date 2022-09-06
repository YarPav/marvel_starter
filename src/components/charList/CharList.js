import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";

class CharList extends Component {
    componentDidMount() {
        this.updateCharactersList();
    }
    service = new MarvelService();
    state = {
        charactersList: []
    }
    onCharactersLoaded = (charactersList) => {
        this.setState({
            charactersList
        });
    }
    updateCharactersList = () => {
        this.service.getAllCharacters()
            .then(this.onCharactersLoaded)
    }
    render() {
        return (
            <div className="char__list">
                <ul className="char__grid">
                    {this.state.charactersList.map(item => {
                        const imgStyle = {
                            objectFit: item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                                ? "contain" : "cover"
                        };
                        return (
                                <li className="char__item" key={item.id}>
                                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                                    <div className="char__name">{item.name}</div>
                                </li>
                            )
                    })}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;