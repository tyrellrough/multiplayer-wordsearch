class WordLocation {
    word;
    wordStartIndex;
    wordEndIndex;
    isFound;

    constructor(word, wordStartIndex, wordEndIndex, found) {
        this.word = word;
        this.wordStartIndex = wordStartIndex;
        this.wordEndIndex = wordEndIndex;
        this.isFound = found;
    }

    setFound() {
        this.isFound = true;
    }
}

export default WordLocation;