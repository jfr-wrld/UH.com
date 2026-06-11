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
  errorSteps?: number[];
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStepIndex, className, errorSteps = [] }) => {
  return (
    <div className={classNames('stepper-container', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isError = errorSteps.includes(index);

        return (
          <React.Fragment key={step.id}>
            <div className={classNames('stepper-step', isActive && 'active', isCompleted && 'completed', isError && 'error')}>
              <div className="stepper-circle" style={isError ? { backgroundColor: 'var(--surface-danger)', color: 'var(--color-danger)', borderColor: 'var(--color-danger)' } : {}}>
                {isCompleted && !isError ? <Check size={14} /> : (isError ? '!' : (index + 1))}
              </div>
              <span className="text-label" style={{ color: isError ? 'var(--color-danger)' : (isActive || isCompleted ? 'var(--color-text-neutral)' : 'var(--color-text-muted)') }}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={classNames('stepper-line', isCompleted && 'completed')} style={isError ? { backgroundColor: 'var(--color-danger)' } : {}} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
