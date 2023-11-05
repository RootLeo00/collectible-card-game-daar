import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import '../CSS/MyAppBar.css';

import { Link } from 'react-router-dom';
import icon from "../../public/vite.svg"

import { useLocation } from 'react-router-dom';
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



  /*return (
    <AppBar position="static" sx={{ background: 'purple' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                mr: 2,
                mt: { xs: 1, md: 0 },
              }}
            >
              <img src={icon} />
              TCG
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={pagePaths[page]}//`/UserInfoPage/${user.id}`
                sx={{
                  mx: 1,
                  color: 'white',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MyAppBar;
*/

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