import {useGetCategoriesQuery} from "../../services/wordSearchAPI.js";
import {Fragment} from "react";
import {useDispatch} from "react-redux";
import {setWordsCategory} from "./gameOptionsSlice.js";

export default function WordThemeDropDown(){
    const {data = [], error, isLoading}  = useGetCategoriesQuery(undefined, undefined);

    const dispatch = useDispatch();
    const onWordThemeSelection = e => {
        dispatch(setWordsCategory(e.target.value));
    }

    if(error) {
        return (
            <Fragment>
                <select name='word-theme-selection' defaultValue='fruits'>
                        <option key={0} value={'fruits'}>fruits</option>
                </select>
            </Fragment>

        );
    }

    if (isLoading) {
        return (
            <Fragment>
                <p>Loading...</p>
            </Fragment>
        )
    }

    return (
        <Fragment>
            <select name='word-theme-selection' defaultValue="fruits" onChange={onWordThemeSelection}>
                {data.map((category) => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                ))}
            </select>
        </Fragment>
    );
}