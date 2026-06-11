import React from 'react';
import { classNames } from '../../lib/utils';

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={classNames('tabs-container', className)}>
      <div className="tabs-list" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-disabled={tab.disabled}
            disabled={tab.disabled}
            className={classNames(
              'tab-button',
              activeTab === tab.id && 'tab-active'
            )}
            onClick={() => !tab.disabled && onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};
