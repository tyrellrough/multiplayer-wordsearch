export default function WordListElementMultiplayer(props) {

    if(props.word.isFound) {
        return (
            <p>{props.word.text} Found</p>
        )
    } else {
        return (
            <p>{props.word.text}</p>
        )
    }
}