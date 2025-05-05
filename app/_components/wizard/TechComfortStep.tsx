import React from 'react';

interface TechComfortStepProps {
  answers: {
    techComfort: string;
  };
  handleRadioChange: (name: string, value: string) => void;
}

const TechComfortStep: React.FC<TechComfortStepProps> = ({ answers, handleRadioChange }) => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">What is your technical comfort level?</p>
      <div className="space-y-4">
        {['beginner', 'intermediate', 'expert'].map((level) => (
          <label key={level} className="flex items-center space-x-2">
            <input
              type="radio"
              name="comfort"
              value={level}
              checked={answers.techComfort === level}
              onChange={() => handleRadioChange('techComfort', level)}
              className="form-radio text-blue-500"
            />
            <span className="capitalize">{level}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TechComfortStep;
