
export default function AudioButton() {
    let audio = new Audio("../../assets/90s-game-ui-6-185099.mp3");


    return(
      <button onClick={() => audio.play()}>click me</button>
    );
}