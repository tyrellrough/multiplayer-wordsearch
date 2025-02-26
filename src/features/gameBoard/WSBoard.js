import Cell from "./Cell";
import ArrayHelperFunctions from "./ArrayHelperFunctions";
import WordLocation from "./WordLocation";
import RandomHelperFunctions from "./RandomHelperFunctions";
import Selection from "./Selection";
import CardinalDirections from "./CardinalDirections";


class WSBoard {
    //Properties.
    #cellArray;
    selection;

    //Board size properties.
    #numBoardRows;
    #numBoardColumns;
    #boardLength;

    //Board corner indices.
    topLeftCellIndex;
    topRightCellIndex;
    bottomLeftCellIndex;
    bottomRightCellIndex;

    //Top and bottom row indices.
    topRowIndex = 0;
    bottomRowIndex;

    //Left and right column indices.
    leftColumnIndex = 0;
    rightColumnIndex;

    wordsArray = [];
    wordLocations;

    //constructors
    constructor(numBoardRows, numBoardColumns, wordsList) {
        this.#initialiseBoardSizeProperties(numBoardRows, numBoardColumns);
        this.#initialiseBoardCells();
        this.#initialiseCornerIndicesValues();
        this.initialiseRowPosValues();
        this.initialiseWordsArray(wordsList);
        this.intialiseSelection();
        this.insertWords(this.wordsArray);

        this.fillGaps();

    }

    intialiseSelection() {
        this.selection = new Selection();
    }

    initialiseWordsArray(wordsList) {
        wordsList.forEach(wordObject => {
            this.wordsArray.push(wordObject.text);
        })
        this.wordLocations = new Array(this.wordsArray.length);
        //console.log(`wordsarraylen ${this.wordsArray.length} wordlocationslen ${this.wordLocations.length}`);

    }

    initialiseRowPosValues() {
        this.bottomRowIndex = this.#numBoardRows - 1;
        this.rightColumnIndex = this.#numBoardRows - 1;
    }

