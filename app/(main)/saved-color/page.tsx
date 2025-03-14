"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetColor } from "@/hooks/colors/use-colors";
import { ColorResponse } from "@/domains/models/color";

export default function ColorSavedPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Use the hook to fetch colors
  const { data: colorResponse, isLoading, error } = useGetColor();

  // Extract colors from response
  const colors = colorResponse?.data || [];

  // Filter colors based on search term
  const filteredColors = colors.filter(
    (color) =>
      color.colorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      color.colorCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Copy color code to clipboard
  const copyToClipboard = (code: string, id: string) => {
    // Make sure we're copying the actual color code
    if (!code) {
      toast({
        title: "Copy failed",
        description: "No color code available",
        variant: "destructive",
      });
      return;
    }

    try {
      // Use the clipboard API to copy the color code
      navigator.clipboard.writeText(code).then(
        () => {
          // Set the copied ID to show visual feedback
          setCopiedId(id);
          toast({
            title: "Copied!",
            description: `Color code ${code} copied to clipboard`,
          });

          // Reset the copied state after 2 seconds
          setTimeout(() => setCopiedId(null), 2000);
        },
        (err) => {
          console.error("Failed to copy:", err);
          toast({
            title: "Copy failed",
            description: "Could not copy to clipboard",
            variant: "destructive",
          });
        }
      );
    } catch (err) {
      console.error("Copy error:", err);
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  // Select a color
  const selectColor = (color: ColorResponse) => {
    // You can implement this based on your needs
    toast({
      title: "Color Selected",
      description: `Selected ${color.colorName} (${color.colorCode})`,
    });
  };

  // Calculate text color based on background for better contrast
  const getTextColor = (hexColor: string) => {
    // Handle invalid color codes or empty strings
    if (!hexColor || typeof hexColor !== "string" || !hexColor.trim()) {
      return "#000000"; // Default to black
    }

    // Remove # if present
    let hex = hexColor.replace("#", "");

    // Handle shortened hex codes (e.g., #fff)
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    // Check for valid hex format
    if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
      return "#000000"; // Default to black for invalid formats
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate brightness (YIQ formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return white for dark backgrounds, black for light backgrounds
    return brightness < 128 ? "#FFFFFF" : "#000000";
  };

  // Ensure color code includes # prefix
  const formatColorCode = (code: string): string => {
    if (!code) return "#e2e2e2"; // Default light gray

    // Add # prefix if missing
    return code.startsWith("#") ? code : `#${code}`;
  };

  // Handle error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-red-500 mb-2">Failed to load colors</div>
        <p className="text-sm text-gray-500">
          Please try refreshing the page or contact support
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Saved Colors</h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search colors..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredColors.length > 0 ? (
              filteredColors.map((color) => {
                // Format the color code to ensure it's valid
                const formattedColorCode = formatColorCode(color.colorCode);

                return (
                  <Card
                    key={color.colorId}
                    className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div
                      className="h-40 flex items-center justify-center group-hover:opacity-90 transition-opacity"
                      style={{
                        backgroundColor: formattedColorCode, // Use formatted color code
                        color: getTextColor(color.colorCode),
                      }}
                      onClick={() => selectColor(color)}
                    >
                      <span className="font-mono text-lg opacity-80 group-hover:opacity-100">
                        {color.colorCode}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <Label
                          className="font-medium truncate"
                          title={color.colorName}
                        >
                          {color.colorName}
                        </Label>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.colorCode, color.colorId);
                            }}
                          >
                            {copiedId === color.colorId ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => selectColor(color)}
                          >
                            Use
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                No colors found.{" "}
                {searchTerm
                  ? "Try a different search term."
                  : "Save some colors to get started!"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
