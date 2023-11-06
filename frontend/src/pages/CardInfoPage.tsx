import React from 'react';
import { useParams } from 'react-router-dom';
import ShowPath from '../components/ShowPath';

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

export const CardInfoPage = () => {
  const { ID } = useParams();
  if (ID === undefined) {
    return (
      <div>
        <p>Card not found.</p>
      </div>
    );
  }

  const collectionWithCard = collectionsData.find((collection) => collection.cards.some((card) => card.id === parseInt(ID)));//first occurrance
  const card = collectionWithCard?.cards.find((card) => card.id === parseInt(ID));

  return (
    <div>
      <h1>Card Info Page</h1>
      <ShowPath />
      <p>Card ID: {card?.id}</p>
      <p>Card URL: {card?.url}</p>
    </div>
  );
};


