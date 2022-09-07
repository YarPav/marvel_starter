import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

class CharInfo extends Component {
    componentDidMount() {
        this.updateChar();
    }
    componentDidUpdate(prevProps) {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateChar();
        }
    }

    marvelService = new MarvelService();
    state = {
        character: null,
        loading: false,
        error: false
    }
    onCharacterLoaded = (character) => {
        this.setState({
            character,
            loading: false
        });
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }
    updateChar = () => {
        // this.setState({loading: true});
        const id = this.props.characterId;
        // id = 1017100;
        if (!id) {
            return;
        }
        this.marvelService.getCharacter(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError)
    }
    render() {
        const {character, loading, error} = this.state;
        const skeleton = character || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error || !character) ? <View character={character}/> : null;
        return (
            <div className="char__info"
            >
                {errorMessage}
                {spinner}
                {skeleton}
                {content}
            </div>
        )
    }
}

const View = ({character}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = character,
    imgStyle = {
        objectFit: thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ? "contain" : "cover"
    };
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics"><p>{comics.length === 0 ? 'This character has no comics' : 'Comics:'}</p></div>
            <ul className="char__comics-list">
                {comics.map((item, index) => {
                    if (index > 9) {
                        return null;
                    }
                    return (
                        <li className="char__comics-item" key={index}>
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default CharInfo;