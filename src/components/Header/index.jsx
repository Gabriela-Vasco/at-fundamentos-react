import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { useTheme } from '../../context/ThemeContext.jsx';
import Icon from '@mdi/react';
import { mdiWhiteBalanceSunny, mdiWeatherNight } from '@mdi/js';


export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function redirectToMainPage() {
    navigate('/');
  }

  function redirectToFavoritesPage() {
    navigate('/hotel-favorites');
  }
  return (
    <header className={styles.header}>
      <h1>RSV Hotéis</h1>
      <div className={styles.buttons}>
        <button onClick={toggleTheme} className={styles.toggleBtn}>
          {theme === 'light' ?
            <Icon path={mdiWhiteBalanceSunny} size={1} /> :
            <Icon path={mdiWeatherNight} size={1} />}
        </button>
        <button onClick={redirectToFavoritesPage} className={styles.regularBtn}>Favoritos</button>
        <button onClick={redirectToMainPage} className={styles.regularBtn}>Voltar</button>
      </div>
    </header>
  );
}