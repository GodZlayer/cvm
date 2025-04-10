import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ColorScheme, colorSchemeNames, colorSchemeValues } from "./templates";

interface ColorPaletteProps {
  selectedColor: ColorScheme;
  onColorChange: (color: ColorScheme) => void;
}

export default function ColorPalette({
  selectedColor,
  onColorChange,
}: ColorPaletteProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Escolha uma paleta de cores</h3>
      <RadioGroup
        value={selectedColor}
        onValueChange={(value) => onColorChange(value as ColorScheme)}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {Object.entries(colorSchemeNames).map(([key, name]) => {
          const colors = colorSchemeValues[key as ColorScheme];
          return (
            <div key={key} className="flex flex-col items-center space-y-2">
              <div className="relative">
                <label htmlFor={`color-${key}`} className="cursor-pointer">
                  <div
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div
                      className="w-8 h-8 rounded-full"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      <div
                        className="w-4 h-4 rounded-full m-2"
                        style={{ backgroundColor: colors.accent }}
                      ></div>
                    </div>
                  </div>
                  <RadioGroupItem
                    value={key}
                    id={`color-${key}`}
                    className="sr-only"
                  />
                  <div
                    className={`absolute -inset-1 rounded-full ${selectedColor === key ? "border-2 border-primary" : ""}`}
                  ></div>
                </label>
              </div>
              <Label
                htmlFor={`color-${key}`}
                className="text-sm font-medium cursor-pointer"
              >
                {name}
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
