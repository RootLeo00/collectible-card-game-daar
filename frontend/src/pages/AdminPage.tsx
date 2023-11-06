import { useNavigate } from 'react-router-dom';
import { checkAccount } from '@/utilities'
import styles from '../styles.module.css'
import { Button } from '@mui/material';
import ShowPath from '../components/ShowPath';
import MyAppBar from '@/components/MyAppBar';

export const AdminPage = () => {

  const navigate = useNavigate();
  checkAccount(navigate)

  return (
    <div className={styles.body}>
      <MyAppBar />
      <h1>Admin Page</h1>
      <ShowPath />
    </div>
  )
};


