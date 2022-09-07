import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    componentDidMount() {
        this.updateCharactersList();
    }
    componentDidUpdate(prevProps, prevState) {

        if (this.state.uploadCount !== prevState.uploadCount) {
            this.updateCharactersList();
            console.log('update', this.state.uploadCount);
        }
    }

    service = new MarvelService();
    state = {
        charactersList: [],
        loading: true,
        error: false,
        uploadCount: 0,
        isAllCharactersUploaded: false
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        });
    }
    onCharactersLoaded = (charactersList) => {
        const isAllCharactersUploaded = charactersList.length < 9;
        this.setState(state => ({
            charactersList:  state.charactersList.slice().concat(charactersList),
            loading: false,
            isAllCharactersUploaded
        }));
    }
    updateCharactersList = () => {
        this.service.getAllCharacters(this.state.uploadCount)
            .then(this.onCharactersLoaded)
            .catch(this.onError)
    }
    uploadCharactersClick = () => {
        this.setState(state => ({
            uploadCount: state.uploadCount + 1
        }));
    }
    render() {
        const {charactersList, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null,
            spinner = loading ? <Spinner/> : null,
            content = !(loading || error) ? <View data={charactersList}
                                                  uploadCharactersClick={this.uploadCharactersClick}
                                                  isAllCharactersUploaded={this.state.isAllCharactersUploaded}
                                                  onCharacterSelected=
                                                      {this.props.onCharacterSelected}/> : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}

            </div>
        )
    }
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