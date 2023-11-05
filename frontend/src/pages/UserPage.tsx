import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
import { Grid, Button } from '@mui/material';

import UsersList from "../components/UsersList";
import CollectionsTreeView from "../components/CollectionsTreeView";

import ShowPath from '../components/ShowPath';
import MyAppBar from '../components/MyAppBar'

import { useLocation } from 'react-router-dom';
//layout
const usersData = [
  { id: 1, name: 'User 1', otherInfo: '...' },
  { id: 2, name: 'User 2', otherInfo: '...' },
  { id: 3, name: 'User 3', otherInfo: '...' },
];

const collectionsData = [
  {
    name: 'Collection 1',
    cardsCount: 3,
    cards: [
      {
        id: 1,
        url: "aaa"
      },
      {
        id: 2,
        url: "bbb"
      }, {
        id: 3,
        url: "ccc"
      }],
  },
  {
    name: 'Collection 2',
    cardsCount: 2,
    cards: [
      {
        id: 4,
        url: "ddd"
      },
      {
        id: 5,
        url: "eee"
      }],
  },
  // Other collections
];

export const UserPage = () => {
  const [number, setNumber] = useState<number>(0)
  console.log("ciao")

  const navigate = useNavigate();
  checkAccount(navigate)

  function buttonClick() {
    console.log("1 click")
    setNumber(number + 1)
  }

  function handleAuctionClick() {
    navigate("/UserPage/AuctionPage")
  }

  const userPages=["Inventory", "Marketplace", "Auction Place", "Booster Page"]

  const location = useLocation();
  const userOrAdminString = location.pathname.split("/").at(1);

  const pagePaths = {
    "Inventory": `/${userOrAdminString}`,
    "Marketplace": `/${userOrAdminString}/MarketPlacePage`,
    "Auction Place": `/${userOrAdminString}/AuctionPage`,
    "Booster Page": `/${userOrAdminString}/BoosterPage`
  };
  return (
    <div className={styles.body}>
      <h1>User Page</h1>
      <ShowPath />
      <MyAppBar pages={userPages} pagePaths={pagePaths}/>
      <h2>Inventory: my cards</h2>
      <Grid container spacing={3}>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          <CollectionsTreeView collectionsData={collectionsData} navigate={navigate} />
        </Grid>
        <Grid item xs={6} style={{ alignItems: 'center' }}>
          <UsersList usersData={usersData} navigate={navigate} />
        </Grid>
        <Button variant="contained" onClick={handleAuctionClick}>
          Auctions
        </Button>
      </Grid>
    </div>

  )
}