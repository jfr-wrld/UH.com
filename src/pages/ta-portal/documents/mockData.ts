export const mockDocuments = [
  {
    id: 'M-001',
    name: 'Ahmad bin Abdullah',
    bookingRef: 'BKG-2026-001',
    groupTrip: 'Premium Umrah Safwa',
    documents: {
      ic: { status: 'Verified', action: null },
      passport: { status: 'Expiring Soon', expiry: '2026-09-15', action: 'Warning' },
      visa: { status: 'Missing', action: 'Upload Required' },
      photo: { status: 'Verified', action: null },
      vaccination: { status: 'Pending Review', action: 'Review' }
    },
    readiness: 80
  },
  {
    id: 'M-002',
    name: 'Fatimah binti Ali',
    bookingRef: 'BKG-2026-001',
    groupTrip: 'Premium Umrah Safwa',
    documents: {
      ic: { status: 'Verified', action: null },
      passport: { status: 'Verified', expiry: '2028-05-10', action: null },
      visa: { status: 'Missing', action: 'Upload Required' },
      photo: { status: 'Verified', action: null },
      vaccination: { status: 'Verified', action: null }
    },
    readiness: 90
  },
  {
    id: 'M-003',
    name: 'Siti Aminah',
    bookingRef: 'BKG-2026-002',
    groupTrip: 'Economy Umrah Syawal',
    documents: {
      ic: { status: 'Missing', action: 'Upload Required' },
      passport: { status: 'Missing', action: 'Upload Required' },
      visa: { status: 'Missing', action: 'Upload Required' },
      photo: { status: 'Missing', action: 'Upload Required' },
      vaccination: { status: 'Missing', action: 'Upload Required' }
    },
    readiness: 0
  }
];

export const mockServices = [
  {
    id: 'M-001',
    name: 'Ahmad bin Abdullah',
    bookingRef: 'BKG-2026-001',
    groupTrip: 'Premium Umrah Safwa',
    services: {
      visaProcessing: { status: 'Blocked', note: 'Missing Passport' },
      flightEticket: { status: 'Pending Confirmation', note: 'Awaiting Saudi Airlines' },
      roomAllocation: { status: 'Completed', note: 'Room 402 (Quad)' },
      transport: { status: 'In Progress', note: 'Bus assignment pending' },
      umrahKit: { status: 'Completed', note: 'Collected 10 Nov' }
    },
    readiness: 40
  },
  {
    id: 'M-002',
    name: 'Fatimah binti Ali',
    bookingRef: 'BKG-2026-001',
    groupTrip: 'Premium Umrah Safwa',
    services: {
      visaProcessing: { status: 'Blocked', note: 'Missing Passport' },
      flightEticket: { status: 'Pending Confirmation', note: 'Awaiting Saudi Airlines' },
      roomAllocation: { status: 'Completed', note: 'Room 402 (Quad)' },
      transport: { status: 'In Progress', note: 'Bus assignment pending' },
      umrahKit: { status: 'Completed', note: 'Collected 10 Nov' }
    },
    readiness: 40
  },
  {
    id: 'M-003',
    name: 'Siti Aminah',
    bookingRef: 'BKG-2026-002',
    groupTrip: 'Economy Umrah Syawal',
    services: {
      visaProcessing: { status: 'Not Started', note: '' },
      flightEticket: { status: 'Not Started', note: '' },
      roomAllocation: { status: 'Not Started', note: '' },
      transport: { status: 'Not Started', note: '' },
      umrahKit: { status: 'Not Started', note: '' }
    },
    readiness: 0
  }
];
