import { Button } from "../ui/button";

interface SizeOption {
  value: string;
  label: string;
}

const sizes: SizeOption[] = [
  { value: "xxl", label: "XXL" },
  { value: "xl", label: "XL" },
  { value: "l", label: "L" },
  { value: "m", label: "M" },
  { value: "s", label: "S" },
  { value: "xs", label: "XS" },
];

export function SizeSelector() {
  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <Button
          variant={size.value === "m" ? "default" : "secondary"}
          key={size.value}
          className="px-3 py-1 border rounded-md hover:bg-gray-100 text-sm"
        >
          {size.label}
        </Button>
      ))}
    </div>
  );
}
