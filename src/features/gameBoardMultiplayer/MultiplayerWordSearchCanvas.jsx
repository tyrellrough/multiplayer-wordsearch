import {useEffect, useRef} from "react";

import ArrayHelperFunctions from "../gameBoard/ArrayHelperFunctions.js";
import {useSelector} from "react-redux";
import WSRendererMultiplayer from "./WSRendererMultiplayer.js";
import Selection from "../gameBoard/Selection.js";
import CardinalDirections from "../gameBoard/CardinalDirections.js";


export default function MultiplayerWordSearchCanvas(props) {
    const canvasRef = useRef(null);
    const renderRef = useRef(null);
    const selectionRef = useRef(new Selection());
    const boardRef = useRef(null);
    const currentPlayerColour = useSelector(state => state.multiPlayerGame.currentPlayerColour);
    const foundSoundRef = useRef(new Audio("/src/audio/winAudio.mp3"))
    const isAudioTurnedOn = useRef(true);

    let clickX = 0;
    let clickY = 0;
    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);
    const isAudioOn = useSelector(state => state.gameAudio.isOn);

    useEffect(() => {

        isAudioTurnedOn.current = isAudioOn;
    }, [isAudioOn]);


    function getBoardCells() {
        props.connection.invoke("GetBoard", gameGUID).then(boardResult => {
            boardRef.current = boardResult;
            renderRef.current = new WSRendererMultiplayer(canvasRef.current, canvasRef.current.getContext('2d'), boardRef.current.boardWidth);
            renderRef.current.drawBoard(boardRef.current.cells);
            //setBoard(boardResult);
            //console.log(boardResult);
        })
    }

    function playWordFoundSound() {
       // console.log("isAUdioturned on play", isAudioTurnedOn);
        if(isAudioTurnedOn.current) {
            console.log("playing sound")
            foundSoundRef.current.play().then();
        } else {
            //console.log("not playing sound")
        }

    }

    props.connection.on("RedrawBoard", cells => {
        redrawBoard(cells);
    })

    function redrawBoard(newCells) {
      //  console.log("redrawing board forced by server")
        boardRef.current.cells = newCells;
        renderRef.current.drawBoard(boardRef.current.cells);
       // console.log(boardRef.current.cells);
        canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);
        canvasRef.current.removeEventListener("touchmove", handleCanvasTouchMove);
    }

    useEffect(() => {
       // console.log("ws mounted");

        getBoardCells();
        window.addEventListener('resize', handleResize);


        canvasRef.current.addEventListener('touchstart', handleTouchStart);
        canvasRef.current.addEventListener('touchend', handleMouseUp);
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        //
        // canvasRef.current.addEventListener('touchstart', handleTouchStart);
        // canvasRef.current.addEventListener('touchend', handleMouseUp);
    }, []);

    function handleResize() {
        renderRef.current.drawBoard(boardRef.current.cells);
    }



    function handleMouseDown(e) {
        console.log("mousedown");
        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);

       // console.log("mousedown ", currentCell1D);

        //selectionRef.current = new Selection();
        //set the selction start index
        selectionRef.current.startIndex = currentCell1D;
        selectionRef.current.startIndex2D = currentCell2D;

        console.log("startindex1d", currentCell1D);
        console.log("startindex2d", currentCell2D);

        //get the valid directions
        selectionRef.current.validDirections = ArrayHelperFunctions.getValidDirections(currentCell1D, boardRef.current.boardWidth,
            boardRef.current.boardWidth, boardRef.current.topLeftIndex, boardRef.current.topRightIndex, boardRef.current.bottomLeftIndex,
            boardRef.current.bottomRightIndex, boardRef.current.boardWidth - 1, boardRef.current.boardWidth - 1);

        //for every valid direction get valid cells in each direction and map them.
        selectionRef.current.intialiseValidDirMaps(boardRef.current.boardWidth);
        selectionRef.current.initaliseStartCellPos(renderRef.current.getBoardCellHeight());
        canvasRef.current.addEventListener('mousemove', handleCanvasMouseDownMove);

    }

    function handleTouchStart(e) {
        console.log("touchstart");
        const currentCell2D = getTouchCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);



        //selectionRef.current = new Selection();
        //set the selction start index
        selectionRef.current.startIndex = currentCell1D;
        selectionRef.current.startIndex2D = currentCell2D;
        //get the valid directions
        selectionRef.current.validDirections = ArrayHelperFunctions.getValidDirections(currentCell1D, boardRef.current.boardWidth,
            boardRef.current.boardWidth, boardRef.current.topLeftIndex, boardRef.current.topRightIndex, boardRef.current.bottomLeftIndex,
            boardRef.current.bottomRightIndex, boardRef.current.boardWidth - 1, boardRef.current.boardWidth - 1);

        //for every valid direction get valid cells in each direction and map them.
        selectionRef.current.intialiseValidDirMaps(boardRef.current.boardWidth);
        selectionRef.current.initaliseStartCellPos(renderRef.current.getBoardCellHeight());
        canvasRef.current.addEventListener('touchmove', handleCanvasTouchMove);
       // console.log("touch start")
    }

    function handleCanvasTouchMove(e) {
        console.log("touchmove start")
        //get cell mouse is over
        const currentCell2D = getTouchCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);



        //get mouse direction with initial cell click as center.
        selectionRef.current.direction = CardinalDirections.calcDirectionFromTouchPos(e, canvasRef, selectionRef.current.startCellMiddleYPos, selectionRef.current.startCellMiddleXPos);
        //const currentDirection = selectionRef.current.direction;
       // console.log(selectionRef.current);

        //check if selected cell is valid in terms of direction
        let isCellAlongValidDir;
        if(selectionRef.current.validDirMap.has(selectionRef.current.direction)) {
            isCellAlongValidDir = selectionRef.current.validDirMap.get(selectionRef.current.direction).includes(currentCell1D);
        }

        //console.log(`is cell valid dir ${isCellAlongValidDir}`)

        //set the selection end index to the cell number only if valid cellnumber
        if(isCellAlongValidDir) {
            selectionRef.current.endIndex = currentCell1D;
            selectionRef.current.endIndex2D = currentCell2D;
            selectionRef.current.calcEndCellMiddlePos(renderRef.current.getBoardCellHeight());

            renderRef.current.drawSelection(selectionRef.current, boardRef.current.cells, currentPlayerColour);
        }
    }


    function handleCanvasMouseDownMove(e) {
        //get cell mouse is over
        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);

        //get mouse direction with initial cell click as center.
        selectionRef.current.direction = CardinalDirections.calcDirectionFromPos(e, canvasRef, selectionRef.current.startCellMiddleYPos, selectionRef.current.startCellMiddleXPos);

        //const currentDirection = selectionRef.current.direction;
      // console.log(currentDirection);

        //check if selected cell is valid in terms of direction
        let isCellAlongValidDir;
        if(selectionRef.current.validDirMap.has(selectionRef.current.direction)) {
            isCellAlongValidDir = selectionRef.current.validDirMap.get(selectionRef.current.direction).includes(currentCell1D);
        }

        //console.log(`is cell valid dir ${isCellAlongValidDir}`)

        //set the selection end index to the cell number only if valid cellnumber
        if(isCellAlongValidDir) {
            selectionRef.current.endIndex = currentCell1D;
            selectionRef.current.endIndex2D = currentCell2D;
            selectionRef.current.calcEndCellMiddlePos(renderRef.current.getBoardCellHeight());

            renderRef.current.drawSelection(selectionRef.current, boardRef.current.cells, currentPlayerColour);
        }
        //console.log(selectionRef.current)
    }

    function handleMouseUp(e) {


        // Found word
        // 1. Check with server to see if selection is a word being searched for.
        // 2. Server does the checks.
        // 3. Server highlights the word using the player's colour.
        // 4. Server tells all clients to redraw the board.
        // 5. Server tells all clients to cross out the found word in the words list.
        // 5. Mousemove event listener removed.

        // Not found word
        // 1. Check with server.
        // 2. Server determines not a valid word.
        // 3. This client redraws the board.
        // 4. Mousemove event listener removed.

        canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);
        canvasRef.current.removeEventListener("touchmove", handleCanvasTouchMove);

        props.connection.invoke("CheckSelectionValid", gameGUID, selectionRef.current.startIndex,
            selectionRef.current.endIndex, currentPlayerColour, selectionRef.current.direction).then(foundWord => {
               // console.log("foundword", foundWord)
            if (!foundWord) {
                renderRef.current.drawBoard(boardRef.current.cells);


            } else {
                playWordFoundSound(isAudioOn);
            }
            canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);

        });

    }

    function getTouchCurrentCell(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        let boardCellHeight = renderRef.current.getBoardCellHeight();
        const cellX = Math.floor(x / boardCellHeight);
        const cellY = Math.floor(y / boardCellHeight);
        return [cellY, cellX];
    }

    function getMouseCurrentCell(e) {
        let rect = canvasRef.current.getBoundingClientRect();

        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;



        let boardCellHeight = renderRef.current.getBoardCellHeight();
        const cellX = Math.floor(x / boardCellHeight);
        const cellY = Math.floor(y / boardCellHeight);
        return [cellY, cellX];
    }



    return (
        <div className="">
            <canvas id="canvas" ref={canvasRef} className="border border-black border-2"></canvas>
        </div>
    );
}