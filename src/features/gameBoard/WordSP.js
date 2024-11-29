export default class WordSP {
    isFound;
    text;

    constructor(text, isFound) {
        this.text = text;
        this.isFound = isFound;
    }

    setIsFound(isFound) {
        this.isFound = isFound;
    }
}