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
  const [sortBy, setSortBy] = useState('input');

  let sortedItems = [];

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description') {
    sortedItems = items.slice().sort((a, b) => {
      return a.description.localeCompare(b.description)
    })
  }

  if (sortBy === 'packed') {
    sortedItems = items.slice().sort((a, b) => {
      return Number(a.packed) - Number(b.packed)
    })
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item {...item} onDeleteItem={onDeleteItem} onCheckItem={onCheckItem} key={item.id} />
        ))}
      </ul>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="actions">
        <option value="input">Sort by input orders</option>
        <option value="description">Sort by description alpha</option>
        <option value="packed">Sort by packed status</option>
      </select>
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

function Stats({ items }) {
  if (!items.length) return (
    <footer className="stats">
      <em>📝 Start adding some items to your packing list.🚀</em>
    </footer>
  )

  const numOfItems = items.length
  const numOfPackedItems = items.filter(item => item.packed).length;
  const percentage = Math.round(numOfPackedItems / numOfItems * 100);

  return (
    <footer className="stats">
      <em>
        {
          percentage === 100 ?
            '🎉 Good job! You are ready to go! ✈️' :
            `💼 You have ${numOfItems} items on your list, and you already packed ${numOfPackedItems} (${percentage}%)`
        }
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
        items={items}
      />
    </div>
  )
}
