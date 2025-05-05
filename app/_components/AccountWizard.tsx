'use client';

import React, { useState, useEffect } from 'react';
import WizardStepWrapper from './WizardStepWrapper';
import UsageIntentStep from './wizard/UsageIntentStep';
import ContainerCountStep from './wizard/ContainerCountStep';
import TeamSizeStep from './wizard/TeamSizeStep';
import TechComfortStep from './wizard/TechComfortStep';
import PrioritiesStep from './wizard/PrioritiesStep';
import RecommendationStep from '../_components/wizard/RecommendationStep';

interface Recommendation {
  name: string;
  price: string;
  features: string[];
  ctaLink: string;
}

const AccountWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    usageIntent: '',
    containerCount: '',
    teamSize: '',
    techComfort: '',
    priorities: [],
    recommendation: null as Recommendation | null,
  });
  const [isClient, setIsClient] = useState(false);

  // Handle radio button changes for various steps
  const handleRadioChange = (name: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  // Handle checkbox changes for multiple values (priorities)
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setAnswers((prevAnswers) => {
      const updatedPriorities = checked
        ? [...prevAnswers.priorities, value]
        : prevAnswers.priorities.filter((priority) => priority !== value);

      return {
        ...prevAnswers,
        [name]: updatedPriorities,
      };
    });
  };

  const recommendPlan = (): Recommendation => {
    if (answers.usageIntent === 'enterprise') {
      return {
        name: 'Enterprise',
        price: 'EGP 1500',
        features: [
          'Dedicated Resources',
          'Custom Storage Limit',
          'Real-time Backups',
          'Enterprise Support',
          '4h Response Time SLA',
          'Advanced Security',
          'Custom Integration',
          'Compliance Reports',
        ],
        ctaLink: '/contact-us',
      };
    } else if (answers.containerCount === 'high') {
      return {
        name: 'Premium',
        price: 'EGP 500',
        features: [
          '10 Containers',
          '5GB Storage',
          'Hourly Backups',
          'Advanced Monitoring',
          'Priority Support',
          '24h Response Time',
          'Audit Logging',
          'Role-Based Access',
        ],
        ctaLink: '/start-free-trial',
      };
    } else {
      return {
        name: 'Free',
        price: 'EGP 0',
        features: [
          '2 Container Instances',
          '2GB Storage',
          'Daily Backups',
          'Basic Monitoring',
          'Community Support',
          '48h Response Time',
        ],
        ctaLink: '/get-started',
      };
    }
  };

  // useEffect to set the recommendation when currentStep reaches 6
  useEffect(() => {
    if (currentStep === 6 && !answers.recommendation) {
      const recommendedPlan = recommendPlan();
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        recommendation: recommendedPlan,
      }));
    }
  }, [currentStep, answers.recommendation]);

  // Set client-side check once mounted
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextStep = () => {
    setCurrentStep((prevStep) => (prevStep < 6 ? prevStep + 1 : prevStep));
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Account Creation Wizard</h1>
      <p className="text-lg text-muted-foreground mb-10">Follow the steps below to create your account</p>

      {/* Step Wrapper with logic */}
      <WizardStepWrapper>
      {currentStep === 1 && (
          <div className="border p-6 rounded-lg mb-6">
            <UsageIntentStep answers={answers} handleRadioChange={handleRadioChange} />
          </div>
        )}
        {currentStep === 2 && (
          <div className="border p-6 rounded-lg mb-6">
            <ContainerCountStep answers={answers} handleRadioChange={handleRadioChange} />
          </div>
        )}
        {currentStep === 3 && (
          <div className="border p-6 rounded-lg mb-6">
            <TeamSizeStep answers={answers} handleRadioChange={handleRadioChange} />
          </div>
        )}
        {currentStep === 4 && (
          <div className="border p-6 rounded-lg mb-6">
            <TechComfortStep answers={answers} handleRadioChange={handleRadioChange} />
          </div>
        )}
        {currentStep === 5 && (
          <div className="border p-6 rounded-lg mb-6">
            <PrioritiesStep answers={answers} handleCheckboxChange={handleCheckboxChange} />
          </div>
        )}
        {currentStep === 6 && answers.recommendation && (
          <div className="border p-6 rounded-lg mb-6">
            <RecommendationStep recommendedPlan={answers.recommendation} />
          </div>
        )}
      </WizardStepWrapper>

      {/* Final Message after recommendation step */}
      {isClient && currentStep > 6 && (
        <div className="mt-6 p-6 border rounded bg-green-100">
          <p className="text-xl font-semibold">Thank you for completing the wizard!</p>
          <p>Your plan recommendation is ready. You can proceed with the suggested plan or explore other options.</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        {/* Previous button will be hidden for the first question */}
        {currentStep > 1 && (
          <button
            onClick={previousStep}
            className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Previous
          </button>
        )}
        {}
        {currentStep !== 6 && (
  <button
    onClick={nextStep}
    className="bg-primary text-white font-semibold px-4 py-2 rounded-lg ml-auto"
  >
    Next
  </button>
)}

      </div>
    </div>
  );
};

export default AccountWizard;
