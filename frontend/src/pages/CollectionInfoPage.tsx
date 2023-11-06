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

export const CollectionInfoPage = () => {
  const { ID } = useParams();
  if (ID === undefined) {
    return (
      <div>
        <p>Collection not found.</p>
      </div>
    );
  }

  const collection = collectionsData.find((collection) => collection.name === ID);

  return (
    <div>
      <h1>Collection Info Page</h1>
      <ShowPath />
      <p>Collection Name: {collection?.name}</p>
      <p>Collection Number of Cards: {collection?.cardsCount}</p>
    </div>
  );
};


