import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
import { Grid, Button, Stack, ListItem } from '@mui/material';
import { useWallet } from "../utilities"
import * as Skry from "scryfall-sdk";
import MyAppBar from '@/components/MyAppBar';
import ShowPath from '../components/ShowPath';
import CardMTG from '@/components/CardMTG';

export const UserPage = () => {
  const [number, setNumber] = useState<number>(0)
  const [cards, setCards] = useState<string[]>([]);
  const [cardsOfUsers, setCardsOfUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [collections, setCollections] = useState<string[]>([]);
  const wallet = useWallet();

  useEffect(() => {
    const fetchCards = async () => {
      const response = wallet?.cardmanagerContract.userToCardNames(wallet.details.account)
        .then((cardArray: string[]) => {
          // remove strings that has length less than 36 char
          cardArray = cardArray.filter((cardId) => cardId.length >= 36) //TODO: regex better formatting
          setCards(cardArray);
          // retriev collection names of the cards from Skry
          for (let i = 0; i < cardArray.length; i++) {
            Skry.Cards.byId(cardArray[i]).then((card) => {
              //filter duplicates
              if (!collections.includes(card.set_name))
                setCollections([...collections, card.set_name]);
            })
          }
        })
    }
    fetchCards();
  }, [wallet?.cardmanagerContract]);

  useEffect(() => {
    const fetchCardsOfUsers = async () => {
      // retrieve list of users
      const users = wallet?.cardmanagerContract.getAllUsers()
        .then((userArray: string[]) => {
          // filter duplicates
          setUsers(userArray.filter((val,id,array) => array.indexOf(val) == id))
        })
    }
    fetchCardsOfUsers();
  }, [wallet]);

  const navigate = useNavigate();
  checkAccount(navigate)

  function handleAuctionClick() {
    navigate("/UserPage/AuctionPage")
  }

  function handleBoosterClick() {
    navigate("/BoosterPage")
  }

  return (
    <div className={styles.body}>
      <MyAppBar />
      <h1>User Page</h1>
      <ShowPath />
      <h2>Inventory: my cards</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
            {cards?.map((id, index) => (
              <CardMTG key={index} id={`${id}`} />
            ))}
          </Stack>
        </Grid>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          Available collections
          {collections.length > 0 && (collections.map((collection) =>
            (<ListItem> {collection} </ListItem>)))
          }
          <br />
          Users who have cards in this blockchain
          {users.length > 0 && (users.map((user) =>
            (<ListItem> {user} </ListItem>)))
          }
        </Grid>
        <Button variant="contained" onClick={handleAuctionClick}>
          Auctions
        </Button>
      </Grid>
    </div>

  )
}