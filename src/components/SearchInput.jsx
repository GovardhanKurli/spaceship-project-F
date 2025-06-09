
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/SearchInput.css';
import ThreeAnimation from './ThreeAnimation';

const api = {
  Drinks: [
    { name: 'Coke', link: '/drinks/coke' },
    { name: 'Pepsi', link: '/drinks/pepsi' }
  ],
  Froots: [
    { name: 'Apple', link: '/froots/apple' },
    { name: 'Banana', link: '/froots/banana' }
  ],
  Food: [
    { name: 'Pizza', link: '/food/pizza' },
    { name: 'Burger', link: '/food/burger' }
  ],
  Vegetable: [
    { name: 'Carrot', link: '/vegetable/carrot' },
    { name: 'Broccoli', link: '/vegetable/broccoli' }
  ],
  Veg: [
    { name: 'Salad', link: '/veg/salad' },
    { name: 'Pasta', link: '/veg/pasta' }
  ],
  NonVeg: [
    { name: 'Chicken', link: '/nonveg/chicken' },
    { name: 'Fish', link: '/nonveg/fish' }
  ],
  NonVeg2: [
    { name: 'Chicken', link: '/nonveg/chicken' },
    { name: 'Fish', link: '/nonveg/fish' }
  ],
  Veg22: [
    { name: 'Chicken', link: '/nonveg/chicken' },
    { name: 'Fish', link: '/nonveg/fish' }
  ],
  Veg23: [
    { name: 'Chicken', link: '/nonveg/chicken' },
    { name: 'Fish', link: '/nonveg/fish' }
  ],
  Veg24: [
    { name: 'Chicken', link: '/nonveg/chicken' },
    { name: 'Fish', link: '/nonveg/fish' }
  ],
};

export default function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const [apiData, setApiData] = useState([]);
  const [placeholderText, setPlaceholderText] = useState('Start typing...');
  const [showError  ,  setShowError] = useState(false);
  useEffect(() => {
    const typingEffect = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    typingEffect.to({}, { duration: 0.5 }).call(() => {
      let currentText = '';
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < placeholderText.length) {
          currentText += placeholderText[index];
          setPlaceholderText(currentText);
          index++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => setPlaceholderText(''), 1000);
        }
      }, 150);
    });
    return () => typingEffect.kill();
  }, [placeholderText]);

  const handleSearch = () => {
    const results = Object.values(api)
      .flat()
      .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()));
    setApiData(results);

    if (inputValue.trim()) {
      handleSearch();
    } else {
      alert("Please enter a search term.");
    }
    
  };

  return (
    <div className="search-animation-container">
      <div className="animation-background">
        <ThreeAnimation />
      </div>
      <div className="search-container">
        <div className="search-input">
          <span className="search-text">Search for Food and Drinks… *</span>
          <input
    className={`domain-input ${!inputValue && showError ? 'input-error' : ''}`}
    type="text"
    placeholder={showError ? 'Please enter a search term.' : placeholderText}
    value={inputValue}
    onChange={(e) => {
      setInputValue(e.target.value);
      if (e.target.value) {
        setShowError(false); // Hide error once user starts typing
      }
    }}
    onKeyPress={(e) => {
      if (e.key === 'Enter' && inputValue.trim()) {
        handleSearch();
      } else if (e.key === 'Enter') {
        setShowError(true); // Show error if input is empty
      }
    }}
  />
  <p className="quotation">
    "Empower your meals: discover calories and health facts for every food you love."
  </p>
  <button
    onClick={() => {
      if (inputValue.trim()) {
        handleSearch();
      } else {
        setShowError(true); // Show error if input is empty
      }
    }}
    className="button-17"
    role="button"
  >
    Search
  </button>
  </div>

        <div className="search-results">
          {apiData.length > 0 ? (
  apiData.map((item, index) => {
   
      return (
        <div key={index}>
          <a href={item.link}>{item.name}</a>
        </div>
      );
    
  })
) : (
  <p></p>
)}

        </div>
      </div>
    </div>
  );
}
