import { Button } from "@/components/ui/button";

interface TShirtSizeSelectorProps {
  sizes: string[];
}

export function TShirtSizeSelector({ sizes }: TShirtSizeSelectorProps) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Select Size</h3>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <Button key={size} variant="outline" className="w-12 h-12">
            {size}
          </Button>
        ))}
      </div>
    </div>
  );
}
