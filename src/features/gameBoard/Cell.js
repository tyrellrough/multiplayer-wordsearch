class Cell {
    #character;
    #cellNum;
    #isHighlighted;
    #highlightDirection;
    #hightlightColour;

    constructor(cellNum) {
        this.#isHighlighted = false;
        this.#cellNum = cellNum;
    }

    setChar(character) {
        this.#character = character;
    }

    getChar() {
        return this.#character;
    }

    setIsHighlighted(isHighlighted) {
        this.#isHighlighted = true;
    }

    isHighlighted() {
        return this.#isHighlighted;
    }

    setHighlightDirection(highlightDirection) {
        this.#highlightDirection = highlightDirection;
    }

    getHighlightDirection() {
        return this.#highlightDirection;
    }

    getCellNum() {
        return this.#cellNum;
    }

    setHightlightColour(colour) {
        this.#hightlightColour = colour;
    }

    getHighlightColour() {
        return this.#hightlightColour;
    }


}

export default Cell;