export default function Result({ result, bill, tips }) {
    if (result <= 0) {
        return null;
    }
    return (
        <h1>You pay ${result} (${bill} + ${tips}) </h1>
    )
}