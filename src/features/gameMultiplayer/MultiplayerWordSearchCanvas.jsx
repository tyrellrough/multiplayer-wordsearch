import {useEffect, useRef} from "react";

import ArrayHelperFunctions from "../gameBoard/ArrayHelperFunctions.js";
import {useSelector} from "react-redux";
import WSRendererMultiplayer from "../gameBoardMultiplayer/WSRendererMultiplayer.js";
import Selection from "../gameBoard/Selection.js";
import CardinalDirections from "../gameBoard/CardinalDirections.js";


export default function MultiplayerWordSearchCanvas(props) {
    const canvasRef = useRef(null);
    const renderRef = useRef(null);
    const selectionRef = useRef(null);
    const boardRef = useRef(null);
    const currentPlayerColour = useSelector(state => state.multiPlayerGame.currentPlayerColour);

    let clickX = 0;
    let clickY = 0;
    const gameGUID = useSelector(state => state.multiPlayerGame.gameGUID);

    function getBoardCells() {
        props.connection.invoke("GetBoard", gameGUID).then(boardResult => {
            boardRef.current = boardResult;
            renderRef.current = new WSRendererMultiplayer(canvasRef.current, canvasRef.current.getContext('2d'), boardRef.current.boardWidth);
            renderRef.current.drawBoard(boardRef.current.cells);
            //setBoard(boardResult);
            console.log(boardResult);
        })
    }

    props.connection.on("RedrawBoard", cells => {
        redrawBoard(cells);
    })

    function redrawBoard(newCells) {
        console.log("redrawing board forced by server")
        boardRef.current.cells = newCells;
        renderRef.current.drawBoard(boardRef.current.cells);
        console.log(boardRef.current.cells);
        canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);
    }

    useEffect(() => {
        console.log("ws mounted");
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        getBoardCells();
        window.addEventListener('resize', handleResize);


        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        //
        // canvasRef.current.addEventListener('touchstart', handleTouchStart);
        // canvasRef.current.addEventListener('touchend', handleMouseUp);
    }, []);

    function handleResize() {
        renderRef.current.drawBoard(boardRef.current.cells);
    }

    // function handleTouchStart(e) {
    //     const currentCell2D = getTouchCurrentCell(e);
    //     const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);
    //
    //
    //     console.log(currentCell1D)
    //     //set the selction start index
    //     wsBoardRef.current.selection.startIndex = currentCell1D;
    //     wsBoardRef.current.selection.startIndex2D = currentCell2D;
    //     //get the valid directions
    //     wsBoardRef.current.selection.validDirections = wsBoardRef.current.getValidDirections(currentCell1D, numBoardRows, numBoardColumns);
    //
    //     //for every valid direction get valid cells in each direction and map them.
    //     wsBoardRef.current.selection.intialiseValidDirMaps(numBoardRows);
    //     wsBoardRef.current.selection.initaliseStartCellPos(renderRef.current.getBoardCellHeight());
    //     canvasRef.current.addEventListener('touchmove', handleCanvasTouchMove);
    // }
    //
    // function handleCanvasTouchMove(e) {
    //     const currentCell2D = getTouchCurrentCell(e);
    //     const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);
    //
    //     //const currentDirection = wsBoardRef.current.selection.direction;
    //
    //     //get mouse direction with initial cell click as center.
    //     wsBoardRef.current.selection.direction = CardinalDirections.calcTouchDirectionFromPos(e, canvasRef, wsBoardRef.current.selection.startCellMiddleYPos, wsBoardRef.current.selection.startCellMiddleXPos);
    //
    //     //check if selected cell is valid in terms of direction
    //     let isCellAlongValidDir;
    //     if(wsBoardRef.current.selection.validDirMap.has(wsBoardRef.current.selection.direction)) {
    //         isCellAlongValidDir = wsBoardRef.current.selection.validDirMap.get(wsBoardRef.current.selection.direction).includes(currentCell1D);
    //     }
    //
    //     //console.log(`is cell valid dir ${isCellAlongValidDir}`)
    //
    //     //set the selection end index to the cell number only if valid cellnumber
    //     if(isCellAlongValidDir) {
    //         wsBoardRef.current.selection.endIndex = currentCell1D;
    //         wsBoardRef.current.selection.endIndex2D = currentCell2D;
    //         wsBoardRef.current.selection.calcEndCellMiddlePos(boardCellHeight);
    //
    //         renderRef.current.drawSelection(wsBoardRef.current.selection, wsBoardRef.current.getCellArray(), colourRef.current);
    //     }
    //
    //     //console.log(`startindex ${wsBoardRef.current.selection.startIndex} endindex ${wsBoardRef.current.selection.endIndex}`);
    // }
    //
    function handleMouseDown(e) {

        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);

        selectionRef.current = new Selection();
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
        canvasRef.current.addEventListener('mousemove', handleCanvasMouseDownMove);
        console.log("mouse down")




    }

    function handleCanvasMouseDownMove(e) {
        //get cell mouse is over
        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], boardRef.current.boardWidth);

        //get mouse direction with initial cell click as center.
        selectionRef.current.direction = CardinalDirections.calcDirectionFromPos(e, canvasRef, selectionRef.current.startCellMiddleYPos, selectionRef.current.startCellMiddleXPos);

        const currentDirection = selectionRef.current.direction;
        console.log(currentDirection);

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

            renderRef.current.drawSelection(selectionRef.current, boardRef.current.cells, null);
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

        props.connection.invoke("CheckSelectionValid", gameGUID, selectionRef.current.startIndex,
            selectionRef.current.endIndex, currentPlayerColour, selectionRef.current.direction).then(foundWord => {
            if (!foundWord) {
                renderRef.current.drawBoard(boardRef.current.cells);
                canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);
            }
        });


        // wsBoardRef.current.wordLocations.forEach(wordLocation => {
        //     //if the word has not been found yet
        //     if(!wordLocation.isFound) {
        //         //check if word has been selected in correct direction
        //         const isMatchingStartIndex = wordLocation.wordStartIndex === wsBoardRef.current.selection.startIndex;
        //         const isMatchingEndIndex = wordLocation.wordEndIndex === wsBoardRef.current.selection.endIndex;
        //         //check if word has been selected in reverse direction
        //         const isMatchingStartIndexReverse = wordLocation.wordStartIndex === wsBoardRef.current.selection.endIndex;
        //         const isMatchingEndIndexReverse = wordLocation.wordEndIndex === wsBoardRef.current.selection.startIndex
        //         if((isMatchingStartIndex && isMatchingEndIndex) || (isMatchingStartIndexReverse && isMatchingEndIndexReverse)) {
        //             wordLocation.isFound = true;
        //
        //             console.log("word found");
        //             //props.wordsList[0].setIsFound(true);
        //
        //
        //             const wordIndex = props.wordsList.findIndex(x => x.text === wordLocation.word);
        //             console.log(props.wordsList);
        //
        //             props.wordsList[wordIndex].setIsFound(true);
        //             const tempUpdatedWordsList = [...props.wordsList];
        //
        //             console.log("temp updated", tempUpdatedWordsList);
        //
        //
        //             //console.log("temp updated wordslist");
        //             console.log(tempUpdatedWordsList);
        //             props.setWordsList(tempUpdatedWordsList);
        //             console.log("props after word select", props.wordsList);
        //
        //             //highlight cells of the found word
        //             //if word was selected backwards
        //             if(isMatchingStartIndexReverse && isMatchingEndIndexReverse) {
        //                 //highlight cells but swap parameters so its in correct order.
        //                 wsBoardRef.current.highlightCellsInRange(wordLocation.wordEndIndex, wordLocation.wordStartIndex,  wsBoardRef.current.selection.direction, colourRef.current);
        //             } else {
        //                 wsBoardRef.current.highlightCellsInRange(wordLocation.wordStartIndex, wordLocation.wordEndIndex,  wsBoardRef.current.selection.direction, colourRef.current);
        //             }
        //         }
        //     }
        //
        // });
        //
        //
        //
        // canvasRef.current.removeEventListener("touchmove", handleCanvasTouchMove);
    }


    function getMouseCurrentCell(e) {
        var rect = canvasRef.current.getBoundingClientRect();

        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;

        // console.log("mouse")
        // console.log(x,y);

        let boardCellHeight = renderRef.current.getBoardCellHeight();
        const cellX = Math.floor(x / boardCellHeight);
        const cellY = Math.floor(y / boardCellHeight);
        return [cellY, cellX];
    }

    //
    // function getTouchCurrentCell(e) {
    //     const rect = canvasRef.current.getBoundingClientRect();
    //     const x = e.touches[0].clientX - rect.left;
    //     const y = e.touches[0].clientY - rect.top;
    //     boardCellHeight = renderRef.current.getBoardCellHeight();
    //     const cellX = Math.floor(x / boardCellHeight);
    //     const cellY = Math.floor(y / boardCellHeight);
    //     return [cellY, cellX];
    // }
    //
    // function calcNumCellsMoved(e) {
    //     const rect = canvasRef.current.getBoundingClientRect();
    //     const x = e.pageX - rect.left;
    //     const y = e.pageY - rect.top;
    //     const diffX = Math.abs(x - clickX);
    //     const diffY = Math.abs(y - clickY);
    //     const cellsAmntX = Math.round(diffX / boardCellHeight);
    //     const cellsAmntY = Math.round(diffY / boardCellHeight);
    //     const numberOfCells = Math.max(cellsAmntY, cellsAmntX);
    //     console.log(`numcells ${numberOfCells}`);
    //     return numberOfCells;
    // }

    // function calcCellStartPosDirection(cellNum1D, direction) {

    // }

    return (
        <div className="">
            <canvas id="canvas" ref={canvasRef} className="border border-black border-2"></canvas>
        </div>
    );
}