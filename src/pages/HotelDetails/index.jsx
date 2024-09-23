import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import Header from '../../components/Header';
import HotelForm from '../Home/components/HotelForm';
import styles from './HotelDetails.module.css';
import Icon from '@mdi/react';
import { mdiStar, mdiPencilCircle, mdiDeleteCircle } from '@mdi/js';
import ReactModal from 'react-modal'; 

ReactModal.setAppElement('#root'); 

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [openSnackbar] = useSnackbar();


  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem('hotels'));
    if (savedHotels) {
      const selectedHotel = savedHotels.find((hotel) => hotel.id === parseInt(id));
      setHotel(selectedHotel);
    }
  }, [id]);

  if (!hotel) {
    return <p>Carregando detalhes do hotel...</p>;
  }

  function openModal() {
    setIsModalOpen(true);
  }
    
  function closeModal(){
    setIsModalOpen(false);
  } 

  function handleSaveHotel(updatedHotel) {
    const savedHotels = JSON.parse(localStorage.getItem('hotels'));
    const updatedHotels = savedHotels.map((h) => 
      h.id === updatedHotel.id ? updatedHotel : h,
    );

    try {
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));
      setHotel(updatedHotel);
      closeModal();
      openSnackbar('Hotel editado com sucesso');
    } catch(e) {
      console.error(e);
      openSnackbar('Falha ao editar o hotel');
    }
  };

  function handleDeleteHotel() {
    const savedHotels = JSON.parse(localStorage.getItem('hotels'));
    const updatedHotels = savedHotels.filter((h) => h.id !== hotel.id);

    try {
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));
      openSnackbar('Hotel removido com sucesso');
      navigate('/');
    } catch(e) {
      console.error(e);
      openSnackbar('Falha ao remover o hotel');
    }
  }


  const renderStars = (stars) => {
    return Array.from({ length: stars }, (_, index) => (
      <Icon key={index} path={mdiStar} size={1}/>
    ));
  };

  return (
    <div>
      <Header />
      <div className={styles.hotelDetails}>
        <div className={styles.imagesContainer}>
          <img src={hotel.image} alt="imagem principal" className={styles.mainImage} />
        </div>
        <div className={styles.detailsContent}>
          <h1 className={styles.hotelName}>{hotel.name}</h1>
          <div className={styles.hotelInfo}>
            <p>{hotel.city}, {hotel.state}</p>
            <p>Preço: R$ {hotel.price}/noite</p>

            <div className={styles.starsContainer}>
              {renderStars(hotel.stars)}
            </div>

            <p className={styles.description}>{hotel.description}</p>
          </div>
          <div className={styles.servicesList}>
            <h3>Serviços e Itens Oferecidos:</h3>
            <ul>
              {hotel.services.map((service, index) => (
                <li key={index}>- {service}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.icons}>
          <button onClick={openModal} className={styles.detailsIcons}>
            <Icon path={mdiPencilCircle} size={2} />
          </button>
          <button onClick={handleDeleteHotel} className={styles.detailsIcons}>
            <Icon path={mdiDeleteCircle} size={2} />
          </button>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edição de Hotel"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalTop}>
          <button onClick={closeModal} className={styles.closeButton}>X</button>
        </div>
        <HotelForm 
          onSaveHotel={handleSaveHotel} 
          hotelToEdit={hotel}
        />
      </ReactModal>
    </div>
  );
};
