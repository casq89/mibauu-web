import React, { useState } from 'react';

type Props = {
  items: string[];
  onSelect: (value: string) => void;
};

export const Autocomplete = ({ items, onSelect }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    search(value);
    setIsOpen(value.length > 0);
    setHighlightedIndex(-1);
    onSelect(value);
  };

  const search = (term: string) => {
    const copyItems = [...items];
    const filteredResults = copyItems.filter((result) =>
      result.toLowerCase().includes(term.toLowerCase())
    );

    setResults(filteredResults);
  };

  const handleSelect = (value: string) => {
    setSearchTerm(value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        event.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(searchTerm.length > 0)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <ul
        className={`
          absolute left-0 right-0 top-full mt-1 border border-gray-300 rounded-md 
          max-h-60 overflow-y-auto bg-white z-50 shadow-lg transition-all duration-200 ease-out
          ${
            isOpen && results.length > 0
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }
        `}
      >
        {results.map((result, index) => (
          <li
            key={index}
            onMouseDown={() => handleSelect(result)}
            onClick={() => handleSelect(result)}
            className={`cursor-pointer transition-colors p-3 ${
              index === highlightedIndex
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100 text-black'
            }`}
          >
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
};
