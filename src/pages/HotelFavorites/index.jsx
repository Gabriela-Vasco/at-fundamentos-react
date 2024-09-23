import { useState, useEffect } from 'react';
import HotelCard from '../Home/components/HotelCard';
import Header from '../../components/Header';
import styles from './HotelFavorites.module.css';
import emptyIllustration from '../../assets/empty-illustration.jpg';

export default function HotelFavorites() {
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  useEffect(() => {
    let savedFavoriteHotels = JSON.parse(localStorage.getItem('favoriteHotels'));
  
    if (!Array.isArray(savedFavoriteHotels)) {
      savedFavoriteHotels = [];
    } 
  
    savedFavoriteHotels = savedFavoriteHotels.filter(hotel => hotel !== null && hotel !== undefined);
  
    setFavoriteHotels(savedFavoriteHotels);
  }, []);
  
  return (
    <div className={styles.home}>
      <Header />
      
      <div className={styles.hotelsContainer}>
        {favoriteHotels?.length > 0 ? (
          favoriteHotels?.map((hotel, index) => <HotelCard key={index} hotel={hotel} />)
        ) : (
          <div className={styles.empty}>
            <h1>Não há hotéis favoritados</h1>
            <img src={emptyIllustration} />
          </div>
        )}
      </div>
    </div>
  );
};
