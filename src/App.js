import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const cardsArray =[
  {id:0, name:"Hello, hello?"},
  {id:1, name:"I need to jump another call"},
  {id:2, name:"Can everyone go on mute"},
  {id:3, name:"Could you please get closer to the mic"},
  {id:4, name:"(Loaud painful echo/ feedback)"},
  {id:5, name:"Next slide please"},
  {id:6, name:"Can we take this offLine?"},
  {id:7, name:"is ___ on the call?"},
  {id:8, name:"Could you share this slide afterwards?"},
  {id:9, name:"Can somebody grant presenter right?"},
  {id:10, name:"Can you email that to everyone?"},
  {id:11, name:"Sorry I had problems loging in"},
  {id:12, name:"(Animal noises in the background)"},
  {id:13, name:"Sorry, I didn't find the conference ID"},
  {id:14, name:"I was having connection issues"},
  {id:15, name:"CONF call 😷 BINGO"},
  {id:16, name:"Who just joined?"},
  {id:17, name:"Sorry, something ___ with my calender"},
  {id:18, name:"Do you see my screen?"},
  {id:19, name:"Let's wait for ___!"},
  {id:20, name: "You will send the ninutes?"},
  {id:21, name: "Sorry I wwas on mute"},
  {id:22, name:"Can you repeat please?"},
  {id:23, name:"(Child noises in the background)"},
  {id:24, name:"I'll have to get back to you"},
]


function App() {
  const [shuffledArray, setShuffledArray] = useState(cardsArray);
  const [shaking, setShaking] = useState(null);
  const [clickedCells, setClickedCells] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const fixedIndex = 15;
  const matchedPatterns = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10, 11, 13,14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [4, 8, 16, 20],
    [0, 6, 18, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24]
  ] 
  const playSound = () => {
    const sound = new Audio('/sounds/acclaim.mp3'); // Path to your MP3 file
    sound.play();
  };
  const handleClick = (id, checkedArray, rowIndex, cellIndex) => {
    setShaking(id);


    setClickedCells((prevClickedCells) => {
      const updatedClickedCells = [
        ...prevClickedCells,
        { rowIndex, cellIndex },
      ];
      const clickedIndexes = updatedClickedCells.map(
        (cell) => cell.rowIndex * 5 + cell.cellIndex // Assuming 5 cells per row
      );
      const isBingo = matchedPatterns.some((pattern) => {
        return pattern.every((value) => clickedIndexes.includes(value));
      });
      if (isBingo) {
        playSound()
        setShowConfetti(true); // Show confetti when bingo is found
      }

      return updatedClickedCells; // Return the updated state.
    });
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; 
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); 
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };
  const items = [];
  for (let i = 0; i < cardsArray.length; i++) {
    items.push(
      <tr className="flex " key={cardsArray[i]}>
        {cardsArray[i].name}
      </tr>
    );
  }
  const shuffleArrayWithFixefCard = (array, fixedIndex) => {
    const fixedCard = array[fixedIndex];
    const cardsToShuffle = array.filter((_, index) => index !== fixedIndex);
    const shuffleCards = shuffleArray(cardsToShuffle);
    const middleIndex = Math.floor(shuffleCards.length / 2);
    shuffleCards.splice(middleIndex, 0, fixedCard);

    return shuffleCards;
  };
  const chunkArray = (array, chunkSize) => {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };
  useEffect(() => {
    const shuffled = shuffleArrayWithFixefCard(cardsArray, fixedIndex);
    const chunked = chunkArray(shuffled, 5);
    setShuffledArray(chunked);
  }, []);

  return (
    <div className=" flex w-full h-screen justify-center items-center mx-auto border-separate border-spacing-5 ">
      <table className="table-auto border-separate sm:border-spacing-5 border-spacing-1 w-full">
      <tbody className="p-2 ">
        {Array.isArray(shuffledArray) && shuffledArray.length > 0 ? (
          shuffledArray.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Array.isArray(row) ? (
                row.map((card, cellIndex) => {
                  const isCardClicked = clickedCells.some(
                    (clickedCell) => clickedCell.rowIndex === rowIndex && clickedCell.cellIndex === cellIndex
                  );
                   const checkedArray = matchedPatterns.some((subArray) => 
                     subArray.every((value, index) => value === clickedCells[index]
                  ));
                  return (
                   <td
                     key={cellIndex}
                     onClick={()=> handleClick(card.id , checkedArray, rowIndex, cellIndex)}
                     className={`table-cell sm:w-36 sm:h-36 w-4 h-4 bg-pink-200  sm:p-4 p-0  text-[8px] sm:text-xl ${
                       card.id !== fixedIndex 
                         ? "cursor-pointer"
                         : "disabled cursor-not-allowed"
                     }
                 ${shaking === card.id && card.id !== 15  ? "shake line-through text-red-500" : ""}
                 ${isCardClicked && card.id !==15 ? "line-through text-gray-500" : ""}
                 `}
                   >
                     {card.name}
                   </td>
                 )})                 
              ) : (
                <td colSpan={5}>Invalid row data</td> 
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>No cards available</td>
          </tr>
        )}
      </tbody>
      </table> 
      {showConfetti && <Confetti />}
      </div>
  );
}

export default App;
