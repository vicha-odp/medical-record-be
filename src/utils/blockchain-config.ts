export const smartcontractAbi = [
  {
    inputs: [
      { internalType: 'string', name: 'DrID', type: 'string' },
      { internalType: 'string', name: 'drName', type: 'string' },
      { internalType: 'string', name: 'drSpecialist', type: 'string' },
    ],
    name: 'addDoctor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'PatID', type: 'string' },
      { internalType: 'string', name: 'patName', type: 'string' },
      { internalType: 'string', name: 'patAddress', type: 'string' },
      { internalType: 'string', name: 'patAyah', type: 'string' },
      { internalType: 'string', name: 'patIbu', type: 'string' },
    ],
    name: 'addPatient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'PatID', type: 'string' },
      { internalType: 'string', name: 'patMR', type: 'string' },
    ],
    name: 'addRecord',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'DrID', type: 'string' }],
    name: 'getDrInfo',
    outputs: [
      { internalType: 'string', name: 'drName', type: 'string' },
      { internalType: 'string', name: 'drSpecialist', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'PatID', type: 'string' }],
    name: 'getPatInfo',
    outputs: [
      { internalType: 'string', name: 'patName', type: 'string' },
      { internalType: 'string', name: 'patAddress', type: 'string' },
      { internalType: 'string', name: 'patAyah', type: 'string' },
      { internalType: 'string', name: 'patIbu', type: 'string' },
      { internalType: 'string', name: 'patMR', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'PatID', type: 'string' }],
    name: 'getRecord',
    outputs: [{ internalType: 'string', name: 'patMR', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
];
