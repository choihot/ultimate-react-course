import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, onDeleteItem, onCheckItem, onClearList }) {
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
            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input orders</option>
                    <option value="description">Sort by description alpha</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>

    )
}