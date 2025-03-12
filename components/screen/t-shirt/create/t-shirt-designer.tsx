"use client";

import type React from "react";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Save, Trash2, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Sample colors - in a real app, these would come from an API or database
const sampleColors = [
  { name: "Red", value: "#FF0000" },
  { name: "Blue", value: "#0000FF" },
  { name: "Green", value: "#00FF00" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Yellow", value: "#FFFF00" },
  { name: "Purple", value: "#800080" },
];

interface TshirtDesign {
  description: string;
  imgurl: string;
  tshirtname: string;
  colorlist: string[];
}

export function TshirtDesigner() {
  const [design, setDesign] = useState<TshirtDesign>({
    description: "",
    imgurl: "",
    tshirtname: "",
    colorlist: [],
  });
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  // Change the initial imagePosition state to center the image on the T-shirt
  const [imagePosition, setImagePosition] = useState({ x: 200, y: 225 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });

  // Update the onDrop callback to center the image when a new one is uploaded
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          setUploadedImage(result);
          setDesign({ ...design, imgurl: result });
          // Center the image when a new one is uploaded
          setImagePosition({ x: 200, y: 225 });
        };
        reader.readAsDataURL(file);
      }
    },
    [design]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".svg"],
    },
    maxFiles: 1,
  });

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (!design.colorlist.includes(color)) {
      setDesign({ ...design, colorlist: [...design.colorlist, color] });
    }
  };

  const handleRemoveColor = (color: string) => {
    setDesign({
      ...design,
      colorlist: design.colorlist.filter((c) => c !== color),
    });
  };

  const handleSaveDesign = () => {
    console.log("Saving design:", design);
    // In a real app, this would send the data to an API
    alert("Design saved successfully!");
  };

  const handleDragImage = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simple drag implementation - in a real app, you'd want a more robust solution
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep the image within the t-shirt boundaries
    if (x > 50 && x < 350 && y > 50 && y < 400) {
      setImagePosition({ x, y });
    }
  };

  const handleResize = (direction: "increase" | "decrease") => {
    const factor = direction === "increase" ? 1.1 : 0.9;
    setImageSize({
      width: Math.max(50, imageSize.width * factor),
      height: Math.max(50, imageSize.height * factor),
    });
  };

  // Also update the handleRemoveImage function to reset position when image is removed
  const handleRemoveImage = () => {
    setUploadedImage(null);
    setDesign({ ...design, imgurl: "" });
    setImagePosition({ x: 200, y: 225 });
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
        <div className="relative w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          {/* T-shirt mockup */}
          <div
            className="relative w-[400px] h-[450px]"
            // style={{ backgroundColor: selectedColor }}
            onClick={handleDragImage}
          >
            <div className="absolute inset-0 opacity-10">
              <Image
                src="/placeholder.svg?height=450&width=400"
                alt="T-shirt outline"
                width={400}
                height={450}
                className="object-contain"
              />
            </div>

            {/* Uploaded design */}
            {uploadedImage && (
              <div
                className="absolute cursor-move"
                style={{
                  left: `${imagePosition.x - imageSize.width / 2}px`,
                  top: `${imagePosition.y - imageSize.height / 2}px`,
                  width: `${imageSize.width}px`,
                  height: `${imageSize.height}px`,
                }}
              >
                <Image
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded design"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResize("decrease")}
            disabled={!uploadedImage}
          >
            Smaller
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResize("increase")}
            disabled={!uploadedImage}
          >
            Larger
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-2">
          Click on the t-shirt to position your design
        </div>
      </Card>

      <div>
        <Tabs defaultValue="design">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <Label className="block mb-2">Upload Design</Label>

                  <div className="space-y-4">
                    <div
                      {...getRootProps()}
                      className={cn(
                        "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer text-center",
                        isDragActive
                          ? "border-primary bg-primary/5"
                          : "border-muted-foreground/25",
                        isDragAccept ? "border-green-500 bg-green-50" : "",
                        isDragReject ? "border-red-500 bg-red-50" : ""
                      )}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="h-10 w-10 text-muted-foreground" />
                        {isDragActive ? (
                          <p>Drop the image here...</p>
                        ) : (
                          <div className="space-y-1">
                            <p className="font-medium">
                              Drag & drop an image here, or click to select
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Supports JPG, PNG, GIF, SVG
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {uploadedImage && (
                      <div className="flex items-center justify-between p-2 border rounded-md">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 relative rounded overflow-hidden">
                            <Image
                              src={uploadedImage || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm truncate max-w-[150px]">
                            Image uploaded
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleRemoveImage}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="block mb-2">T-shirt Color</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {sampleColors.map((color) => (
                      <div
                        key={color.value}
                        className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                          selectedColor === color.value
                            ? "border-primary"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorSelect(color.value)}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <Label className="block mb-2">Selected Colors</Label>
                {design.colorlist.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {design.colorlist.map((color) => (
                      <div
                        key={color}
                        className="flex items-center gap-1 bg-muted p-1 rounded"
                      >
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5"
                          onClick={() => handleRemoveColor(color)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    No colors selected yet
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor="tshirt-name" className="block mb-2">
                    T-shirt Name
                  </Label>
                  <Input
                    id="tshirt-name"
                    value={design.tshirtname}
                    onChange={(e) =>
                      setDesign({ ...design, tshirtname: e.target.value })
                    }
                    placeholder="Enter a name for your design"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="block mb-2">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={design.description}
                    onChange={(e) =>
                      setDesign({ ...design, description: e.target.value })
                    }
                    placeholder="Describe your t-shirt design"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button
          className="w-full mt-6"
          size="lg"
          onClick={handleSaveDesign}
          disabled={!uploadedImage || !design.tshirtname}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Design
        </Button>
      </div>
    </div>
  );
}
