export const lengthUnits = [
  'Inch',
  'Foot',
  'Yard',
  'Mile',
  'Millimeter',
  'Centimeter',
  'Meter',
  'Kilometer'
];

// Conversion factors to meters
export const lengthConversions: Record<string, number> = {
  'Inch': 0.0254,
  'Foot': 0.3048,
  'Yard': 0.9144,
  'Mile': 1609.344,
  'Millimeter': 0.001,
  'Centimeter': 0.01,
  'Meter': 1,
  'Kilometer': 1000
};

export function convertLength(value: number, fromUnit: string, toUnit: string): number {
  const fromFactor = lengthConversions[fromUnit] || 1;
  const toFactor = lengthConversions[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function getConversionFactor(fromUnit: string, toUnit: string): number {
  const fromFactor = lengthConversions[fromUnit] || 1;
  const toFactor = lengthConversions[toUnit] || 1;
  return fromFactor / toFactor;
}
