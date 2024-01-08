import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

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

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

function Item({ description, quantity, packed }) {
  return (
    <li>
      <input type="checkbox" />
      <span style={packed ? { textDecoration: 'line-through' } : {}}>{quantity} {description}</span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        💼 You have X items on your list, and you already packed X (X%)
      </em>
    </footer>
  )
}

export default function App() {
  const [items, setItems] = useState(initialItems);
  return (
    <div className="app">
      <Logo />
      <Form items={items} setItems={setItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  )
}
