// ColorSelector.tsx
import React from "react";

type Color = {
  name: string;
  hex: string;
};

type Props = {
  selectedColor: string | null;
  onSelectColor: (color: string) => void;
};

const colors: Color[] = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
];

const ColorSelector: React.FC<Props> = ({ selectedColor, onSelectColor }) => {
  return (
    <div className="my-6">
      <h4 className="text-lg font-bold text-gray-800 mb-3">Select Color</h4>
      <div className="flex gap-3">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform duration-200 ${
              selectedColor === color.name
                ? "border-gray-800 scale-110"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelectColor(color.name)}
            title={color.name}
          />
        ))}
      </div>
      {selectedColor && (
        <p className="text-sm text-gray-600 mt-2">
          Selected Color: {selectedColor}
        </p>
      )}
    </div>
  );
};

export default ColorSelector;
