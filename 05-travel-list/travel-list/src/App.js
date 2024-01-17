import { useState } from "react";

function Logo() {
  return <h1>✈️ Far Away 📝</h1>
}

function Form({ items, setItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function clearForm() {
    setDescription("");
    setQuantity(1);
  }

  function submitHandler(e) {
    e.preventDefault();

    if (!description) return;

    setItems([...items, { id: items.length + 1, description: description, quantity: quantity, packed: false }]);
    clearForm();
  }

  return (
    <form className="add-form" onSubmit={submitHandler}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
      >
        ({Array.from({ length: 20 }, (_, i) => { return i = i + 1 }).map((number) => {
          return <option value={number} key={number}>{number}</option>
        })
        })
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  )
}

function PackingList({ items, onDeleteItem, onCheckItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item {...item} onDeleteItem={onDeleteItem} onCheckItem={onCheckItem} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ description, quantity, packed, id, onDeleteItem, onCheckItem }) {
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => onCheckItem(id)} />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>{quantity} {description}</span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  )
}

function Stats({ numOfItems, numOfPackedItems, percentage }) {
  return (
    <footer className="stats">
      <em>
        💼 You have {numOfItems} items on your list, and you already packed {numOfPackedItems} ({percentage}%)
      </em>
    </footer>
  )
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleCheckItem(id) {
    setItems(items => items.map(item => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }
      return item;
    }));
  }

  const numOfItems = items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const numOfPackedItems = items.filter(item => item.packed).reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  const percentage = numOfItems ? Math.floor(numOfPackedItems / numOfItems * 100) : 0;

  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckItem}
      />
      <Stats
        numOfItems={numOfItems}
        numOfPackedItems={numOfPackedItems}
        percentage={percentage}
      />
    </div>
  )
}
