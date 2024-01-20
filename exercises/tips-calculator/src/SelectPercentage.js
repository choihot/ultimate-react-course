export default function SelectPercentage({ label, value, id, onChange }) {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <select value={value} id={id} onChange={onChange}>
                <option value="0">Dissatisfied 0</option>
                <option value="5">It was Okay 5%</option>
                <option value="10">It was good 10%</option>
                <option value="20">Absolutely amazing 20%</option>
            </select>
        </div>
    )
}