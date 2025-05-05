import React from 'react';

interface PrioritiesStepProps {
  answers: {
    priorities: string[];
  };
  handleCheckboxChange: (name: string, value: string, checked: boolean) => void;
}

const PrioritiesStep: React.FC<PrioritiesStepProps> = ({ answers, handleCheckboxChange }) => {
  const priorities = ['scaling', 'team', 'logs'];

  return (
    <div>
      <p className="font-bold text-lg mb-4">What are your top priorities?</p>
      <div className="space-y-4">
        {priorities.map((priority) => (
          <label key={priority} className="flex items-center space-x-2 capitalize">
            <input
              type="checkbox"
              checked={answers.priorities.includes(priority)}
              onChange={(e) => handleCheckboxChange('priorities', priority, e.target.checked)}
              className="form-checkbox text-blue-500"
            />
            <span>{priority}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PrioritiesStep;