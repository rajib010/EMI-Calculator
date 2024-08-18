import React, { useState } from 'react';

function App() {
  const tenureData = [12, 24, 36, 48, 60];
  const [cost, setCost] = useState<number | string>(0);
  const [interest, setInterest] = useState<number | string>(10);
  const [processingFee, setProcessingFee] = useState<number | string>(1);
  const [downPayment, setDownPayment] = useState<number | string>(0);
  const [tenure, setTenure] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number | string>(0);

  const updateDownPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lm = Number(e.target.value);
    setLoanAmount(lm);
    setDownPayment(cost ? Number(cost) - lm : 0);
  };

  const updateLoanAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dp = Number(e.target.value);
    setDownPayment(dp);
    setLoanAmount(cost ? Number(cost) - dp : 0);
  };

  const calculateEmi = (loanAmount: number): number => {
    if (!interest || !tenure || tenure <= 0) return 0;

    const monthlyInterest = Number(interest) / (12 * 100); // Convert annual to monthly
    const emi = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, tenure)) /
      (Math.pow(1 + monthlyInterest, tenure) - 1);

    return emi;
  };

  const emi = calculateEmi(Number(loanAmount));

  return (
    <div className='flex flex-col w-full gap-3 p-4'>
      <h1>EMI Calculator</h1>
      <p>Total cost of the asset</p>
      <input
        className='border max-w-md border-red-600'
        type="number"
        value={cost}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newCost = e.target.value === '' ? '' : Number(e.target.value);
          setCost(newCost);
          if (newCost === '' || downPayment === '') {
            setDownPayment('');
            setLoanAmount('');
          } else {
            setDownPayment(Math.min(Number(downPayment), Number(newCost)));
            setLoanAmount(Math.max(0, Number(newCost) - Number(downPayment)));
          }
        }}
        placeholder='Enter total cost'
      />
      <p>Interest Rate (in %)</p>
      <input
        className='border max-w-md border-red-600'
        type="number"
        value={interest}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newInterest = e.target.value === '' ? '' : Number(e.target.value);
          setInterest(newInterest);
        }}
        placeholder='Enter rate of interest'
      />
      <p>Processing Fee (in %)</p>
      <input
        className='border max-w-md border-red-600'
        type="number"
        value={processingFee}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const newProcessingFee = e.target.value === '' ? '' : Number(e.target.value);
          setProcessingFee(newProcessingFee);
        }}
        placeholder='Enter processing fee'
      />

      <h3>Down Payment</h3>
      <div className='flex flex-col gap-3 w-[90vw] m-auto'>
        <p>Total down payment - Rs. {downPayment}</p>
        <input
          type="range"
          min={0}
          max={Number(cost)}
          value={downPayment}
          onChange={updateLoanAmount}
        />
        <div className='flex w-full flex-row justify-between gap-2'>
          <label>0</label>
          <label>{downPayment}</label>
          <label>{cost}</label>
        </div>
      </div>

      <h3>Loan Amount</h3>
      <div className='flex flex-col gap-3 w-[90vw] m-auto'>
        <p>Total Loan Amount - Rs. {loanAmount}</p>
        <input
          type="range"
          min={0}
          max={Number(cost)}
          value={loanAmount}
          onChange={updateDownPayment}
        />
        <div className='flex w-full flex-row justify-between gap-2'>
          <label>0</label>
          <label>{loanAmount}</label>
          <label>{Number(cost) - Number(downPayment)}</label>
        </div>
      </div>

      <p>Tenure</p>
      <div className='flex flex-row gap-3'>
        {tenureData.map((month, index) => (
          <button
            className={`w-[10vw] rounded-lg p-3 ${tenure === month ? "bg-blue-500" : "bg-slate-400"}`}
            key={index}
            onClick={() => setTenure(month)}
          >
            {month}
          </button>
        ))}
      </div>

      {tenure > 0 && (
        <div className='mt-4'>
          <h3>Calculated EMI</h3>
          <p>Rs. {emi.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default App;
