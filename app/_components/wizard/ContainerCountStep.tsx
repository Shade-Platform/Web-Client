import React from 'react';

interface ContainerCountStepProps {
  answers: {
    containerCount: string;
  };
  handleRadioChange: (name: string, value: string) => void;
}

const ContainerCountStep: React.FC<ContainerCountStepProps> = ({ answers, handleRadioChange }) => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">How many containers will you use?</p>
      <div className="space-y-4">
        {['0-5', '6-10', '10+'].map((count) => (
          <label key={count} className="flex items-center space-x-2">
            <input
              type="radio"
              name="count"
              value={count}
              checked={answers.containerCount === count}
              onChange={() => handleRadioChange('containerCount', count)}
              className="form-radio text-blue-500"
            />
            <span>{count}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ContainerCountStep;
