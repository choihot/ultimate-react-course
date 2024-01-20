export default function Item({ description, quantity, packed, id, onDeleteItem, onCheckItem }) {
    return (
        <li>
            <input type="checkbox" value={packed} onChange={() => onCheckItem(id)} />
            <span style={packed ? { textDecoration: 'line-through' } : {}}>{quantity} {description}</span>
            <button onClick={() => onDeleteItem(id)}>❌</button>
        </li>
    )
}