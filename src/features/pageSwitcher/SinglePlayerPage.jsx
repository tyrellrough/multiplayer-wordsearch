
import BackButton from "./BackButton.jsx";
import SinglePlayerGameOptionsSelector from "../gameOptions/SinglePlayerGameOptionsSelector.jsx";
import {useGetWordsByCategoryQuery, } from "../../services/wordSearchAPI.js";

export default function SinglePlayerPage() {



    const {data, error, isLoading}  = useGetWordsByCategoryQuery("fruits")
    //const {data, error, isLoading}  = wordSearchAPI.endpoints.getWordsByCategory.useQuery({'fruits', '3', '10'})

    return (
        <div>
            <p>singleplayer</p>
            <BackButton />
            <SinglePlayerGameOptionsSelector />

        </div>
    )
}
