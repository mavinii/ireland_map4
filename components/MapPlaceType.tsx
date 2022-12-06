import { useEffect, useState } from "react";

const API_PLACETYPE_URL =
"https://gist.githubusercontent.com/saravanabalagi/541a511eb71c366e0bf3eecbee2dab0a/raw/bb1529d2e5b71fd06760cb030d6e15d6d56c34b3/place_types.json";

// This function gets the place type name from the API
export default function GetMapPlaceType(placeTypeID: any) {
    const [placeType, setPlaceType] = useState([]);
    
    useEffect(() => {
        fetch(API_PLACETYPE_URL)
        .then((response) => response.json())
        .then((json) => setPlaceType(json))
        .catch((error) => console.error(error));
    }, []);
    
    return placeType.map((placeType) => {
       if (placeType['id'] === placeTypeID) {
           return placeType['name'];
       }
    });
}