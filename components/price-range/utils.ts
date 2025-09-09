export const getClampedPercents = (
  min: number,
  max: number,
  minValue: number,
  maxValue: number,
  step: number
) => {
  const total = maxValue - minValue;

  let minPercent = ((min - minValue) / total) * 100;
  let maxPercent = ((max - minValue) / total) * 100;

  minPercent = Math.min(Math.max(minPercent, 0), 100);
  maxPercent = Math.min(Math.max(maxPercent, 0), 100);

  if (minPercent >= maxPercent) {
    minPercent = Math.max(0, maxPercent - (step / total) * 100);
  }

  return { minPercent, maxPercent };
};

export const roundToStep = (value: number, step: number) => {
  return Math.round(value / step) * step;
};
