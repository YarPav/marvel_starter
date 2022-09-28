import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from "../../services/UseMarvelService";
import {useState} from "react";
import {Link} from "react-router-dom";

import './characterSearchForm.scss';


const CharacterSearchForm = () => {
    const {searchCharacter, loading} = useMarvelService();
    const [character, setCharacter] = useState(null);

    const onCharacterLoaded = (character) => {
        setCharacter(character);
    }
    return (
        <>
            <div className="char__search-form">
                <Formik
                    initialValues={
                        {
                            name: ''
                        }
                    }
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('This field is required!')
                    })}
                    onSubmit={
                        values => searchCharacter(values.name).then(onCharacterLoaded)
                    }
                >
                    <Form>
                        <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                        <div className="char__search-wrapper">
                            <Field
                                id='name'
                                type='text'
                                name='name'
                            />
                            <button
                                type='submit'
                                className="button button__main"
                                disabled={loading}>
                                <div className="inner">find</div>
                            </button>
                        </div>
                        <ErrorMessage className='char__search-error' component='div' name='name'/>
                    </Form>
                </Formik>

                {
                    character === 'none' && character !== '' ?
                    <div className="char__search-error">
                        The character was not found. Check the name and try again
                    </div>
                    : null
                }
                {
                    character && character !== 'none' ?
                        <div className="char__search-wrapper">
                            <div className="char__search-success">There is! Visit {character?.name} page?</div>
                            <Link to={`/characters/${character?.id}`} className="button button__secondary">
                                <div className="inner">TO PAGE</div>
                            </Link>
                        </div>
                        : null
                }


            </div>
        </>
    );
}

export default CharacterSearchForm;