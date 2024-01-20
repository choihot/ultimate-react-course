import { useState } from "react";

export default function Form({ items, setItems }) {
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
