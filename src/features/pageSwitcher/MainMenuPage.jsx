import NavigationButton from "./NavigationButton.jsx";
import LoadGameListButton from "../gameMultiplayer/LoadGameListButton.jsx";


export default function MainMenuPage() {



    return (
        <div className="flex flex-col h-[80vh] justify-center">

            <div className="flex flex-col gap-10">
                <p className="text-3xl">Tyrell's Word Search Puzzles</p>
                <div className="flex flex-col m-auto text-2xl gap-3">
                    <NavigationButton text={'Singleplayer'} targetPage={'newSinglePlayer'}/>
                    <NavigationButton text={'New Multiplayer'} targetPage={'newMultiplayer'}/>
                    <NavigationButton text={'Join Multiplayer'} targetPage={'joinMultiplayer'}/>
                    <LoadGameListButton />
                </div>
            </div>


        </div>
    )
}