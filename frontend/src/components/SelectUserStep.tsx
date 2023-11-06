import { useState } from 'react';
import {  TextField } from '@mui/material';

const SelectCardsStep = ({ setPassable, setUserUpper }) => {
  const [userAddress, setUserAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const regex = RegExp('^0x[a-fA-F0-9]{40}$');

  const handleAddressChange = (event) => {
    setUserAddress(event.target.value);
    checkCompletion(event.target.value);
  };

  const checkCompletion = (address) => {
    if (address && regex.test(address)) {
      setUserUpper(address)
      setPassable(true);
    } else {
     setPassable(false);
    }
  };

  

  return (
    <div>
      <h2>Select user to mint cards for</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <TextField
        label="User address"
        variant="outlined"
        value={userAddress}
        onChange={handleAddressChange}
        fullWidth
      />
      </div>
  );
};

export default SelectCardsStep;
