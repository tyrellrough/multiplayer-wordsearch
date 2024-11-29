import CardinalDirections from "./CardinalDirections";

class RandomHelperFunctions {
    static getRandomNaturalNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    static getRandomDirection() {
        return RandomHelperFunctions.getRandomArrayElement(CardinalDirections.DIRECTION_ARRAY);
    }

    static getRandomArrayElement(array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    static getRandomUpperChar() {
        const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
        return this.getRandomArrayElement(alphabet);
    }



}

export default RandomHelperFunctions;