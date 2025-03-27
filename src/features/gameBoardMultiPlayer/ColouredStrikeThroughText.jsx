export default function ColouredStrikeThroughText(props) {

    return (
        <p className={"line-through decoration-4 " + props.colour}>{props.text}</p>
    );
}