export default function BillInput({ bill, onInput }) {
    return (
        <div>
            <label htmlFor="bill">How much was the bill?</label>
            <input value={bill} type="number" id="bill" step={0.01} onInput={onInput} />
        </div>
    )
}