"use client";
import React, { useState, useRef } from "react";
import styles from "./page.module.css";

export default function AutoCompleteInput() {
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const inputRef = useRef(null);

  const items = ["Item1", "Item2", "Item3", "Item4", "Item5"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (item) => {
    setSelectedItems([...selectedItems, item]);
    setFilteredItems(filteredItems.filter((i) => i !== item));
    setInputValue("");
    inputRef.current.focus();
  };

  const handleChipRemove = (item) => {
    setSelectedItems(selectedItems.filter((i) => i !== item));
    setFilteredItems([...filteredItems, item]);
    inputRef.current.focus();
  };

  return (
    <div className={styles.autoCompleteInput}>
      <div className={styles.chipsContainer}>
        {selectedItems.map((item) => (
          <div key={item} className={styles.chip}>
            {item}
            <span onClick={() => handleChipRemove(item)}>X</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        ref={inputRef}
        className={styles.inputbox}
      />
      <ul className={styles.itemList}>
        {filteredItems.map((item) => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
