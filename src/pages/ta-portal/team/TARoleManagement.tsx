import React from 'react';
import { PageHeader } from '../../../components/layout/PageHeader';
import { Button } from '../../../components/actions/Button';

export function TARoleManagement() {
  return (
    <div>
      <PageHeader
        title="Role Management"
        actions={
          <Button variant="primary">Create Custom Role</Button>
        }
      />
      <div className="mt-6 bg-surface rounded-lg shadow-sm border border-border p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Role Management</h3>
        <p className="text-text-secondary">
          Phase 1 currently relies on default system templates. Custom permission groups will be enabled in a future phase.
        </p>
      </div>
    </div>
  );
}
