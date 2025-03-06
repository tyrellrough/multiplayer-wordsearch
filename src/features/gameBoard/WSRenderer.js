import ArrayHelperFunctions from "./ArrayHelperFunctions";

class WSRenderer {
    #canvas;
    #context;
    #boardHeight = 0;
    #numBoardRows;
    #boardCellHeight;
    #fontSize;
    #halfTextWidth = 0;

    constructor(canvas, context, numBoardRows) {
        this.#canvas = canvas;
        this.#context = context;
        this.#numBoardRows = numBoardRows;
        this.#boardCellHeight = 0;

    }

    getBoardCellHeight() {
        return this.#boardCellHeight;
    }

    drawSelection(selection, cellArray, colours) {
        const startIndex2D = selection.startIndex2D;
        const endIndex2D = selection.endIndex2D;

        this.drawBoard(cellArray);
        //console.log(`startindex2d ${startIndex2D} endindex2d ${endIndex2D}`);
        //highlight start cell circle
        this.highlightCell(selection.startIndex, colours);
        this.highlightCell(selection.endIndex, colours);
        //highlight end cell circle



    }

    #drawGrid() {

        //this.#boardCellHeight = this.#boardHeight / this.#numBoardRows;

        for(let x = 0; x <= this.#numBoardRows - 1; x++) {
            let lineStart = this.#boardCellHeight * x;
            //xLines
            this.#context.moveTo(lineStart,0);
            this.#context.lineTo(lineStart,this.#boardHeight);
            //yLines
            this.#context.moveTo(0, lineStart);
            this.#context.lineTo(this.#boardHeight, lineStart)
        }
        this.#context.strokeStyle = "black";
        this.#context.stroke();
    }

    #resizeCanvas() {

        if (window.innerWidth < 640) {
            this.#boardHeight = Math.floor((window.innerWidth) * 0.90);
        } else if (window.innerHeight >= window.innerWidth) {
            //height is more than width
            this.#boardHeight = Math.floor((window.innerWidth - 150) * 0.85);
           // console.log("height is more than width")
        } else if (window.innerHeight < window.innerWidth) {
            //width is more than height
            this.#boardHeight = Math.floor(window.innerHeight * 0.85);
        }



        //this.#boardHeight = Math.floor(window.innerWidth * 0.7);



        this.#canvas.height = this.#boardHeight;
        this.#canvas.width = this.#boardHeight;
    }

    #drawChar(yPos, xPos, char, fontSize) {
        this.#context.font = `${fontSize}px Courier New`;
        this.#context.fillText(char, xPos, yPos);
    }

    #updateFontSize() {
        this.#fontSize = Math.floor(this.#boardCellHeight * 0.75);
        this.#context.font = `${this.#fontSize}px Courier New`;
    }

    #updateMeasureHalfTextWidth() {
        this.#halfTextWidth = 0.5 * this.#context.measureText("A").width;
    }

    #drawLetters(cellArray) {
        for(let i = 0; i < cellArray.length; i++) {
            const index2D = ArrayHelperFunctions.convert1DIndexTo2D(i, this.#numBoardRows, this.#numBoardRows);
            var cellX = index2D[1];
            var cellY = index2D[0];
            var xCP = cellX * this.#boardCellHeight + (0.5 * this.#boardCellHeight);
            var yCP = cellY * this.#boardCellHeight + (0.5 * this.#boardCellHeight);
            this.#updateFontSize();
            this.#updateMeasureHalfTextWidth();
            xCP = xCP - this.#halfTextWidth;
            yCP = yCP + this.#halfTextWidth;
            this.#drawChar(yCP, xCP, cellArray[i].getChar(), this.#fontSize);
        }
    }

    drawBoard(cellArray) {
        this.#resizeCanvas();
        this.#boardCellHeight = this.#boardHeight / this.#numBoardRows;
        this.#drawGrid();
        this.#drawLetters(cellArray);
        this.highlightCells(cellArray);

    }

    highlightCell(cellNumber1D, colours) {
        const index2D = ArrayHelperFunctions.convert1DIndexTo2D(cellNumber1D, this.#numBoardRows, this.#numBoardRows);
        const cellYStart = index2D[0] * this.#boardCellHeight;
        const cellXStart = index2D[1] * this.#boardCellHeight;
        const cellYCenter = cellYStart + 0.5 * this.#boardCellHeight;
        const cellXCenter = cellXStart + 0.5 * this.#boardCellHeight;
        //canvasRef.current.getContext('2d').fillRect(cellXStart, cellYStart, boardCellHeight, boardCellHeight);
        this.#canvas.getContext('2d').beginPath();
        this.#canvas.getContext('2d').arc(cellXCenter, cellYCenter, 0.5 * this.#boardCellHeight, 0, 2 * Math.PI);

        //get cell colour
        //console.log(`${colours.getCurrentColour()}`);
        this.#canvas.getContext('2d').fillStyle = `${colours.getCurrentColour()}`;
        this.#canvas.getContext('2d').fill();
    }

    highlightCellWithoutColParam(cellNumber1D, cellArray) {
        const index2D = ArrayHelperFunctions.convert1DIndexTo2D(cellNumber1D, this.#numBoardRows, this.#numBoardRows);
        const cellYStart = index2D[0] * this.#boardCellHeight;
        const cellXStart = index2D[1] * this.#boardCellHeight;
        const cellYCenter = cellYStart + 0.5 * this.#boardCellHeight;
        const cellXCenter = cellXStart + 0.5 * this.#boardCellHeight;
        //canvasRef.current.getContext('2d').fillRect(cellXStart, cellYStart, boardCellHeight, boardCellHeight);
        this.#canvas.getContext('2d').beginPath();
        this.#canvas.getContext('2d').arc(cellXCenter, cellYCenter, 0.5 * this.#boardCellHeight, 0, 2 * Math.PI);

        //get cell colour
        this.#canvas.getContext('2d').fillStyle = `${cellArray[cellNumber1D].getHighlightColour()}`;
        this.#canvas.getContext('2d').fill();
    }

    highlightCells(cellArray) {
        for(let i = 0; i < cellArray.length; i++) {
            if(cellArray[i].isHighlighted()) {
                this.highlightCellWithoutColParam(i, cellArray);
            }
        }
    }
}

export default WSRenderer;