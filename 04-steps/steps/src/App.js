import { useState, useEffect } from 'react';

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

function App() {
    const [step, setStep] = useState(1);

    useEffect(() => {
        setStep(1);
    }, [])

    function handleStepChange(newStep) {
        if (typeof newStep === 'string') {
            if (newStep === 'next') {
                setStep(step < 3 ? step + 1 : 3);
            } else if (newStep === 'previous') {
                setStep(step > 1 ? step - 1 : 1);
            }
        }

        if (typeof newStep === 'number') {
            setStep(newStep);
        }
    }

    return <div className="steps">
        <div className="numbers">
            {[1, 2, 3].map(number => <Step number={number} step={step} onClick={() => handleStepChange(number)} />)}
        </div>

        <p className="message">
            Step {step}: {messages[step - 1]}
        </p>

        <p className="buttons">
            <Button title="Previous" onClick={() => handleStepChange('previous')} />
            <Button title="Next" onClick={() => handleStepChange('next')} />
        </p>
    </div>
}

function Button({ title, onClick }) {
    return <button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={onClick}>
        {title}
    </button>
}

function Step({ number, step, onClick }) {
    return <div className={number === step ? 'active' : ''} onClick={onClick}>
        {number}
    </div>
}

export default App;