    //methods
    #initialiseBoardSizeProperties(numBoardRows, numBoardColumns) {
        this.#numBoardRows = numBoardRows;
        this.#numBoardColumns = numBoardColumns;
        this.#boardLength = numBoardRows * numBoardColumns;
    }

    #initialiseBoardCells() {
        this.#cellArray = new Array(this.#boardLength);
        for(let i = 0; i < this.#cellArray.length; i++) {
            this.#cellArray[i] = new Cell(i);
        }
    }

    fillGaps() {

        for(let i = 0; i < this.#boardLength; i++) {
            if(typeof(this.#cellArray[i].getChar()) === "undefined") {
                this.#cellArray[i].setChar(RandomHelperFunctions.getRandomUpperChar());
                //this.#cellArray[i].setChar("-");
            }
        }
    }

    #initialiseCornerIndicesValues() {
        //To account for arrays being 0 indexed.
        const maxRowVal = this.#numBoardRows - 1;
        const maxColVal = this.#numBoardColumns- 1;
        //Top left.
        this.topLeftCellIndex = 0;
        //Top right.
        this.topRightCellIndex = maxRowVal;
        //Bottom left.
        this.bottomLeftCellIndex = ArrayHelperFunctions.convert2DIndexTo1D(maxRowVal, 0, this.#numBoardRows);
        //Bottom right.
        this.bottomRightCellIndex = ArrayHelperFunctions.convert2DIndexTo1D(maxRowVal, maxColVal, this.#numBoardRows);
    }

    insertWords() {
        let currentWordIndex = 0;
        this.wordsArray.forEach(word => {
            let isSpaceForWord = false;
            let isValidWordOverlap = false;
            let randomIndex;
            let randomDirection;
            do {
                randomIndex = RandomHelperFunctions.getRandomNaturalNumber(0, this.#boardLength);
                const validDirections = ArrayHelperFunctions.getValidDirections(randomIndex,
                    this.#numBoardRows, this.#numBoardColumns, this.topLeftCellIndex,
                    this.topRightCellIndex, this.bottomLeftCellIndex, this.bottomRightCellIndex,
                    this.bottomRowIndex, this.rightColumnIndex);
                randomDirection = RandomHelperFunctions.getRandomArrayElement(validDirections);

                isSpaceForWord = this.#doesWordFit(randomIndex, randomDirection, word);
                if(isSpaceForWord) {
                    isValidWordOverlap = this.#isInsertionValid(word, randomIndex, randomDirection);
                }

            } while (!isSpaceForWord || !isValidWordOverlap);
            this.#insertWord(word, randomIndex, randomDirection, currentWordIndex);
            currentWordIndex++;


        });

    }

    #doesWordFit(cellNum, direction, word) {
        const wordLength = word.length;
        const directionLength = ArrayHelperFunctions.getLengthDirection(cellNum, direction, this.#numBoardRows);
        //console.log(`wordlen ${wordLength} direcitonlength ${directionLength} direction ${direction}`);
        if (wordLength <= directionLength) {
            return true;
        } else {
            return false;
        }
    }

    #isInsertionValid(word, startIndex, direction) {
        let currentCell = this.#cellArray[startIndex];
        for(let i = 0; i < word.length; i++) {

            //if not empty
            if(typeof(currentCell.getChar()) != "undefined") {
                //if overlap is not same character
                if(currentCell.getChar() !== word.charAt(i)) {
                    return false;
                }
            }
            currentCell = this.#cellArray[ArrayHelperFunctions.getCellDirection(currentCell.getCellNum(),
                direction, this.#numBoardRows, this.#numBoardColumns)];
        }
        return true;
    }

    #insertWord(word, startIndex, direction, currentWordIndex) {
        console.log(startIndex);
        let currentCell = startIndex;
        let previousCell;
        for(let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            this.#cellArray[currentCell].setChar(char);
            console.log(`insword currentcell ${currentCell} currentcellchar ${this.#cellArray[currentCell].getChar()}`)

            previousCell = currentCell;
            currentCell = ArrayHelperFunctions.getCellDirection(currentCell, direction, this.#numBoardRows, this.#numBoardColumns);
        }
        const wordLocation = new WordLocation(word, startIndex, previousCell, false);
        this.wordLocations[currentWordIndex] = wordLocation;
    }

    getCellArray() {
        return this.#cellArray;
    }

    highlightCellsInRange(startCell, endCell, direction, colours) {
        console.log(`highlightcellsrange col ${colours.getCurrentColour()}`);


        for(let i = startCell; i !== endCell; i = ArrayHelperFunctions.getCellDirection(i, direction, this.#numBoardRows, this.#numBoardColumns)) {
            this.#cellArray[i].setIsHighlighted(true);
            this.#cellArray[i].setHightlightColour(colours.getCurrentColour());
        }
        this.#cellArray[endCell].setIsHighlighted(true);
        this.#cellArray[endCell].setHightlightColour(colours.getCurrentColour());
        colours.incrementColour();
    }

    getValidDirections(cellNumber, numBoardRows, numBoardColumns) {
        let cellPos2D = ArrayHelperFunctions.convert1DIndexTo2D(cellNumber, numBoardRows, numBoardColumns);
        let cellYPos = cellPos2D[0];
        let cellXPos = cellPos2D[1];

        //corners
        switch(cellNumber) {
            case this.topLeftCellIndex:
                return [CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH];
            case this.topRightCellIndex:
                return [CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST];
            case this.bottomLeftCellIndex:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST];
            case this.bottomRightCellIndex:
                return [CardinalDirections.NORTH, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }


        switch(cellYPos) {
            //north row
            case 0:
                return [CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST];
            //south row
            case this.bottomRowIndex:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }

        switch(cellXPos) {
            //west row
            case 0:
                return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.SOUTH_EAST, CardinalDirections.SOUTH];
            //east row
            case this.rightColumnIndex:
                return [CardinalDirections.NORTH, CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
        }

        //otherwise return all directions
        return [CardinalDirections.NORTH, CardinalDirections.NORTH_EAST, CardinalDirections.EAST, CardinalDirections.SOUTH_EAST,
            CardinalDirections.SOUTH, CardinalDirections.SOUTH_WEST, CardinalDirections.WEST, CardinalDirections.NORTH_WEST];
    }


}

export default WSBoard;