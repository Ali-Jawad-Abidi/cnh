import { useState } from "react";

function NumberInputList() {
  const [items, setItems] = useState([]);

  const handleInputChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].numberInput = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { text: "", numberInput: "" }]);
  };

  const renderItems = () => {
    return (
      items.map,
      (item, index) => (
        <div key={index} className="flex flex-row">
          <input
            type="text"
            name="title"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Title"
            required
            value={title}
            maxlength="30"
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
          {/* <input
            type="text"
            value={item.text}
            onChange={(e) => handleTextChange(index, e.target.value)}
            placeholder="Enter text"
          /> */}
          <input
            type="number"
            value={item.numberInput}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Enter number"
          />
        </div>
      )
    );
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      {renderItems()}
      {/* <div>
        <strong>Values in State:</strong>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </div> */}
    </div>
  );
}

export default NumberInputList;
