import React, { useState, useEffect } from 'react';
import SelectWithSearch from './SelectWithSearch';
import axios from 'axios';

function Filtros({ onFilter }) {

    const [marca, setMarca] = useState([]);
    const [modelo, setModelo] = useState([]);
    const [marcasOptions, setMarcasOptions] = useState([]);
    const [modelosOptions, setModelosOptions] = useState([]);

    useEffect(() => {
        // Cargar marcas
        axios.get("http://localhost:4000/datos/marcas")
            .then(response => {
                const options = response.data.map((marca) => ({
                    value: marca.id,
                    label: marca.descripcion
                }));
                setMarcasOptions(options);
            })
            .catch(error => console.error('Error al cargar marcas:', error));

        // Cargar modelos
        axios.get("http://localhost:4000/datos/modelos")
            .then(response => {
                const options = response.data.map((modelo) => ({
                    value: modelo.id,
                    label: modelo.descripcion
                }));
                setModelosOptions(options);
            })
            .catch(error => console.error('Error al cargar modelos:', error));
    }, []);

    const handleFilter = () => {
        onFilter({  marca, modelo });
    };

    return (
        <div className="filtros-container">
      {/*       <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
            </div>
 */}
            <SelectWithSearch onSelect={setMarca} options={marcasOptions} label="Marca" />
            
            <SelectWithSearch onSelect={setModelo} options={modelosOptions} label="Modelo" />

            <button
                onClick={handleFilter}
                style={{padding:"5px", marginTop:"5px"} }
            >
                Filtrar
            </button>
        </div>
    );
}

export default Filtros;
