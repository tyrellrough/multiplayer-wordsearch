


import { useEffect, useRef } from "react";

import ArrayHelperFunctions from "../gameBoard/ArrayHelperFunctions.js";


import CardinalDirections from "./../gameBoard/CardinalDirections.js";
import WSBoard from "./../gameBoard/WSBoard.js";
import WSRenderer from "./../gameBoard/WSRenderer.js";
import Colours from "../gameBoard/Colours.js";





export default function WordSearchCanvas(props) {
    const canvasRef = useRef(null);
    const wsBoardRef = useRef(null);
    const renderRef = useRef(null);
    const colourRef = useRef(null);
    let boardCellHeight = 0;
    const numBoardRows = props.boardWidth;
    const numBoardColumns = props.boardWidth;
    let clickX = 0;
    let clickY = 0;


    useEffect(() => {
        console.log("ws mounted");
        wsBoardRef.current = new WSBoard(numBoardRows, numBoardColumns, props.wordsList);
        renderRef.current = new WSRenderer(canvasRef.current, canvasRef.current.getContext('2d'),numBoardRows);
        renderRef.current.drawBoard(wsBoardRef.current.getCellArray());
        colourRef.current = new Colours();

        window.addEventListener('resize', handleResize);
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);

        canvasRef.current.addEventListener('touchstart', handleTouchStart);
        canvasRef.current.addEventListener('touchend', handleMouseUp);

    }, []);

    function handleResize() {
        renderRef.current.drawBoard(wsBoardRef.current.getCellArray());
    }

    function handleTouchStart(e) {
        const currentCell2D = getTouchCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);


        console.log(currentCell1D)
        //set the selction start index
        wsBoardRef.current.selection.startIndex = currentCell1D;
        wsBoardRef.current.selection.startIndex2D = currentCell2D;
        //get the valid directions
        wsBoardRef.current.selection.validDirections = wsBoardRef.current.getValidDirections(currentCell1D, numBoardRows, numBoardColumns);

        //for every valid direction get valid cells in each direction and map them.
        wsBoardRef.current.selection.intialiseValidDirMaps(numBoardRows);
        wsBoardRef.current.selection.initaliseStartCellPos(renderRef.current.getBoardCellHeight());
        canvasRef.current.addEventListener('touchmove', handleCanvasTouchMove);
    }

    function handleCanvasTouchMove(e) {
        const currentCell2D = getTouchCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);

        //const currentDirection = wsBoardRef.current.selection.direction;

        //get mouse direction with initial cell click as center.
        wsBoardRef.current.selection.direction = CardinalDirections.calcTouchDirectionFromPos(e, canvasRef, wsBoardRef.current.selection.startCellMiddleYPos, wsBoardRef.current.selection.startCellMiddleXPos);

        //check if selected cell is valid in terms of direction
        let isCellAlongValidDir;
        if(wsBoardRef.current.selection.validDirMap.has(wsBoardRef.current.selection.direction)) {
            isCellAlongValidDir = wsBoardRef.current.selection.validDirMap.get(wsBoardRef.current.selection.direction).includes(currentCell1D);
        }

        //console.log(`is cell valid dir ${isCellAlongValidDir}`)

        //set the selection end index to the cell number only if valid cellnumber
        if(isCellAlongValidDir) {
            wsBoardRef.current.selection.endIndex = currentCell1D;
            wsBoardRef.current.selection.endIndex2D = currentCell2D;
            wsBoardRef.current.selection.calcEndCellMiddlePos(boardCellHeight);

            renderRef.current.drawSelection(wsBoardRef.current.selection, wsBoardRef.current.getCellArray(), colourRef.current);
        }

        //console.log(`startindex ${wsBoardRef.current.selection.startIndex} endindex ${wsBoardRef.current.selection.endIndex}`);



    }



    function handleMouseDown(e) {

        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);

        //set the selction start index
        wsBoardRef.current.selection.startIndex = currentCell1D;
        wsBoardRef.current.selection.startIndex2D = currentCell2D;
        //get the valid directions
        wsBoardRef.current.selection.validDirections = wsBoardRef.current.getValidDirections(currentCell1D, numBoardRows, numBoardColumns);

        //for every valid direction get valid cells in each direction and map them.
        wsBoardRef.current.selection.intialiseValidDirMaps(numBoardRows);
        wsBoardRef.current.selection.initaliseStartCellPos(renderRef.current.getBoardCellHeight());
        canvasRef.current.addEventListener('mousemove', handleCanvasMouseDownMove);

    }

    function handleCanvasMouseDownMove(e) {
        //get cell mouse is over
        const currentCell2D = getMouseCurrentCell(e);
        const currentCell1D = ArrayHelperFunctions.convert2DIndexTo1D(currentCell2D[0], currentCell2D[1], numBoardRows);



        //get mouse direction with initial cell click as center.
        wsBoardRef.current.selection.direction = CardinalDirections.calcDirectionFromPos(e, canvasRef, wsBoardRef.current.selection.startCellMiddleYPos, wsBoardRef.current.selection.startCellMiddleXPos);

        const currentDirection = wsBoardRef.current.selection.direction;


        console.log(currentDirection);

        //check if selected cell is valid in terms of direction
        let isCellAlongValidDir;
        if(wsBoardRef.current.selection.validDirMap.has(wsBoardRef.current.selection.direction)) {
            isCellAlongValidDir = wsBoardRef.current.selection.validDirMap.get(wsBoardRef.current.selection.direction).includes(currentCell1D);
        }

        //console.log(`is cell valid dir ${isCellAlongValidDir}`)

        //set the selection end index to the cell number only if valid cellnumber
        if(isCellAlongValidDir) {
            wsBoardRef.current.selection.endIndex = currentCell1D;
            wsBoardRef.current.selection.endIndex2D = currentCell2D;
            wsBoardRef.current.selection.calcEndCellMiddlePos(boardCellHeight);

            renderRef.current.drawSelection(wsBoardRef.current.selection, wsBoardRef.current.getCellArray(), colourRef.current);
        }

        //console.log(`startindex ${wsBoardRef.current.selection.startIndex} endindex ${wsBoardRef.current.selection.endIndex}`);



    }



    function handleMouseUp(e) {
        wsBoardRef.current.wordLocations.forEach(wordLocation => {
            //if the word has not been found yet
            if(!wordLocation.isFound) {
                //check if word has been selected in correct direction
                const isMatchingStartIndex = wordLocation.wordStartIndex === wsBoardRef.current.selection.startIndex;
                const isMatchingEndIndex = wordLocation.wordEndIndex === wsBoardRef.current.selection.endIndex;
                //check if word has been selected in reverse direction
                const isMatchingStartIndexReverse = wordLocation.wordStartIndex === wsBoardRef.current.selection.endIndex;
                const isMatchingEndIndexReverse = wordLocation.wordEndIndex === wsBoardRef.current.selection.startIndex
                if((isMatchingStartIndex && isMatchingEndIndex) || (isMatchingStartIndexReverse && isMatchingEndIndexReverse)) {
                    wordLocation.isFound = true;

                    console.log("word found");
                    //props.wordsList[0].setIsFound(true);


                    const wordIndex = props.wordsList.findIndex(x => x.text === wordLocation.word);
                    console.log(props.wordsList);

                    props.wordsList[wordIndex].setIsFound(true);
                    const tempUpdatedWordsList = [...props.wordsList];

                    console.log("temp updated", tempUpdatedWordsList);


                    //console.log("temp updated wordslist");
                    console.log(tempUpdatedWordsList);
                    props.setWordsList(tempUpdatedWordsList);
                    console.log("props after word select", props.wordsList);

                    //highlight cells of the found word
                    //if word was selected backwards
                    if(isMatchingStartIndexReverse && isMatchingEndIndexReverse) {
                        //highlight cells but swap parameters so its in correct order.
                        wsBoardRef.current.highlightCellsInRange(wordLocation.wordEndIndex, wordLocation.wordStartIndex,  wsBoardRef.current.selection.direction, colourRef.current);
                    } else {
                        wsBoardRef.current.highlightCellsInRange(wordLocation.wordStartIndex, wordLocation.wordEndIndex,  wsBoardRef.current.selection.direction, colourRef.current);
                    }


                }
            }

        });


        renderRef.current.drawBoard(wsBoardRef.current.getCellArray());
        canvasRef.current.removeEventListener("mousemove", handleCanvasMouseDownMove);
        canvasRef.current.removeEventListener("touchmove", handleCanvasTouchMove);
    }

    function getMouseCurrentCell(e) {
        var rect = canvasRef.current.getBoundingClientRect();

        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;

        // console.log("mouse")
        // console.log(x,y);

        boardCellHeight = renderRef.current.getBoardCellHeight();
        const cellX = Math.floor(x / boardCellHeight);
        const cellY = Math.floor(y / boardCellHeight);
        return [cellY, cellX];
    }

    function getTouchCurrentCell(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        boardCellHeight = renderRef.current.getBoardCellHeight();
        const cellX = Math.floor(x / boardCellHeight);
        const cellY = Math.floor(y / boardCellHeight);
        return [cellY, cellX];
    }

    function calcNumCellsMoved(e) {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;
        const diffX = Math.abs(x - clickX);
        const diffY = Math.abs(y - clickY);
        const cellsAmntX = Math.round(diffX / boardCellHeight);
        const cellsAmntY = Math.round(diffY / boardCellHeight);
        const numberOfCells = Math.max(cellsAmntY, cellsAmntX);
        console.log(`numcells ${numberOfCells}`);
        return numberOfCells;
    }

    // function calcCellStartPosDirection(cellNum1D, direction) {

    // }

    return (
        <div className="">
            <canvas id="canvas" ref={canvasRef} className="border border-black border-2"></canvas>
        </div>
    );
}