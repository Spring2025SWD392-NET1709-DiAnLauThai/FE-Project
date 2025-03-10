"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useColorsForm } from "@/hooks/colors/use-colors-form";
import { Form } from "@/components/ui/form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

// Hàm chuyển đổi từ HEX sang RGB
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Hàm chuyển đổi từ HEX sang HSL
const hexToHsl = (hex: string): { h: number; s: number; l: number } | null => {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

type ColorFormat = "hex" | "rgb" | "hsl";

export function ColorPickerNav() {
  const [color, setColor] = useState("#3b82f6");
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [colorNote, setColorNote] = useState("");

  const { form, handleSubmit, isSubmitting } = useColorsForm();

  // Update form field when color changes
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    form.setValue("colorForm.colorCode", newColor);
  };

  // Set initial color value when component mounts
  useEffect(() => {
    form.setValue("colorForm.colorCode", color);
  }, [form, color]); // Add proper dependency array

  const getFormattedColor = (): string => {
    switch (colorFormat) {
      case "hex":
        return color;
      case "rgb": {
        const rgb = hexToRgb(color);
        return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : color;
      }
      case "hsl": {
        const hsl = hexToHsl(color);
        return hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : color;
      }
    }
  };

  // Add this function to your ColorPickerNav component
  const handleColorCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    // Allow the input to be displayed as typed
    form.setValue("colorForm.colorCode", input);

    // Try to convert the input to a valid hex color
    let hexColor = input;

    // Add # if missing (for valid 6-digit hex)
    if (/^[0-9A-Fa-f]{6}$/.test(input)) {
      hexColor = `#${input}`;
    }

    // Add # if missing (for valid 3-digit hex)
    if (/^[0-9A-Fa-f]{3}$/.test(input)) {
      hexColor = `#${input}`;
    }

    // Check if it's a valid hex color with #
    if (/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(hexColor)) {
      // Update the color picker with the valid hex
      setColor(hexColor);
    }

    // For RGB format - try to parse RGB values like rgb(255, 100, 50)
    const rgbMatch = input.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);

      // Ensure values are in range
      if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
        // Convert to hex
        const hex = `#${r.toString(16).padStart(2, "0")}${g
          .toString(16)
          .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
        setColor(hex);
      }
    }
  };

  // Create a wrapper function that prevents default form submission
  const handleFormSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    // Validate that we have a color name before submission
    if (!form.getValues("colorForm.colorName")) {
      form.setError("colorForm.colorName", {
        type: "required",
        message: "Please enter a color name",
      });
      return;
    }

    // Ensure colorCode is set properly before submission
    form.setValue("colorForm.colorCode", color);

    // Now call the form submission
    handleSubmit();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-96" align="end">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium leading-none">Color Picker</h4>
            <div
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: color }}
            />
          </div>

          {/* Color picker */}
          <div className="border p-2 rounded-md">
            <HexColorPicker
              color={color}
              onChange={handleColorChange}
              className="w-full h-52"
            />
          </div>
          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Add color name field */}
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="colorForm.colorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter color name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Color format selector */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="col-span-1">
                  <FormItem className="space-y-1.5">
                    {" "}
                    {/* Add consistent spacing */}
                    <FormLabel htmlFor="color-format">Format</FormLabel>
                    <Select
                      value={colorFormat}
                      onValueChange={(value) =>
                        setColorFormat(value as ColorFormat)
                      }
                    >
                      <SelectTrigger id="color-format">
                        <SelectValue placeholder="Color format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hex">HEX</SelectItem>
                        <SelectItem value="rgb">RGB</SelectItem>
                        <SelectItem value="hsl">HSL</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </div>

                <div className="col-span-2">
                  <FormField
                    control={form.control}
                    name="colorForm.colorCode"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        {" "}
                        {/* Add consistent spacing */}
                        <FormLabel>Color Code</FormLabel>
                        <FormControl>
                          <Input
                            id="color-value"
                            {...field}
                            value={field.value || getFormattedColor()}
                            onChange={(e) => {
                              handleColorCodeInput(e);
                            }}
                            className="font-mono text-sm"
                            placeholder="#RRGGBB or rgb(r,g,b)"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Save button */}
              <Button
                type="button" // Change to button type
                className="w-full"
                onClick={handleFormSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Color"}
              </Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
