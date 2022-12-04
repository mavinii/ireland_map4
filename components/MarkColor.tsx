// RETURN COLOR ACCORDING TO PLACE TYPE
export default function GetMarkColor(placeTypeID: any) {
    switch(placeTypeID) {
        case 1:
            return 'brown';
        case 2:
            return 'blue';
        case 3:
            return 'green';
        case 4:
            return 'yellow';
        case 5:
            return 'purple';
        case 6:
            return 'orange';
        case 7:
            return 'black';
        case 8:
            return 'red';
        case 9:
            return 'grey';
        case 10:
            return 'pink';
        case 11:
            return 'cyan';
        case 12:
            return 'magenta';
        case 13:
            return 'lime';
        case 14:
            return 'teal';
        case 15:
            return 'gold';
        default:
            return 'white';
    }
} 