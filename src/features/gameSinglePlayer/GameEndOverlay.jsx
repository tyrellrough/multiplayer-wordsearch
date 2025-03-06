import HomeButton from "../pageSwitcher/HomeButton.jsx";
import NavigationButton from "../pageSwitcher/NavigationButton.jsx";

export default function GameEndOverlay(props) {

    if(props.isGameComplete === true) {
        return (
            <div className={"absolute text-4xl border p-10 bg-opacity-90 rounded-lg bg-[#ffffff] z-0"}>
                <p>Game Complete!</p>
                <HomeButton />
                <NavigationButton text={'New Single Player'} targetPage={'newSinglePlayer'}/>
            </div>
        )
    }
}