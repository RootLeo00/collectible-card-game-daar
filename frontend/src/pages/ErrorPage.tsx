import styles from '../styles.module.css'
import { useNavigate } from 'react-router-dom';
import { checkAccount } from '@/utilities'
import ShowPath from '../components/ShowPath';
import MyAppBar from '@/components/MyAppBar';
export const ErrorPage = () => {
    const navigate = useNavigate();
    checkAccount(navigate)

    return (
        <div className={styles.body}>
            <MyAppBar />
            <h1>404</h1>
            <ShowPath />
            <h1>Error: Page Not Found</h1>
        </div>)
};
