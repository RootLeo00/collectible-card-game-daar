import { useParams } from 'react-router-dom';
import ShowPath from '../components/ShowPath';
import MyAppBar from '@/components/MyAppBar';

const usersData = [
  { id: 1, name: 'User 1', otherInfo: '...' },
  { id: 2, name: 'User 2', otherInfo: '...' },
  { id: 3, name: 'User 3', otherInfo: '...' },
];

export const UserInfoPage = () => {
  const { ID } = useParams();

  if (ID === undefined) {
    return (
      <div>
        <p>User not found.</p>
      </div>
    );
  }
  const user = usersData.find((user) => user.id === parseInt(ID, 10));
  return (
    <div>
      <MyAppBar />
      <h2>User Details</h2>
      <ShowPath />
      <p>ID: {user?.id}</p>
      <p>Name: {user?.name}</p>
      <p>Other Info: {user?.otherInfo}</p>
    </div>
  );

};