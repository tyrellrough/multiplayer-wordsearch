import CardinalDirections from "./CardinalDirections";

class ArrayHelperFunctions {
    static convert1DIndexTo2D(index1D, numRows, numCols) {
        let col = index1D % numCols;
        let row = Math.floor(index1D / numRows);
        return [row,col];
    }

    static convert2DIndexTo1D(row, col, numRows) {
        return (row * numRows) + col;
    }

    static getValidDirections(cellNumber, numBoardRows, numBoardColumns, topLeftCellIndex, topRightCellIndex, bottomLeftCellIndex, bottomRightCellIndex, bottomRowIndex, rightColumnIndex,) {
        let cellPos2D = this.convert1DIndexTo2D(cellNumber, numBoardRows, numBoardColumns);
        let cellYPos = cellPos2D[0];
        let cellXPos = cellPos2D[1];

        //corners
        switch(cellNumber) {
            case topLeftCellIndex:
                return [CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH];
            case topRightCellIndex:
                return [CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST];
            case bottomLeftCellIndex:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST];
            case bottomRightCellIndex:
                return [CardinalDirections.NORTH, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }


        switch(cellYPos) {
            //north row
            case 0:
                return [CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST];
            //south row
            case bottomRowIndex:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }

        switch(cellXPos) {
            //west row
            case 0:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH];
            //east row
            case rightColumnIndex:
                return [CardinalDirections.NORTH, CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }

        //otherwise return all directions
        return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.SOUTH_EAST,
            CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
    }

    static getCellDiagonal(cellNumber, direction, numBoardRows, numBoardColumns) {
        let validDirections = this.getValidDirections(cellNumber, numBoardRows, numBoardColumns);
        let cellPos2D = this.convert1DIndexTo2D(cellNumber, numBoardRows, numBoardColumns);
        if(!validDirections.includes(direction)) {
            return -1;
        }

        let cellNewPos2D = cellPos2D;
        let cellNumNew = -1;

        switch(direction) {
            case CardinalDirections.NORTH_EAST:
                cellNewPos2D[0] -= 1;
                cellNewPos2D[1] += 1;
                cellNumNew = this.convert2DIndexTo1D(cellNewPos2D[0], cellNewPos2D[1], numBoardRows);
                return cellNumNew;

            case CardinalDirections.SOUTH_EAST:
                cellNewPos2D[0] += 1;
                cellNewPos2D[1] += 1;
                cellNumNew = this.convert2DIndexTo1D(cellNewPos2D[0], cellNewPos2D[1], numBoardRows);
                return cellNumNew;

            case CardinalDirections.SOUTH_WEST:
                cellNewPos2D[0] += 1;
                cellNewPos2D[1] -= 1;
                cellNumNew = this.convert2DIndexTo1D(cellNewPos2D[0], cellNewPos2D[1], numBoardRows);
                return cellNumNew;

            case CardinalDirections.NORTH_WEST:
                cellNewPos2D[0] -= 1;
                cellNewPos2D[1] -= 1;
                cellNumNew = this.convert2DIndexTo1D(cellNewPos2D[0], cellNewPos2D[1], numBoardRows);
                return cellNumNew;
        }
        return cellNumNew;
    }

    static getCellNotDiagDirection(cellNumber, direction, numBoardRows, numBoardColumns) {
        let validDirections = this.getValidDirections(cellNumber, numBoardRows, numBoardColumns);
        let cellPos2D = this.convert1DIndexTo2D(cellNumber, numBoardRows, numBoardColumns);
        if(!validDirections.includes(direction)) {
            return -1;
        }
        let cellNumNew = -1;

        switch(direction) {
            case CardinalDirections.NORTH:
                cellPos2D[0]--;
                cellNumNew  = this.convert2DIndexTo1D(cellPos2D[0], cellPos2D[1], numBoardRows);
                break;
            case CardinalDirections.EAST:
                cellPos2D[1]++;
                cellNumNew  = this.convert2DIndexTo1D(cellPos2D[0], cellPos2D[1], numBoardRows);
                break;
            case CardinalDirections.SOUTH:
                cellPos2D[0]++;
                cellNumNew  = this.convert2DIndexTo1D(cellPos2D[0], cellPos2D[1], numBoardRows);
                break;
            case CardinalDirections.WEST:
                cellPos2D[1]--;
                cellNumNew  = this.convert2DIndexTo1D(cellPos2D[0], cellPos2D[1], numBoardRows);
                break;
        }
        return cellNumNew;
    }

