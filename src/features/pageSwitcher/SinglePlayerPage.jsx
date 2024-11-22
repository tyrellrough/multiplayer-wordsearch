
import BackButton from "./BackButton.jsx";
import SinglePlayerGameOptionsSelector from "../gameOptions/SinglePlayerGameOptionsSelector.jsx";
import {useGetWordsByCategoryQuery, } from "../../services/wordSearchAPI.js";
import NavigationButton from "./NavigationButton.jsx";

export default function SinglePlayerPage() {

    //const {testobj} = {categoryName: "fruits", numRecords: "3", maxWordSize: "10"};

    //const {data, error, isLoading}  = useGetWordsByCategoryQuery({categoryName: "fruits", numRecords: "3", maxWordSize: "10"})
    //const {data, error, isLoading}  = wordSearchAPI.endpoints.getWordsByCategory.useQuery({'fruits', '3', '10'})

    return (
        <div className="flex flex-col justify-center items-center w-full max-w-screen gap-4">
            <BackButton/>
            <div className="flex flex-col gap-4 rounded-md border-2 border-black  w-1/3">
                <p className="text-4xl pt-4">Single Player</p>
                <SinglePlayerGameOptionsSelector/>
                <NavigationButton text="Start" targetPage={'TODO'}/>
            </div>



        </div>
    )
}
