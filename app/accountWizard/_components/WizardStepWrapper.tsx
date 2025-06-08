// app/_components/WizardStepWrapper.tsx
import React from 'react';


interface WizardStepWrapperProps {
  children: React.ReactNode;
}

const WizardStepWrapper: React.FC<WizardStepWrapperProps> = ({ children }) => {
  return (
    <div className="step-wrapper transition-all duration-300 ease-in-out">
      {children}
    </div>
  );
};

export default WizardStepWrapper;
