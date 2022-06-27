import styles from '../styles/Home.module.css';
import Sidebar from '../components/sidebar/Sidebar';
import Header from '../components/header/Header';
import { getAuthObject, checkIsAdmin } from '../tools/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export default function Home() {

  const auth = getAuthObject();
  const [user, loading, error] = useAuthState(auth);
  const [admin, setAdmin] = useState(false);

  // auth.signOut();

  useEffect(() => {
    (async () => {
      if (user) {
        const isAdmin = await checkIsAdmin(user);
        setAdmin(isAdmin);
        console.log(isAdmin);
      }
    })();
  }, [user]);

  return (
    <div className={styles.container}>
      <Sidebar admin={admin} />
      <main className={styles.full}>
        <Header user={user} userLoading={loading} />
      </main>
    </div>
  );
}
