import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
function SelectWithSearch({ onSelect, options, label }) {
    const [selectedOption, setSelectedOption] = React.useState([]);

    const handleChange = (selectedOptions) => {
        setSelectedOption(selectedOptions);
        onSelect(selectedOptions ? selectedOptions.map(option => option.value) : []);
        console.log(selectedOptions ? selectedOptions.map(option => option.value) : [])
    };
    const animatedComponents = makeAnimated();

    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
    };

    return (
        <div className="relative w-full">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Select
                id={label}
                name={label}
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder={`Seleccione una ${label}`}
                styles={customStyles}
                menuPortalTarget={document.body}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
        </div>
    );
}

export default SelectWithSearch;
