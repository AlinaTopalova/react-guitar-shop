import { ChangeEvent, FocusEvent, useState } from 'react';

enum InputName {
  From = 'FROM',
  To = 'TO'
}

type PriceFilterProps = {
  maxPriceLimit: number;
  minPriceLimit: number;
  onChange: (value: [string, string]) => void;
  priceValue: [string, string];
};

export default function PriceFilter(props: PriceFilterProps) {
  const { maxPriceLimit, minPriceLimit, onChange, priceValue } = props;

  const [priceRange, setPriceRange] = useState<Record<InputName, string>>(
    () => {
      const [from, to] = priceValue;
      return {
        [InputName.From]: from,
        [InputName.To]: to,
      };
    },
  );

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setPriceRange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputBlur = (evt: FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    const currentFromValue = priceRange[InputName.From];
    const currentToValue = priceRange[InputName.To];

    if (!value) {
      onChange([
        name === InputName.From ? value : currentFromValue,
        name === InputName.To ? value : currentToValue,
      ]);
      setPriceRange((prev) => ({
        ...prev,
        [name]: value,
      }));

      return;
    }

    let resultValue = value;

    if (Number(value) > maxPriceLimit) {
      resultValue = maxPriceLimit.toString();
    }

    if (Number(value) < minPriceLimit) {
      resultValue = minPriceLimit.toString();
    }

    if (name === InputName.From) {
      if (currentToValue && Number(value) > Number(currentToValue)) {
        resultValue = currentToValue;
      }
      onChange([resultValue, currentToValue]);
    }

    if (name === InputName.To) {
      if (currentFromValue && Number(value) < Number(currentFromValue)) {
        resultValue = currentFromValue;
      }
      onChange([currentFromValue, resultValue]);
    }

    setPriceRange((prev) => ({
      ...prev,
      [name]: resultValue,
    }));
  };

  return (
    <>
      <div className="form-input">
        <input
          name={InputName.From}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={minPriceLimit.toString()}
          type="number"
          value={priceRange[InputName.From]}
        />
      </div>
      <div className="form-input">
        <input
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          placeholder={maxPriceLimit.toString()}
          name={InputName.To}
          type="number"
          value={priceRange[InputName.To]}
        />
      </div>
    </>
  );
}
