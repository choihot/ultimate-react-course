export default function Stats({ items }) {
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
