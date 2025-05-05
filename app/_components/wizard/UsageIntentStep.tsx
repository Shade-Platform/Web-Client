import React from 'react';

interface UsageIntentStepProps {
  answers: {
    usageIntent: string;
  };
  handleRadioChange: (name: string, value: string) => void;
}

const UsageIntentStep: React.FC<UsageIntentStepProps> = ({ answers, handleRadioChange }) => {
  return (
    <div>
      <p className="font-bold text-lg mb-4">What do you intend to use this app for?</p>
      
      <div className="space-y-4">
        <label className="flex items-center space-x-2">
          <input 
            type="radio" 
            name="usage" 
            value="hosting" 
            checked={answers.usageIntent === 'hosting'} 
            onChange={() => handleRadioChange('usageIntent', 'hosting')} 
            className="form-radio text-blue-500"
          /> 
          <span>Hosting secure apps or websites</span>
        </label>

        <label className="flex items-center space-x-2">
          <input 
            type="radio" 
            name="usage" 
            value="development" 
            checked={answers.usageIntent === 'development'} 
            onChange={() => handleRadioChange('usageIntent', 'development')} 
            className="form-radio text-blue-500"
          /> 
          <span>Managing development environments</span>
        </label>

        <label className="flex items-center space-x-2">
          <input 
            type="radio" 
            name="usage" 
            value="containers" 
            checked={answers.usageIntent === 'containers'} 
            onChange={() => handleRadioChange('usageIntent', 'containers')} 
            className="form-radio text-blue-500"
          /> 
          <span>Running containers at scale</span>
        </label>

        <label className="flex items-center space-x-2">
          <input 
            type="radio" 
            name="usage" 
            value="monitoring" 
            checked={answers.usageIntent === 'monitoring'} 
            onChange={() => handleRadioChange('usageIntent', 'monitoring')} 
            className="form-radio text-blue-500"
          /> 
          <span>Logging and monitoring</span>
        </label>

        <label className="flex items-center space-x-2">
          <input 
            type="radio" 
            name="usage" 
            value="storage" 
            checked={answers.usageIntent === 'storage'} 
            onChange={() => handleRadioChange('usageIntent', 'storage')} 
            className="form-radio text-blue-500"
          /> 
          <span>Secure file storage or backups</span>
        </label>
      </div>
    </div>
  );
};

export default UsageIntentStep;
