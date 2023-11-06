import { List, ListItem, ListItemText, Paper, Checkbox } from '@mui/material';

function TransferList({ left, right, handleToggle }) {

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Paper elevation={2} style={{ width: '200px', margin: '20px' }}>
        <List dense component="div" role="list">
          {left.map((card) => {
            const labelId = `checkbox-list-label-${card.id}`;
            return (
              <ListItem key={card.id} role={undefined} dense onClick={handleToggle(card.id)} >
                <Checkbox
                  edge="start"
                  checked={right.includes(card)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText primary={card.url} />
              </ListItem>
            );
          })}
        </List>
      </Paper>

      <Paper elevation={2} style={{ width: '200px', margin: '20px' }}>
        <List dense component="div" role="list">
          {right.map((card) => {
            const labelId = `checkbox-list-label-${card}`;

            return (
              <ListItem key={card.id} role={undefined} dense onClick={handleToggle(card.id)} >
                <Checkbox
                  edge="start"
                  checked={true}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
                <ListItemText primary={card.url} />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}

export default TransferList;
