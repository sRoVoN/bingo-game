import { useEffect, useState } from "react";

const cardsArray = [
  {
    id: 1,
    name: "Card 1",
  },
  {
    id: 2,
    name: "Card 2",
  },
  {
    id: 3,
    name: "Card 3",
  },
  {
    id: 4,
    name: "Card 4",
  },
  {
    id: 5,
    name: "Card 5",
  },
  {
    id: 6,
    name: "Card 6",
  },
  {
    id: 7,
    name: "Card 7",
  },
  {
    id: 8,
    name: "Card 8",
  },
  {
    id: 9,
    name: "Card 9",
  },
  {
    id: 10,
    name: "Card 10",
  },
  {
    id: 11,
    name: "Card 11",
  },
  {
    id: 12,
    name: "Card 12",
  },
  {
    id: 13,
    name: "Card 13",
  },
  {
    id: 14,
    name: "Card 14",
  },
  {
    id: 15,
    name: "Card 15",
  },
  {
    id: 16,
    name: "Salam",
  },
  {
    id: 17,
    name: "Card 17",
  },
  {
    id: 18,
    name: "Card 18",
  },
  {
    id: 19,
    name: "Card 19",
  },
  {
    id: 20,
    name: "TCard 20",
  },
  {
    id: 21,
    name: "Card 21",
  },
  {
    id: 22,
    name: "Card 22",
  },
  {
    id: 23,
    name: "Carf 23",
  },
  {
    id: 24,
    name: "Card 24",
  },
  {
    id: 25,
    name: "Card 25",
  },
];

function App() {
  const [activeCard, setActiveCard] = useState( );
  const [shuffledArray, setShuffledArray] = useState(cardsArray);
  const [shaking, setShaking] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);

  const fixedIndex = 15;
  const rowClicked = (array) => {
    for (let i = 0; (i = 5); i++) {}
  };
  const handleClick = (index) => {
    setShaking(index);
    // setClickedCards((prevActiveCards) => {
    //   // Toggle line-through by adding or removing the index
    //   if (prevActiveCards.includes(index)) {
    //     return prevActiveCards.filter((id) => id !== index); // Remove the index
    //   } else {
    //     return [...prevActiveCards, index]; // Add the index
    //   }
    // });
    setActiveCard(index);
    setClickedCards((prev) => [...prev, index]);
    console.log(index);
  };
  const checkCards = (x,y,z, array ) =>{
      for(let i = 0; i = array.length; i++){
        
      }
  }

  const shuffleArray = (array) => {
    const shuffledArray = [...array]; // Make a copy to avoid mutating the original
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
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
  useEffect(() => {
    const shuffled = shuffleArrayWithFixefCard(cardsArray, fixedIndex);
    setShuffledArray(shuffled);
    console.log(shuffled);
  }, []);
  return (
    <>
      <div className="grid grid-cols-5 gap-4 w-full mx-auto">
        {shuffledArray.map((card, index) => (
          <div
            className={`flex justify-center items-center h-16 bg-slate-400  ${
              index !== fixedIndex - 3
                ? "cursor-pointer"
                : "disabled cursor-not-allowed"
            }
            ${
              shaking === index ? "shake line-through" : ""
            }
            ${clickedCards.includes(index) ? "line-through" : ""}
            `}
            onClick={() => handleClick(index)}
            key={index}
          >
            {card.name}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

