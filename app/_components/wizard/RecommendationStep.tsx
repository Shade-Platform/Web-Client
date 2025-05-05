import React from 'react';

interface RecommendationStepProps {
  recommendedPlan: {
    name: string;
    price: string;
    features: string[];
    ctaLink: string;
  };
}

const RecommendationStep: React.FC<RecommendationStepProps> = ({ recommendedPlan }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Recommended Plan: {recommendedPlan.name}
      </h2>
      <p className="mb-2">Price: {recommendedPlan.price}</p>
      <div className="space-y-1 mb-4">
        {recommendedPlan.features.map((feature) => (
          <div key={feature}>{feature}</div>
        ))}
      </div>
      <a href={recommendedPlan.ctaLink}>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Get Started
        </button>
      </a>
    </div>
  );
};

export default RecommendationStep;
