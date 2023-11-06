import { useState } from 'react';
import { TextField, Button, Paper, List, ListItem, ListItemText } from '@mui/material';

const CreateCollectionStep = ({ sets, getMaxCardCount, setStepOneInputs, setPassable, setSelectedCollectionUpper }) => {
  const [maxCardCount, setMaxCardCount] = useState('');
  const [collectionSearchText, setCollectionSearchText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCollection, setSelectedCollection] = useState({ id: -1 });

  const handleToggle = (collection) => () => {
    setSelectedCollection(collection);
    setSelectedCollectionUpper(collection)
    checkCompletion(selectedCollection, maxCardCount);
    setStepOneInputs({ name: collection.id, maxnum: maxCardCount })
  };

  const handleMaxCardCountChange = (event) => {
    setMaxCardCount(event.target.value);
    checkCompletion(selectedCollection, event.target.value);

    setStepOneInputs({ name: selectedCollection, maxnum: maxCardCount })
  };

  const checkCompletion = (collection, maxCount) => {
    if (collection && maxCount) {
      getMaxCardCount(maxCount);
      setPassable(true);
    } else {
      setPassable(false);
    }

  };

  return (
    <div>
      <h2>Create a new collection</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>

        <TextField
          label="Search collection"
          variant="outlined"
          value={collectionSearchText}
          onChange={(e) => setCollectionSearchText(e.target.value)}
        />
      </div>
      <Paper elevation={2} style={{ width: '600px', margin: '20px' }}>
        <List dense component="div" role="list">
          {sets.filter((set) => { return collectionSearchText.length == 0 || set.name.includes(collectionSearchText) }).map((collection) => {
            const labelId = `checkbox-list-label-${collection.id}`;
            return (

              <ListItem key={collection.id} role={undefined} dense onClick={handleToggle(collection)} >
                <ListItemText primary={collection.name} />
                <Button disabled={selectedCollection?.id == collection.id}>{selectedCollection?.id == collection.id ? "Selected" : "Use This Collection"}</Button>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <TextField
        label="Max Card Count"
        variant="outlined"
        value={maxCardCount}
        onChange={handleMaxCardCountChange}
        fullWidth
      />
    </div>
  );
};

export default CreateCollectionStep;
