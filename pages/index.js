import styles from '../styles/Home.module.css';
import Sidebar from '../components/sidebar/Sidebar';

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />
    </div>
  );
}
