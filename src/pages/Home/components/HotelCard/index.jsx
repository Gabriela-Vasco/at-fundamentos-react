/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styles from './HotelCard.module.css'; 
import { useNavigate } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiCardsHeartOutline, mdiCardsHeart } from '@mdi/js';

export default function HotelCard({ hotel = {} }) {
  const navigate = useNavigate();
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [isCurrentHotelAFavorite, setIsCurrentHotelAFavorite] = useState(false);

  useEffect(() => {
    let favoriteHotelsFromLocalStorage = JSON.parse(localStorage.getItem('favoriteHotels'));
    if(!Array.isArray(favoriteHotelsFromLocalStorage)) {
      favoriteHotelsFromLocalStorage = [favoriteHotelsFromLocalStorage];
    }

    if(favoriteHotelsFromLocalStorage.length) {
      if(favoriteHotelsFromLocalStorage.length !== favoriteHotels.length) {
        setFavoriteHotels(favoriteHotelsFromLocalStorage);
        const currentHotel = favoriteHotelsFromLocalStorage?.find(favHotel => favHotel.name === hotel.name);
      
        if (currentHotel) {
          setIsCurrentHotelAFavorite(true);
        }
      }
    }
  }, [favoriteHotels, hotel]);

  function handleCardClick() {
    navigate(`/hotel-details/${hotel.id}`);
  }

  function toggleFavoriteHotel() {
    let updatedFavorites;

    if (isCurrentHotelAFavorite) {
      updatedFavorites = favoriteHotels?.filter(favHotel => favHotel.name !== hotel.name);
      setIsCurrentHotelAFavorite(false);
    } else {
      updatedFavorites = [...favoriteHotels, hotel];
      setIsCurrentHotelAFavorite(true);
    }

    setFavoriteHotels(updatedFavorites);
    localStorage.setItem('favoriteHotels', JSON.stringify(updatedFavorites));
  }


  return (
    <div className={styles.hotelCard}>
      <img src={hotel.image} alt={hotel.name} className={styles.hotelImage} onClick={handleCardClick}/>
      <div className={styles.hotelInfo} onClick={handleCardClick}>
        <h3>{hotel.name}</h3>
        <p>{hotel.city}, {hotel.state}</p>
        <p>Preço: R$ {hotel.price}/noite</p>
        <p>Classificação: {hotel.stars} estrelas</p>
      </div>
      <button onClick={toggleFavoriteHotel} className={styles.icon}>
        {
          isCurrentHotelAFavorite ?
            <Icon path={mdiCardsHeart} size={1.5} /> :
            <Icon path={mdiCardsHeartOutline} size={1.5} />
        }
      </button>
    </div>
  );
};
