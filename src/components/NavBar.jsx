import React, { useState, useEffect } from "react";
import "../styles/NavBar.css";

//checking
export default function NavBar() {
  const [dropdownData, setDropdownData] = useState({
    Drinks: [
      { name: "Coke", link: "/drinks/coke" },
      { name: "Pepsi", link: "/drinks/pepsi" },
    ],
    Froots: [
      { name: "Apple", link: "/froots/apple" },
      { name: "Banana", link: "/froots/banana" },
    ],
    Food: [
      { name: "Pizza", link: "/food/pizza" },
      { name: "Burger", link: "/food/burger" },
    ],
    Vegetable: [
      { name: "Carrot", link: "/vegetable/carrot" },
      { name: "Broccoli", link: "/vegetable/broccoli" },
    ],
    Veg: [
      { name: "Salad", link: "/veg/salad" },
      { name: "Pasta", link: "/veg/pasta" },
    ],
    NonVeg: [
      { name: "Chicken", link: "/nonveg/chicken" },
      { name: "Fish", link: "/nonveg/fish" },
    ],
  });

  const [openDropdown, setOpenDropdown] = useState();

  const fetchDropdownData = async () => {
    try {
      const response = await fetch(); // change to your API
      const data = await response.json();
      // setDropdownData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
    }
  };

  console.log("dufcvjgvbc", dropdownData);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  return (
    <nav className="navbar">
      <img
        src="https://tse2.mm.bing.net/th?id=OIP.o8Sw2mQtlVwcMk40MimrAQHaEK&pid=Api&P=0&h=180"
        alt="Logo"
        className="logo"
      />{" "}
      {/* Add your logo path here */}
      <ul className="nav-links">
        <li
          onMouseEnter={() => setOpenDropdown("Drinks")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          Drinks
          {openDropdown === "Drinks" && (
            <div className="dropdown">
              {dropdownData.Drinks.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => setOpenDropdown("Froots")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          Froots
          {openDropdown === "Froots" && (
            <div className="dropdown">
              {dropdownData.Froots.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => setOpenDropdown("Food")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          Food
          {openDropdown === "Food" && (
            <div className="dropdown">
              {dropdownData.Food.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => setOpenDropdown("Vegetable")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          Vegetable
          {openDropdown === "Vegetable" && (
            <div className="dropdown">
              {dropdownData.Vegetable.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => setOpenDropdown("Veg")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          Veg
          {openDropdown === "Veg" && (
            <div className="dropdown">
              {dropdownData.Veg.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li
          onMouseEnter={() => setOpenDropdown("NonVeg")}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          NonVeg
          {openDropdown === "NonVeg" && (
            <div className="dropdown">
              {dropdownData.NonVeg.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </div>
          )}
        </li>
        <li>Explore all</li>
      </ul>
    </nav>
  );
}
