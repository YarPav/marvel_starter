import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import SingleComic from "../singleComic/SingleComic";
import {useState} from "react";

const ComicsPage = () => {
    return (
        <>
            <ErrorBoundary>
                <ComicsList/>
            </ErrorBoundary>
        </>
    );
}

export default ComicsPage;