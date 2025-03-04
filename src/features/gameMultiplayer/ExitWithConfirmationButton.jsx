import {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../pageSwitcher/pageSwitcherSlice.js";


export default function ExitWithConfirmationButton(props) {

    const [isExitPending, setIsExitPending] = useState(false);
    const gameGuid = useSelector(state => state.multiPlayerGame.gameGUID);
    const dispatch = useDispatch();

    function ControlledExit() {
        setIsExitPending(true);
    }

    function Exit() {
        console.log("exit", gameGuid);
        props.connection.invoke("RemovePlayer", gameGuid).then(() => {
            //send back to home
            dispatch(changePage("mainMenu"));
            // props.connection.invoke("DeleteGameIfEmpty", gameGuid).then(() => {
            //     dispatch(changePage("mainMenu"));
            // })

        })
    }

    function Stay() {
        setIsExitPending(false);
    }


    return (
        <Fragment>
            <button onClick={() => ControlledExit()}>Exit Game</button>

                <div className={"flex justify-center mt-10"}>
                    {isExitPending ?
                        <div className={"absolute text-4xl border p-10 bg-opacity-90 rounded-lg bg-[#ffffff] z-0"}>
                            <div className={""}>
                                <p>Are you sure you want to exit this game?</p>
                                <button className={"bg-wordSearch-red"} onClick={() => Exit()}>Exit</button>
                                <button className={"bg-wordSearch-green"} onClick={() => Stay()}>Stay</button>
                            </div>

                        </div>
                        : <Fragment></Fragment>}
                </div>





        </Fragment>

    );
}