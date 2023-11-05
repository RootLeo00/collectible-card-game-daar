import { useState } from 'react'
import { Button, List, ListItem, Stack } from '@mui/material';
import { useWallet } from "../utilities"
import { BigNumber, ethers } from 'ethers';
import * as Scry from "scryfall-sdk";
import CardMTG from '../components/CardMTG';

export const BoosterPage = () => {
    const wallet = useWallet()
    const account = wallet?.details.account;
    const [boosters, setBoosters] = useState<Number[]>([]); // TODO: change to array of booster IDs
    const [redeemedItems, setRedeemedItems] = useState<string[]>([]);


    // function to generate random cards
    const generateCards = async () => {
        // generate random cards
        let cards: string[] = [];
        // 1 land card
        cards.push(await Scry.Cards.random("type:land").then((card) => { return card.id; }));
        // 4 common  or common cards
        for (let i = 0; i < 4; i++) {
            cards.push(await Scry.Cards.random("rarity:Common").then((card) => { return card.id; }));
        }
        // 3 uncommon cards
        for (let i = 0; i < 3; i++) {
            cards.push(await Scry.Cards.random("rarity:Uncommon").then((card) => { return card.id; }));
        }
        // 1 rare card
        cards.push(await Scry.Cards.random("rarity:Rare").then((card) => { return card.id; }));
        // 1 mythic card
        cards.push(await Scry.Cards.random("rarity:Mythic").then((card) => { return card.id; }));
        return cards;
    }


    wallet?.mainContract.on("BoosterMinted", (boosterId: BigNumber) => {
        // setBoosters and filter out duplicates
        //if not already in boosters, add to boosters
        if (!boosters.includes(boosterId.toNumber())) {
            setBoosters([...boosters, boosterId.toNumber()]);
        }
    })

    wallet?.mainContract.on("BoosterRedeemed", (resCardIds: string[], owner: string) => {
        // if not already in redeemedItems, add to redeemedItems
        setRedeemedItems([...redeemedItems, ...resCardIds]);
        setBoosters([]);
    })

    wallet?.mainContract.on("BoosterBurned", (boosterId: BigNumber, owner: string) => {
        setBoosters([...boosters.filter((id) => id !== boosterId.toNumber())]);
    })


    const handleBuyBooster = async () => {
        // retrieve booster cardIds from backend
        const cardIds: string[] = await generateCards();
        console.log(cardIds);
        // call mint booster function
        wallet?.mainContract
            .mintBooster(cardIds, account, { value: ethers.utils.parseEther("1.0") })
            .catch(console.error)
    };

    const handleCollectAll = () => {
        //call redeem booster function
        for (let i = 0; i < boosters.length; i++) {
            wallet?.mainContract
                .redeemBooster(boosters[i], account)
                .catch(console.error)
        }
    };

    const handleBurnAll = () => {
        //call burn booster function
        for (let i = 0; i < boosters.length; i++) {
            wallet?.mainContract
                .burnBooster(boosters[i], account)
                .catch(console.error)
        }
    }


    return (
        <>
            <h3>Boosters</h3>
            <p>Click on a booster to collect it</p>
            <Button variant="contained" onClick={handleBuyBooster}>
                Buy Booster
            </Button>
            <Button variant="contained" onClick={handleCollectAll}>
                Collect All
            </Button>
            <Button variant="contained" onClick={handleBurnAll}>
                Trash All
            </Button>
            <p>List of your boosters:</p>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                {boosters?.map((booster, index) => (
                    // display booster image
                ))}
            </Stack>
            <h3>Rewards</h3>
            <Button variant="contained" onClick={() => setRedeemedItems([])}>
                Clear Rewards
            </Button>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                {redeemedItems?.map((id, index) => (
                    <CardMTG key={index} id={`${id}`} />
                ))}
            </Stack>
        </>
    );
};

