import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '../../../components/actions/Button';

interface TAAssignMutawwifModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupTrip: any;
  onSuccess: () => void;
}

export const TAAssignMutawwifModal: React.FC<TAAssignMutawwifModalProps> = ({
  isOpen,
  onClose,
  groupTrip,
  onSuccess
}) => {
  const [mutawwifs, setMutawwifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [selectedMutawwif, setSelectedMutawwif] = useState('');
  const [role, setRole] = useState('lead_mutawwif');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchMutawwifs();
      setSelectedMutawwif('');
      setError('');
    }
  }, [isOpen]);

  const fetchMutawwifs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/ta/mutawwif');
      const data = await response.json();
      setMutawwifs(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load mutawwifs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMutawwif) {
      setError('Please select a Mutawwif');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const response = await fetch('http://localhost:3001/api/ta/mutawwif/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mutawwifId: selectedMutawwif,
          groupTripId: groupTrip.id,
          assignmentRole: role,
          startsAt: groupTrip.departureDate,
          endsAt: groupTrip.returnDate
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to assign mutawwif');
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to assign mutawwif. They might already be assigned to this trip.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Assign Mutawwif</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start gap-2">
              <AlertTriangle size={16} className="mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group Trip</label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-600 font-medium">
              {groupTrip?.tripName || 'Selected Trip'}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Mutawwif</label>
            {loading ? (
              <div className="text-sm text-gray-500">Loading eligible mutawwifs...</div>
            ) : (
              <select
                value={selectedMutawwif}
                onChange={(e) => setSelectedMutawwif(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                required
              >
                <option value="">-- Choose Mutawwif --</option>
                {mutawwifs.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.availability === 'conflict' ? 'Has Conflicts' : 'Available'})
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="lead_mutawwif">Lead Mutawwif</option>
              <option value="assistant_mutawwif">Assistant Mutawwif</option>
              <option value="ziyarah_guide">Ziyarah Guide</option>
            </select>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={saving}>Cancel</Button>
          <Button onClick={handleSubmit} isLoading={saving}>Confirm Assignment</Button>
        </div>
      </div>
    </div>
  );
};
