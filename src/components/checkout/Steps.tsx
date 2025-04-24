
import React from 'react';
import { Check, CreditCard, MapPin, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: 'Shipping', icon: MapPin },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Review', icon: ShoppingBag },
  { id: 4, name: 'Confirmation', icon: Check },
];

export const Steps: React.FC<StepsProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-6">
      <nav className="flex justify-between">
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={cn(
              "flex flex-col items-center",
              step.id < currentStep && "text-primary"
            )}
          >
            <div 
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 mb-2",
                step.id === currentStep && "border-primary text-primary font-bold",
                step.id < currentStep && "border-primary text-red-600 text-white",
                step.id > currentStep && "border-gray-300 text-gray-300"
              )}
            >
              {step.id < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            <p 
              className={cn(
                "text-xs font-medium",
                step.id === currentStep && "text-primary font-medium",
                step.id < currentStep && "text-primary",
                step.id > currentStep && "text-gray-500"
              )}
            >
              {step.name}
            </p>
          </div>
        ))}
      </nav>
    </div>
  );
};
