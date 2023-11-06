import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Typography, Container } from '@mui/material';

import CreateCollectionStep from '../components/CreateCollectionStep';
import SelectCardsStep from '../components/SelectCardsStep';
import SelectUserStep from '../components/SelectUserStep';

import ShowPath from '../components/ShowPath';
import { useWallet } from '@/utilities';
import * as Skry from "scryfall-sdk";
import { useNavigate } from 'react-router-dom';
import MyAppBar from '@/components/MyAppBar';

const steps = ['Create a new collection', 'Select cards to mint', 'Select the user to mint the cards for'];

export const MintingPage = () => {
  const wallet = useWallet();
  const navigator = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [maxCardCount, setMaxCardCount] = useState(0);
  const [stepOneInputs, setStepOneInputs] = useState({ name: String, maxnum: Number });
  const [allCards, setAllCards] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({ id: -1 });
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [passable, setPassable] = useState(false)


  if (activeStep == 0 && allCollections.length == 0) {
    Skry.Sets.all().then((setOfCollections) => {
      console.log(setOfCollections);
      var collectionsNew = setOfCollections.map((collection) => {
        return {
          id: collection.id,
          name: collection.name,
          url: collection.uri
        }
      });
      setAllCollections(collectionsNew);
    })
  }

  if (activeStep == 1 && allCards.length == 0) {
    Skry.Sets.byCode(selectedCollection.id).then((set) => {
      set.getCards().then((setOfCards) => {
        var cardsNew = setOfCards.map((card) => {
          return {
            id: card.id,
            url: card.name
          }
        });
        setAllCards(cardsNew);
      })
    })
  }



  const handleNext = () => {
    if (passable) {
      if (activeStep == 0) {
        wallet?.cardmanagerContract.createCollection(stepOneInputs.name, stepOneInputs.maxnum).then(() => {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setPassable(false);
        })
      } else if (activeStep == 1) {
        // Mint the selected cards
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setPassable(false);
      } else if (activeStep == 2) {
        const waitpromise: Promise<any>[] = [];
        // Mint the selected cards for the selected user
        for (let i = 0; i < selectedCards.length; i++) {
          console.log(selectedCards[i]);
          waitpromise.push(wallet?.cardmanagerContract.mint(selectedUser, selectedCards[i], selectedCollection.id))
        }
        // promise all 
        Promise.all(waitpromise).then(() => {
          // navigate back
          navigator("/AdminPage")
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
        return <CreateCollectionStep
          sets={allCollections.slice(0, 10)}
          getMaxCardCount={setMaxCardCount}
          setStepOneInputs={setStepOneInputs}
          setSelectedCollectionUpper={setSelectedCollection}
          setPassable={setPassable}
        />;
      case 1:
        return <SelectCardsStep
          cards={allCards.slice(0, 10)}
          setSelectedCardsUpper={setSelectedCards}
          setPassable={setPassable}
          max={maxCardCount}
        />;
      case 2:
        return <SelectUserStep
          setUserUpper={setSelectedUser}
          setPassable={setPassable}
        />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container>
      <MyAppBar />
      <ShowPath />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{ textAlign: 'center' }}>
            <Typography>All steps completed</Typography>
          </div>
        ) : (
          <div>
            <Typography component={'span'}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={!passable}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};