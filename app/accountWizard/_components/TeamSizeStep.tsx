import React from 'react';

interface TeamSizeStepProps {
  answers: {
    teamSize: string;
  };
  handleRadioChange: (name: string, value: string) => void;
}

const TeamSizeStep: React.FC<TeamSizeStepProps> = ({ answers, handleRadioChange }) => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">How big is your team?</p>
      <div className="space-y-4">
        {['1-5', '6-15', '15+'].map((size) => (
          <label key={size} className="flex items-center space-x-2">
            <input
              type="radio"
              name="team"
              value={size}
              checked={answers.teamSize === size}
              onChange={() => handleRadioChange('teamSize', size)}
              className="form-radio text-blue-500"
            />
            <span>{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TeamSizeStep;
