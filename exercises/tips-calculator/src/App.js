import { useState } from "react";
import BillInput from "./BillInput";
import SelectPercentage from "./SelectPercentage";
import Result from "./Result";
import ResetBtn from "./ResetBtn";

function App() {
  const [bill, setBill] = useState(0.00);
  const [tipsYours, setTipsYours] = useState(0);
  const [tipsFriends, setTipsFriends] = useState(0);

  let tipsTotal = (Number(bill) * ((Number(tipsYours) + Number(tipsFriends)) / 2 / 100)).toFixed(2);

  let totalAmount = (Number(bill) + Number(tipsTotal)).toFixed(2);

  let formattedBill = Number(bill).toFixed(2);
  return (
    <div>
      <BillInput
        bill={bill}
        onInput={event => setBill(event.target.value)}
      />
      <SelectPercentage
        label="How did you like the services?"
        id="tips-yours"
        value={tipsYours}
        onChange={event => setTipsYours(event.target.value)}
      />
      <SelectPercentage
        label="How did your friends like the services?"
        id="tips-friends"
        value={tipsFriends}
        onChange={event => setTipsFriends(event.target.value)}
      />
      <Result
        result={totalAmount}
        bill={formattedBill}
        tips={tipsTotal}
      />
      <ResetBtn
        onClick={() => {
          setBill(0.00);
          setTipsYours(0);
          setTipsFriends(0);
        }}
      />
    </div>
  );
}

export default App;
