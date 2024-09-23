import { useState, useEffect } from 'react';
import { useSnackbar } from 'react-simple-snackbar';
import HotelCard from './components/HotelCard';
import HotelForm from './components/HotelForm';
import ReactModal from 'react-modal'; 
import Header from '../../components/Header';
import styles from './Home.module.css';
import emptyIllustration from '../../assets/empty-illustration.jpg';

ReactModal.setAppElement('#root'); 

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState('price');
  const [openSnackbar] = useSnackbar();

  useEffect(() => {
    const savedHotels = JSON.parse(localStorage.getItem('hotels'));
  
    if (savedHotels) {
      setHotels(savedHotels);
    }
  }, []);

  function handleAddHotel(newHotel) {
    const updatedHotels = [...hotels, newHotel];
    setHotels(updatedHotels);
    try {
      localStorage.setItem('hotels', JSON.stringify(updatedHotels));
      setIsModalOpen(false);
      openSnackbar('Hotel cadastrado com sucesso');
    } catch(e) {
      console.error(e);
      openSnackbar('Falha ao cadastrar o hotel');
    }
  };

  function openModal() {
    setIsModalOpen(true);
  };
    
  function closeModal(){
    setIsModalOpen(false);
  };

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedHotels = filteredHotels.sort((a, b) => {
    if (sortCriteria === 'price') {
      return a.price - b.price;
    } else {
      return a.stars - b.stars;
    }
  });
  
  return (
    <div className={styles.home}>
      <Header />

      <div className={styles.searchAndOrderContainer}>
        <input
          type="text"
          placeholder="Pesquisar por nome do hotel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        

        <select 
          value={sortCriteria} 
          onChange={(e) => setSortCriteria(e.target.value)} 
          className={styles.sortSelect}
        >
          <option value="price">Ordenar por Preço</option>
          <option value="stars">Ordenar por Classificação</option>
        </select>
      </div>
      
      <div className={styles.hotelsContainer}>
        {sortedHotels.length > 0 ? (
          sortedHotels.map((hotel, index) => <HotelCard key={index} hotel={hotel} />)
        ) : (
          <div className={styles.empty}>
            <h1>Não há hotéis cadastrados</h1>
            <h3>Clique no botão de + para adicionar</h3>
            <img src={emptyIllustration} />
          </div>
        )}
      </div>
      <button className={styles.addButton} onClick={openModal}>+</button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Cadastro de Novo Hotel"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalTop}>
          <button onClick={closeModal} className={styles.closeButton}>X</button>
        </div>
        <HotelForm onSaveHotel={handleAddHotel} />
      </ReactModal>
    </div>
  );
};
