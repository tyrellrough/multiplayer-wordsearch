class Colours {
    GREEN = "rgba(3, 250, 3, 0.7)";
    YELLOW = "rgba(244,245,1,0.7)";
    ORANGE = "rgba(238, 90, 6, 0.7)";
    RED = "rgba(246,6,7,0.7)";
    PURPLE = "rgba(121, 3, 241, 0.7)";
    DARK_BLUE = "rgba(2, 3, 237, 0.7)";
    BLUE = "rgba(4, 139, 194, 0.7)";
    PINK = "rgba(243, 58, 106, 0.7)";

    DEFAULT_COLOURS_ARRAY = [this.GREEN, this.YELLOW, this.ORANGE, this.RED, this.PURPLE, this.DARK_BLUE, this.BLUE, this.PINK];

    currentColourIndex = 0;

    getCurrentColour() {
        return this.DEFAULT_COLOURS_ARRAY[this.currentColourIndex];
    }

    incrementColour() {
        //if at end of array
        if(this.currentColourIndex === this.DEFAULT_COLOURS_ARRAY.length - 1) {
            this.currentColourIndex = 0;
        } else {
            this.currentColourIndex ++;
        }
    }

    convertColourNameToRGBA(colourName) {
        switch (colourName) {
            case "green":
                return this.GREEN;
                break;
            case "yellow":
                return this.YELLOW;
                break;
            case "red":
                return this.RED;
                break;
            case "orange":
                return this.ORANGE;
                break;
            case "purple":
                return this.PURPLE;
                break;
            case "darkBlue":
                return this.DARK_BLUE;
                break;
            case "pink":
                return this.PINK;
                break;
            case "blue":
                return this.BLUE;
                break;
            default:
                return this.BLUE;
                break;
        }
    }

    convertColourARGBToHex(colourARGB) {
        switch (colourARGB) {
            case "rgba(3, 250, 3, 0.7)":
                return '#03FA03B2';
                break;
            case "rgba(244,245,1,0.7)":
                return '#F4F501B2';
                break;
            case "rgba(246,6,7,0.7)":
                return '#F60607B2';
                break;
            case "rgba(238, 90, 6, 0.7)":
                return '#EE5A06B2';
                break;
            case "rgba(121, 3, 241, 0.7)":
                return '#7903F1B2';
                break;
            case "rgba(2, 3, 237, 0.7)":
                return '#0203EDB2';
                break;
            case "rgba(243, 58, 106, 0.7)":
                return '#F33A6AB2';
                break;
            case "rgba(4, 139, 194, 0.7)":
                return '#048BC2B2';
                break;
            default:
                return '#048BC2B2';
                break;
        }
    }
}
export default Colours;