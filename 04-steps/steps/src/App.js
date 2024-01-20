import { useState, useEffect } from 'react';

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

function App() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

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

    return (
        <>
            <button className="close" onClick={() => setIsOpen(!isOpen)}>&times;</button>
            {isOpen &&
                (<div className="steps">
                    <div className="numbers">
                        {[1, 2, 3].map(number => <Step number={number} step={step} onClick={() => handleStepChange(number)} key={number} />)}
                    </div>

                    <p className="message">
                        <StepMessage step={step}>
                            {messages[step - 1]}
                        </StepMessage>
                    </p>

                    <p className="buttons">
                        <Button
                            onClick={() => handleStepChange('previous')}
                            bgColor="#7950f2"
                            textColor="#fff"
                        >
                            <span>👈</span> Previous
                        </Button>
                        <Button
                            onClick={() => handleStepChange('next')}
                            bgColor="#7950f2"
                            textColor="#fff"
                        >
                            <span>👉</span> Next
                        </Button>
                    </p>
                </div>)
            }
        </>
    )
}

function Button({ onClick, textColor, bgColor, children }) {
    return <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>
        {children}
    </button>
}

function Step({ number, step, onClick }) {
    return <div className={number <= step ? 'active' : ''} onClick={onClick}>
        {number}
    </div>
}

function StepMessage({ step, children }) {
    return (<div className="message">
        <h3> Step {step}: </h3>
        {children}
    </div>)
}

export default App;