import { Ruler, Palette, Printer } from "lucide-react";

interface TShirtSpecsProps {
  sizes: string[];
  colors: number;
  printProviders: number;
}

export function TShirtSpecs({
  sizes,
  colors,
  printProviders,
}: TShirtSpecsProps) {
  return (
    <div className="flex gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-1">
        <Ruler className="h-4 w-4" />
        <span>{sizes.length} sizes</span>
      </div>
      <div className="flex items-center gap-1">
        <Palette className="h-4 w-4" />
        <span>{colors} colors</span>
      </div>
      <div className="flex items-center gap-1">
        <Printer className="h-4 w-4" />
        <span>{printProviders} print providers</span>
      </div>
    </div>
  );
}