    static getCellDirection(cellNumber, direction, numBoardRows, numBoardColumns) {
        switch(direction) {
            case CardinalDirections.NORTH:
                return this.getCellNotDiagDirection(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.EAST:
                return this.getCellNotDiagDirection(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.SOUTH:
                return this.getCellNotDiagDirection(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.WEST:
                return this.getCellNotDiagDirection(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.NORTH_EAST:
                return this.getCellDiagonal(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.SOUTH_EAST:
                return this.getCellDiagonal(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.SOUTH_WEST:
                return this.getCellDiagonal(cellNumber, direction, numBoardRows, numBoardColumns);
            case CardinalDirections.NORTH_WEST:
                return this.getCellDiagonal(cellNumber, direction, numBoardRows, numBoardColumns);
        }
    }

    static getLengthDirection(cellNum, direction, numRows) {
        switch(direction) {
            case CardinalDirections.NORTH:
                return ArrayHelperFunctions.getLengthNotDiagDirection(cellNum, direction, numRows);
            case CardinalDirections.EAST:
                return this.getLengthNotDiagDirection(cellNum, direction, numRows);
            case CardinalDirections.SOUTH:
                return this.getLengthNotDiagDirection(cellNum, direction, numRows);
            case CardinalDirections.WEST:
                return this.getLengthNotDiagDirection(cellNum, direction, numRows);
            case CardinalDirections.NORTH_EAST:
                return this.getDiagonalLengthDirection(cellNum, direction, numRows);
            case CardinalDirections.SOUTH_EAST:
                return this.getDiagonalLengthDirection(cellNum, direction, numRows);
            case CardinalDirections.SOUTH_WEST:
                return this.getDiagonalLengthDirection(cellNum, direction, numRows);
            case CardinalDirections.NORTH_WEST:
                return this.getDiagonalLengthDirection(cellNum, direction, numRows);
            default:
                break;
        }
        return -1;
    }

    static getLengthNotDiagDirection(cellNum, direction, numRows) {
        let cellPos2D = ArrayHelperFunctions.convert1DIndexTo2D(cellNum, numRows, numRows);
        let diff = 0;
        switch(direction) {
            case CardinalDirections.NORTH:
                //towards 0
                diff = cellPos2D[0] + 1;
                return diff;
            case CardinalDirections.SOUTH:
                //towards gridsize
                diff = numRows - cellPos2D[0];
                return diff;
            case CardinalDirections.EAST:
                //towards gridsize
                diff = numRows - cellPos2D[1];
                return diff;
            case CardinalDirections.WEST:
                //towards 0
                diff = cellPos2D[1] + 1;
                return diff;
            default:
                break;
        }
        return -1;
    }

    static getDiagonalLengthDirection(cellNum, direction, numRows) {
        let cellPos2D = this.convert1DIndexTo2D(cellNum, numRows, numRows);
        let diffX;
        let diffY;
        numRows--;
        switch(direction) {
            case CardinalDirections.NORTH_EAST:
                //y towards 0
                diffY = cellPos2D[0];
                //x towards gridsize-1
                diffX = numRows - cellPos2D[1];
                break;
            case CardinalDirections.SOUTH_EAST:
                //y towards gridsize-1
                diffY = numRows - cellPos2D[1];
                //x towards gridsize-1
                diffX = numRows - cellPos2D[0];
                break;
            case CardinalDirections.SOUTH_WEST:
                //y towards gridsize-1
                diffY = numRows - cellPos2D[0];
                //x towards 0
                diffX = cellPos2D[1];
                break;
            case CardinalDirections.NORTH_WEST:
                //y towards 0
                diffY = cellPos2D[0];
                //x towards 0
                diffX = cellPos2D[1];
                break;
            default:
                break;
        }
        if(diffY > diffX) {
            return diffX + 1;
        }
        return diffY + 1;
    }

    static getListCellsDirection(cellNum, direction, numBoardRows) {
        const maxCellsDir = ArrayHelperFunctions.getLengthDirection(cellNum, direction, numBoardRows);
        let cellPosArr = new Array();

        for(let i = 0; i < maxCellsDir; i++) {
            cellNum = ArrayHelperFunctions.getCellDirection(cellNum, direction, numBoardRows, numBoardRows);
            cellPosArr.push(cellNum);
        }
        return cellPosArr;
    }
}



export default ArrayHelperFunctions;