import BackButton from "./BackButton.jsx";
import SinglePlayerGameOptionsSelector from "../gameOptions/SinglePlayerGameOptionsSelector.jsx";
import NavigationButton from "./NavigationButton.jsx";

export default function SinglePlayerPage() {

    return (
        <div className="h-5/6 flex flex-col justify-center items-center max-w-screen">

                <div className="flex flex-col gap-4 border p-5 border-black rounded-md bg-white">
                    <div className="flex">
                        <BackButton/>
                    </div>

                    <p className="text-4xl pt-4">Single Player</p>
                    <SinglePlayerGameOptionsSelector/>
                    <NavigationButton text="Start" targetPage={'singlePlayerGame'}/>
                </div>



        </div>
    )
}
