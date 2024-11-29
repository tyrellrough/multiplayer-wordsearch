export default function WordsListElement(props) {



    if(props.word.isFound) {

        return(
            <div name="word-list-element" id="word-list-element" className="flex">
                <p className="line-through decoration-4">{props.word.text}</p>
            </div>
        );
    } else {
        console.log(props.word.isFound);
        return(
            <div name="word-list-element" id="word-list-element" className="flex">
                <p>{props.word.text}</p>
            </div>
        );
    }




}