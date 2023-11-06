import { useState } from 'react';
import { TextField } from '@mui/material';
import TransferList from '../components/TransferList';

const SelectCardsStep = ({ cards, setSelectedCardsUpper, setPassable, max }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [cardSearchText, setCardSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = (cardId) => () => {
    const selectedIndex = selectedCards.indexOf(cardId);
    const newSelected = [...selectedCards];

    if (selectedIndex === -1) {
      newSelected.push(cardId);
    } else {
      newSelected.splice(selectedIndex, 1);
    }

    setSelectedCards(newSelected);
    setSelectedCardsUpper(newSelected);
    setPassable(newSelected.length > 0 && newSelected.length <= max);
    if (newSelected.length > max) {
      setErrorMessage(`You should select a maximum of ${max} cards!`);
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div>
      <h2>Select cards to mint</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>

        <TextField
          label="Search card"
          variant="outlined"
          value={cardSearchText}
          onChange={(e) => setCardSearchText(e.target.value)}
        />
      </div>
      <TransferList
        left={cards.filter((card) => card.url.toLowerCase().includes(cardSearchText.toLowerCase()))}
        right={cards.filter((card) => selectedCards.includes(card.id))}
        handleToggle={handleToggle}
      />

    </div>
  );
};

export default SelectCardsStep;