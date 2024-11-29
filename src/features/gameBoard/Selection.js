import ArrayHelperFunctions from "./ArrayHelperFunctions";

class Selection {
    startIndex;
    startIndex2D;
    endIndex;
    endIndex2D;

    startCellMiddleYPos;
    startCellMiddleXPos;
    endCellMiddleYPos;
    endCellMiddleXPos;


    selectedArray = new Array();
    validDirMap = new Map();
    validDirections;
    direction;


    intialiseValidDirMaps(numBoardRows) {
        //console.log(`${this.validDirections}`);
        this.validDirections.forEach(validDir => {
            this.validDirMap.set(validDir,ArrayHelperFunctions.getListCellsDirection(this.startIndex, validDir, numBoardRows));
        });
    }

    initaliseStartCellPos(boardCellHeight) {
        this.startCellMiddleYPos = (this.startIndex2D[0] * boardCellHeight) + 0.5 * boardCellHeight;
        this.startCellMiddleXPos = (this.startIndex2D[1] * boardCellHeight) + 0.5 * boardCellHeight;
    }

    calcEndCellMiddlePos(boardCellHeight) {
        this.endCellMiddleYPos = (this.endIndex2D[0] * boardCellHeight) + 0.5 * boardCellHeight;
        this.endCellMiddleXPos = (this.endIndex2D[1] * boardCellHeight) + 0.5 * boardCellHeight;
    }



}

export default Selection;