import { useEffect, useState } from "react";
import { cardsArray } from "./utilis/cardsArray";
import { matchedPatterns } from "./utilis/pattern";

import Confetti from "react-confetti";


function App() {
  const [shuffledArray, setShuffledArray] = useState(cardsArray);
  const [shaking, setShaking] = useState(null);
  const [clickedCells, setClickedCells] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const fixedIndex = 15;

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
    <div className=" flex w-full h-full justify-center items-center mx-auto border-separate border-spacing-5 overflow-y-scroll ">
      <table className="table-auto border-separate sm:border-spacing-5 sm-md:border-spacing-1 border-spacing-0 w-full">
      <tbody >
        {Array.isArray(shuffledArray) && shuffledArray.length > 0 ? (
          shuffledArray.map((row, rowIndex) => (
            <tr key={rowIndex} >
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
                     className={`table-cell md:w-36 md:h-32  h-32 w-11 text-xs sm-md:h-44 sm-md:w-14 sm-md:text-xl rounded-xl border-2 shadow-pink-400 border-pink-100  sm:p-4 p-0  md:text-2xl ${
                       card.id !== fixedIndex 
                         ? "cursor-pointer"
                         : "disabled cursor-not-allowed"
                     }
                 ${shaking === card.id && card.id !== 15  ? "shake line-through text-red-500" : ""}
                 ${isCardClicked && card.id !==15 ? "line-through text-gray-500" : ""}
                 ${card.id === fixedIndex ? "bg-pink-400" : " bg-pink-50"}
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
