import React from 'react';

/**
 * SearchInput Component - Prominent search bar for the Hero section
 * @param {string} value - Current search query
 * @param {function} onChange - Handler for search query change
 * @param {string} placeholder - Input placeholder
 * @param {string} className - Optional additional classes
 * @param {function} onSearch - Handler for performing search
 */
const SearchInput = ({
  value,
  onChange,
  placeholder = '¿Qué estás buscando en la frontera?',
  className = '',
  onSearch,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-6 w-6 text-neutral-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className="block w-full pl-12 pr-4 py-4 md:py-6 bg-white border-0 rounded-2xl shadow-large focus:ring-2 focus:ring-primary-500 text-neutral-900 placeholder-neutral-400 text-lg md:text-xl transition-all duration-300"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute inset-y-0 right-0 py-2 pr-2 hidden md:flex">
        <button
          onClick={() => onSearch && onSearch(value)}
          className="bg-primary-800 text-white px-8 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-medium active:scale-95"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
