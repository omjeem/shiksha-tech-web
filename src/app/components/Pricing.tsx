"use client";

import Link from 'next/link';
import { CheckIcon } from './icons/CheckIcon';

type PricingPlanProps = {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
};

const PricingPlan = ({ name, price, description, features, isPopular = false }: PricingPlanProps) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${isPopular ? 'border-2 border-blue-500 relative' : ''}`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-900">₹{price}</span>
          <span className="text-gray-600">/month</span>
        </div>
        <Link 
          href="/register" 
          className={`block w-full py-3 px-6 rounded-lg text-center font-semibold transition-colors duration-300 ${
            isPopular 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          Get Started
        </Link>
      </div>
      <div className="bg-gray-50 p-8">
        <p className="font-semibold text-gray-700 mb-4">Includes:</p>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const plans = [
  {
    name: 'Basic',
    price: '4,999',
    description: 'Best for small schools with basic needs',
    features: [
      'Student records management',
      'Basic attendance tracking',
      'Simple fee management',
      'Up to 500 students',
      'Email support',
      '2 admin accounts'
    ]
  },
  {
    name: 'Pro',
    price: '9,999',
    description: 'Perfect for growing educational institutions',
    features: [
      'Everything in Basic',
      'Advanced reporting',
      'Staff management',
      'Parent communication portal',
      'Up to 2,000 students',
      'Priority email & phone support',
      '5 admin accounts',
      'Mobile app access'
    ],
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: '19,999',
    description: 'Complete solution for large institutions',
    features: [
      'Everything in Pro',
      'Unlimited students',
      'Custom integrations',
      'Advanced analytics dashboard',
      'Multiple branch management',
      'Dedicated account manager',
      'On-site training & support',
      'Unlimited admin accounts',
      'API access for custom needs'
    ]
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your institution's needs. All plans include core features with no hidden costs.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <PricingPlan
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              isPopular={plan.isPopular}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            Need a custom solution? We offer tailored plans for your specific needs.
          </p>
          <Link 
            href="#contact" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
          >
            Contact us for custom pricing
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 