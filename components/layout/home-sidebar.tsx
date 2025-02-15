import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-60 flex-shrink-0 ">
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Filter</h2>
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h3 className="font-medium">Categories</h3>
          <div className="flex gap-2">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Men
            </Button>
            <Button variant="outline">Woman</Button>
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="font-medium">Price</h3>
          <div className="px-2">
            <Slider defaultValue={[40]} max={500} step={1} className="w-full" />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>$40</span>
            <span>$500</span>
          </div>
        </div>

        {/* Color Selection */}
        <div className="space-y-2">
          <h3 className="font-medium">Color</h3>
          <div className="flex gap-2">
            <button className="w-6 h-6 rounded-full bg-green-500 ring-2 ring-offset-2 ring-green-500" />
            <button className="w-6 h-6 rounded-full bg-red-500" />
            <button className="w-6 h-6 rounded-full bg-yellow-500" />
            <button className="w-6 h-6 rounded-full bg-blue-500" />
          </div>
        </div>

        {/* Size Selection */}
        <div className="space-y-2">
          <h3 className="font-medium">Size</h3>
          <div className="grid grid-cols-5 gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <Button key={size} variant="outline" className="h-8 w-8 p-0">
                {size}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
