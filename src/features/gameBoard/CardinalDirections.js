
class CardinalDirections {
    static NORTH = "N";
    static NORTH_EAST = "NE";
    static EAST = "E";
    static SOUTH_EAST = "SE";
    static SOUTH = "S";
    static SOUTH_WEST = "SW";
    static WEST = "W";
    static NORTH_WEST = "NW";

    static DIRECTION_ARRAY = new Array(this.EAST, this.SOUTH_EAST,
        this.SOUTH, this.SOUTH_WEST, this.WEST, this.NORTH_WEST,
        this.NORTH, this.NORTH_EAST);

    static getOppositeDirection(direction) {
        switch(direction) {
            case CardinalDirections.NORTH:
                return CardinalDirections.SOUTH;
            case CardinalDirections.EAST:
                return CardinalDirections.WEST;
            case CardinalDirections.SOUTH:
                return CardinalDirections.NORTH;
            case CardinalDirections.WEST:
                return CardinalDirections.EAST;
            case CardinalDirections.NORTH_EAST:
                return CardinalDirections.SOUTH_WEST;
            case CardinalDirections.SOUTH_EAST:
                return CardinalDirections.NORTH_WEST;
            case CardinalDirections.SOUTH_WEST:
                return CardinalDirections.NORTH_EAST;
            case CardinalDirections.NORTH_WEST:
                return CardinalDirections.SOUTH_EAST;
            default:
                break;
        }
        return CardinalDirections.NORTH;
    }

    static radianToNormalDegrees(radians) {
        return (radians * (180/Math.PI) + 360) % 360;
    }

    static convertDegreeToDirection(degree) {
        const val = ((degree/45));
        const dirArr = ["E", "SE", "S", "SW", "W", "NW", "N", "NE", "E"];
        const index = Math.round((val % 8));
        return dirArr[index];
    }

    static calcDirectionFromPos(e, canvasRef, initialClickY, initialClickX) {


        const rect = canvasRef.current.getBoundingClientRect();
        //mouse current position.
        const x = e.pageX - rect.left;
        const y = e.pageY - rect.top;

        console.log("rect", rect);
        console.log("e.pageX", e.pageX);
        console.log("e.pageY", e.pageY);

        const dX = x - initialClickX;
        const dY = y - initialClickY;

       // console.log("calcdirfrompos y: ", initialClickY + " x: " + initialClickX + " x:" + x + " y: " + y);

        const angle = Math.atan2(dY, dX);
        const degree = this.radianToNormalDegrees(angle);
        const dir = this.convertDegreeToDirection(degree);

        //console.log(`angle ${angle} degree ${degree} dir ${dir}`);
        return dir;
    }

    static calcDirectionFromTouchPos(e, canvasRef, initialClickY, initialClickX) {


        const rect = canvasRef.current.getBoundingClientRect();
        //mouse current position.
        const x = e.touches[0].pageX - rect.left;
        const y = e.touches[0].pageY - rect.top;



        const dX = x - initialClickX;
        const dY = y - initialClickY;

       // console.log("calcdirfrompos y: ", initialClickY + " x: " + initialClickX + " x:" + x + " y: " + y);

        const angle = Math.atan2(dY, dX);
        const degree = this.radianToNormalDegrees(angle);
        const dir = this.convertDegreeToDirection(degree);

        //console.log(`angle ${angle} degree ${degree} dir ${dir}`);
        return dir;
    }


    static calcTouchDirectionFromPos(e, canvasRef, initialTouchY, initialTouchX) {
        const rect = canvasRef.current.getBoundingClientRect();
        //mouse current position.
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;

        const dX = x - initialTouchX;
        const dY = y - initialTouchY;


        const angle = Math.atan2(dY, dX);
        const degree = this.radianToNormalDegrees(angle);
        const dir = this.convertDegreeToDirection(degree);

        //console.log(`angle ${angle} degree ${degree} dir ${dir}`);
        return dir;
    }



}

export default CardinalDirections;