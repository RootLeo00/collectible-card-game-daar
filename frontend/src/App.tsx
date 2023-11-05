import { useEffect, useMemo, useRef, useState, ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWallet } from "./utilities"
import { LoginPage } from "./pages/LoginPage";
import { AdminPage } from "./pages/AdminPage";
import { UserPage } from "./pages/UserPage";
import { ErrorPage } from "./pages/ErrorPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { CardInfoPage } from "./pages/CardInfoPage";
import { CollectionInfoPage } from "./pages/CollectionInfoPage";
import { AuctionPage } from './pages/auctions/AuctionPage';
import { BidforAuctionPage } from './pages/auctions/BidforAuctionPage';
import { CreateAuctionPage } from './pages/auctions/CreateAuctionPage';
import { AuctionInfoPage } from './pages/auctions/AuctionInfoPage';
import { MintingPage } from "./pages/MintingPage";
import { BoosterPage } from "./pages/BoosterPage";



type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}

export const App = () => {
  const wallet = useWallet()
  const adminAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';


  const isEmptyAccount = !wallet?.details.account;
  const isAdmin = wallet?.details.account === adminAccount;

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<LoginPage />} />
            <Route path="/UserPage" element={<UserPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/UserInfoPage/:ID" element={<UserInfoPage />} />
          <Route path="/CardInfoPage/:ID" element={<CardInfoPage />} />
          <Route path="/CollectionInfoPage/:ID" element={<CollectionInfoPage />} />
          <Route path="/AuctionInfoPage/:ID" element={<AuctionInfoPage />} />

          <Route path="/UserPage/AuctionPage" element={<AuctionPage />} />
          <Route path="/UserPage/BoosterPage" element={<BoosterPage />} />
          <Route path="/UserPage/AuctionPage/BidforAuctionPage/:ID" element={<BidforAuctionPage />} />
          <Route path="/UserPage/AuctionPage/CreateAuctionPage" element={<CreateAuctionPage />} />
          <Route path="/AdminPage/MintingPage" element={<MintingPage />} />
        </Routes>
      </BrowserRouter>
  );

}
