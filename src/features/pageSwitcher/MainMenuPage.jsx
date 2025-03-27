import NavigationButton from "./NavigationButton.jsx";
import LoadGameListButton from "../gameMultiPlayer/LoadGameListButton.jsx";
import NewMultiplayerButton from "../gameMultiPlayer/NewMultiplayerButton.jsx";


export default function MainMenuPage() {



    return (
        <div className="flex flex-col h-[80vh] justify-center">

            <div className="flex flex-col gap-10">
                <p className="text-5xl text-white font-bold">Tyrell's Word Search Puzzles</p>
                <div className="flex flex-col m-auto text-2xl gap-3">
                    <NavigationButton text={'Singleplayer'} targetPage={'newSinglePlayer'}/>
                    <NewMultiplayerButton />
                    <LoadGameListButton />
                </div>
            </div>


        </div>
    )
}