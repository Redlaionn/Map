import React, { useEffect, useState } from 'react';
import './App.css';
import Mapa from './Components/Map.js';
import Filtros from './Components/Filtros.js';
import axios from 'axios';

function App() {
    const [localizacion, setLocalizacion] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:4000/datos")
            .then(response => {
                setLocalizacion(response.data);
                setFilteredItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);
    
    const handleFilter = (filters) => {
        setLoading(true);
        const filtered = localizacion.filter(item => {
            let banderaModelo = true
            let banderaMarca = true

            if (filters.marca.length > 0){
                if 
                (filters.marca.includes(parseInt(item.marca))){
                    banderaMarca = true
                }else{
                    banderaMarca = false
                }
                
            }
            if (filters.modelo.length > 0){
                if (filters.modelo.includes(parseInt(item.modelo))){
                    banderaModelo = true
                }else{
                    banderaModelo = false
                }              
            }

             if (banderaMarca === true && banderaModelo === true ){
                    return true; 
             } else
             {
                return false;
             }
        }
            // item.modelo.includes(filters.modelo)  &&
            // item.marca.includes(filters.marca)  
           
        );
        setFilteredItems(filtered);
        console.log(filtered)
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }
    if (error) return <p>{error}</p>;

    return (
        <div className="App">
            <p >Sistema de Geolocalizacion del Grupo Garden</p>
            <div className="map-container"> 
                <Filtros onFilter={handleFilter} />
                 <Mapa items={filteredItems} /> 
          </div>
             
        </div>
    );
}

export default App;
