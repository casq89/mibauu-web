import { formatPrice } from '@/utils/formatters';
import { useState } from 'react';
import { getClampedPercents, roundToStep } from './utils';

type RangeProps = {
  label?: string;
  minValue?: number;
  maxValue?: number;
  step?: number;
  value?: { min: number; max: number };
  onChange?: (value: { min: number; max: number }) => void;
};

export const RangeSlider = ({
  label = 'Rango',
  minValue = 0,
  maxValue = 100,
  step = 1,
  value,
  onChange,
}: RangeProps) => {
  const [range, setRange] = useState(value || { min: minValue, max: maxValue });

  const handleMinChange = (val: number) => {
    const newMin = Math.min(roundToStep(val, step), range.max - step);
    const newRange = { ...range, min: newMin };
    setRange(newRange);
    onChange?.(newRange);
  };

  const handleMaxChange = (val: number) => {
    const newMax = Math.max(roundToStep(val, step), range.min + step);
    const newRange = { ...range, max: newMax };
    setRange(newRange);
    onChange?.(newRange);
  };

  const { minPercent, maxPercent } = getClampedPercents(
    range.min,
    range.max,
    minValue,
    maxValue,
    step
  );
  return (
    <div className="w-full">
      <h3 className="text-amber-950 pr-2 pb-4">
        {label}: {formatPrice(range.min)} - {formatPrice(range.max)}
      </h3>

      <div className="relative w-full">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-md transform -translate-y-1/2" />

        <div
          className="absolute top-1/2 h-1 bg-gray-600 rounded-md transform -translate-y-1/2 transition-all"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(maxPercent - minPercent, 0)}%`,
          }}
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={range.min}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-gray-700
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:pointer-events-auto
                     [&::-webkit-slider-thumb]:mt-[-6px]
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-gray-700
                     [&::-moz-range-thumb]:cursor-pointer
                     [&::-moz-range-thumb]:pointer-events-auto
          "
        />

        <input
          type="range"
          min={minValue}
          max={maxValue}
          step={step}
          value={range.max}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute w-full h-1 appearance-none bg-transparent pointer-events-none
             [&::-webkit-slider-thumb]:appearance-none
             [&::-webkit-slider-thumb]:w-4
             [&::-webkit-slider-thumb]:h-4
             [&::-webkit-slider-thumb]:rounded-full
             [&::-webkit-slider-thumb]:bg-gray-700
             [&::-webkit-slider-thumb]:cursor-pointer
             [&::-webkit-slider-thumb]:pointer-events-auto
             [&::-webkit-slider-thumb]:mt-[-6px]
             [&::-moz-range-thumb]:w-4
             [&::-moz-range-thumb]:h-4
             [&::-moz-range-thumb]:rounded-full
             [&::-moz-range-thumb]:bg-gray-700
             [&::-moz-range-thumb]:cursor-pointer
             [&::-moz-range-thumb]:pointer-events-auto
             [direction:rtl] [transform:scaleX(-1)]
  "
        />
      </div>
    </div>
  );
};
