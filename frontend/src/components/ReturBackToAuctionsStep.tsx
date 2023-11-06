import { Typography, Grid } from '@mui/material';

export const ReturBackToAuctionsStep = ({ setPassable, lastPageMessage }) => {
    setPassable(true);
    return (
        <div>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Typography variant='h3'>Now what?</Typography>
                    <Typography variant='h4'>{lastPageMessage}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}