import React from 'react';
import { classNames } from '../../lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  label: string;
}

export interface StepperProps {
  steps: Step[];
  currentStepIndex: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStepIndex, className }) => {
  return (
    <div className={classNames('stepper-container', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;

        return (
          <React.Fragment key={step.id}>
            <div className={classNames('stepper-step', isActive && 'active', isCompleted && 'completed')}>
              <div className="stepper-circle">
                {isCompleted ? <Check size={14} /> : (index + 1)}
              </div>
              <span className="text-label" style={{ color: isActive || isCompleted ? 'var(--color-text-neutral)' : 'var(--color-text-muted)' }}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={classNames('stepper-line', isCompleted && 'completed')} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
