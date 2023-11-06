import styles from '../styles.module.css'
import { checkAccount } from "../utilities"
import { useNavigate } from 'react-router-dom';
import ShowPath from '../components/ShowPath';
import MyAppBar from '@/components/MyAppBar'

export const LoginPage = () => {

  const navigate = useNavigate();
  checkAccount(navigate)

  return (
    <div className={styles.body}>
      <MyAppBar />
      <h1>Please login with Metamask!</h1>
      <ShowPath />
    </div>

  )
}