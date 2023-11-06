import { useWallet } from '@/utilities';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Typography, Container } from '@mui/material';
import SingleCardSelectorStep from "@/components/SingleCardSelectorStep";
import { ApproveCardForTransferStep } from "@/components/ApproveCardFortransfer";
import { ReturBackToAuctionsStep } from "@/components/ReturBackToAuctionsStep";

const steps = ['Select the card for exchange', 'Approve the card', 'Return back to the auctions'];
export const CardPicker = ({ lastPageMessage, lastPageButton, bidding, auctionId }) => {
    const [allCards, setAllCards] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedCard, setSelectedCard] = useState({ tokenId: -1 });
    const [passable, setPassable] = useState(false)
    const navigate = useNavigate()
    const wallet = useWallet();

    useEffect(() => {
        wallet?.cardmanagerContract.userToCards(wallet.details.account).then((stringOfNames: string[]) => {
            console.log(stringOfNames);

            stringOfNames = stringOfNames.map((cccc) => {
                return {
                    id: cccc[0],
                    url: cccc[0],
                    tokenId: cccc[1].toNumber(),
                }
            })

            console.log(stringOfNames);

            setAllCards([...stringOfNames]);
        })
    }, [wallet])

    const handleNext = () => {
        if (activeStep <= 1) {
            setActiveStep(activeStep + 1);
            setPassable(false);
        } else {
            if (bidding) {
                wallet?.marketContract.offer(auctionId, selectedCard.tokenId).then((r) => {
                    console.log("Offered!");

                    navigate("/UserPage/AuctionPage")
                })
            } else {
                // Call the create auction here!
                wallet?.marketContract.open(selectedCard.tokenId).then((r) => {
                    console.log(r);

                    navigate("/UserPage/AuctionPage")
                })
            }
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <SingleCardSelectorStep setPassable={setPassable} cards={allCards} setSelectedCardUpper={setSelectedCard} />;
            case 1:
                return <ApproveCardForTransferStep setPassable={setPassable} selectedCard={selectedCard} />;
            case 2:
                return <ReturBackToAuctionsStep setPassable={setPassable} lastPageMessage={lastPageMessage} />;
            default:
                return <div>Error? {step}</div>;
        }
    };

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Grid>

                <Grid item xs={12}>
                    <div>
                        {activeStep === steps.length ? (
                            <div style={{ textAlign: 'center' }}>
                                <Typography>All steps completed</Typography>
                            </div>
                        ) : (
                            <div>
                                <Typography>{getStepContent(activeStep)}</Typography>
                                <div>
                                    <Button disabled={activeStep === 0} onClick={handleBack}>
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        disabled={!passable}>
                                        {activeStep === steps.length - 1 ? lastPageButton : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

