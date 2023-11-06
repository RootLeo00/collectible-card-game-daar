import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import '../CSS/MyAppBar.css';

import { Link } from 'react-router-dom';
import icon from "../../public/vite.svg"

import { useWallet } from '@/utilities';
import { useEffect } from 'react'


function MyAppBar() {
  const [pages, setPages] = useState([])
  const [pagePaths, setPagePaths] = useState({})



  const wallet = useWallet()
  useEffect(() => {
    const userPages = ["Inventory", "Auction Place", "Booster Page"]
    const adminPages = ["Admin Page", "Minting Page"]

    let pagesNew: string[] = [];
    let userOrAdminString = "";
    console.log(wallet?.details.account);
    if (wallet?.details.account?.toLowerCase() == '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'.toLowerCase()) {
      pagesNew = adminPages;
      userOrAdminString = "AdminPage"
    } else {
      pagesNew = userPages;
      userOrAdminString = "UserPage"
    }

    var pagePathsNew = {
      "Inventory": `/${userOrAdminString}`,
      "Auction Place": `/${userOrAdminString}/AuctionPage`,
      "Booster Page": `/${userOrAdminString}/BoosterPage`,
      "Minting Page": `/${userOrAdminString}/MintingPage`,
      "Admin Page": `/${userOrAdminString}`,
    };
    setPagePaths(pagePathsNew)
    setPages(pagesNew)
  }, [wallet])

  return (
    <AppBar position="static" className="my-app-bar" sx={{ background: 'purple' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="brand">
            <Typography variant="h6" noWrap component="a" >
              <img src={icon} alt="Logo" />
              TCG
            </Typography>
          </div>
          <div className="nav-buttons">
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={pagePaths[page]}
                className="nav-button"
              >
                {page}
              </Button>
            ))}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MyAppBar;