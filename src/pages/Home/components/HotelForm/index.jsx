/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import styles from './HotelForm.module.css';

export default function HotelForm({ hotelToEdit, onSaveHotel }){
  const [hotelData, setHotelData] = useState({
    name: '',
    image: '',
    stars: 1,
    city: '',
    state: '',
    price: '',
    services: '',
    description: '',
  });

  useEffect(() => {
    if (hotelToEdit) {
      setHotelData({
        ...hotelToEdit,
        services: hotelToEdit.services.join(', '),
      });
    }
  }, [hotelToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const servicesArray = hotelData.services.split(',').map((service) => service.trim());

    const updatedHotel = {
      ...hotelData,
      id: hotelToEdit ? hotelToEdit.id : Date.now(),
      stars: parseInt(hotelData.stars),
      price: parseFloat(hotelData.price),
      services: servicesArray,
    };

    onSaveHotel(updatedHotel); 

    setHotelData({
      name: '',
      image: '',
      stars: 1,
      city: '',
      state: '',
      price: '',
      services: '',
      description: '',
    });
  };

  return (
    <form className={styles.hotelForm} onSubmit={handleSubmit}>
      <h2>{hotelToEdit ? 'Editar Hotel' : 'Cadastrar Novo Hotel'}</h2>
      
      <label>
        Nome do Hotel:
        <input
          type="text"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Imagem (URL):
        <input
          type="url"
          name="image"
          value={hotelData.image}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Classificação (Estrelas):
        <input
          type="number"
          name="stars"
          value={hotelData.stars}
          min="1"
          max="5"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Cidade:
        <input
          type="text"
          name="city"
          value={hotelData.city}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Estado:
        <input
          type="text"
          name="state"
          value={hotelData.state}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Preço da Diária (R$):
        <input
          type="number"
          name="price"
          value={hotelData.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Serviços Oferecidos (separados por vírgula):
        <input
          type="text"
          name="services"
          value={hotelData.services}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Descrição Completa:
        <textarea
          name="description"
          value={hotelData.description}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">{hotelToEdit ? 'Salvar Alterações' : 'Adicionar Hotel'}</button>
    </form>
  );
};
