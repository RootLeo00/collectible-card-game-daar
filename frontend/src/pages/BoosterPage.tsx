import { useState } from 'react'
import { Button, Card, CardHeader, CardMedia, Stack } from '@mui/material';
import { useWallet } from "../utilities"
import { BigNumber, ethers } from 'ethers';
import * as Scry from "scryfall-sdk";
import CardMTG from '../components/CardMTG';
import ShowPath from '@/components/ShowPath';
import MyAppBar from '@/components/MyAppBar';

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
        // 6 common cards
        for (let i = 0; i < 9; i++) {
            cards.push(await Scry.Cards.random("rarity:Common").then((card) => { return card.id; }));
        }
        // 6 uncommon cards
        for (let i = 0; i < 5; i++) {
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
        setBoosters([]);
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
            <MyAppBar />
            <h3>Boosters</h3>
            <ShowPath />
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
                    <Card >
                        <CardHeader
                            title={`Booster ID: ${booster}`}
                        />
                        <CardMedia
                            component="img"
                            height="400"
                            image="../static/images/booster_img.png"
                            alt="Booster image"
                        />
                    </Card>
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

