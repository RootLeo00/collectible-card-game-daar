import { useState } from 'react';
import { Button, ListItem, Checkbox, ListItemText, Paper, Typography, Grid } from '@mui/material';
import { useWallet } from '@/utilities';

export const ApproveCardForTransferStep = ({ setPassable, selectedCard }) => {
    const wallet = useWallet();
    const [approved, setApproved] = useState(false);
    function handleApproveClick() {
        // Call to the CardContact
        // Then make the passableTrue
        wallet?.cardmanagerContract.approve(wallet.marketContract.address, selectedCard.tokenId).then((r) => {
            handleApproveClickCheckbox()
        })
    }

    function handleApproveClickCheckbox() {
        setPassable(!approved);
        setApproved(!approved)
    }

    var isPromiseResolved = true;

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper style={{ width: "600px" }}>
                        <Typography>You picked the card: {selectedCard.url}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h3'>This is important!</Typography>
                    <Typography variant='h4'>You need to approve the transfer for the contracts address. You can do this by the button below.</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={handleApproveClick}>Approve the NFT Transfer</Button>
                </Grid>
                <Grid item xs={12}>
                    <ListItem dense>
                        <ListItemText>I approved the NFT Transfer</ListItemText>
                        <Checkbox
                            checked={approved}
                            onChange={handleApproveClickCheckbox}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </ListItem>
                </Grid>
            </Grid>
        </div>
    );
}