import React from 'react';
import { classNames } from '../../lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface StepperProps {
  steps: Step[];
  currentStepIndex: number;
  className?: string;
  errorSteps?: number[];
  onStepClick?: (stepIndex: number) => void;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStepIndex, className, errorSteps = [], onStepClick }) => {
  return (
    <div className={classNames('stepper-container', className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isError = errorSteps.includes(index);
        const clickable = onStepClick !== undefined;

        return (
          <div key={step.id} style={{ display: 'contents' }}>
            <div 
              className={classNames('stepper-step', isActive && 'active', isCompleted && 'completed', isError && 'error')}
              onClick={() => { if (clickable) onStepClick(index); }}
              style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
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
          </div>
        );
      })}
    </div>
  );
};
