"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Save, Trash2, ImageIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { useTshirtForm } from "@/hooks/t-shirt/use-tshirt-form";
import { useGetColor } from "@/hooks/colors/use-colors";
import { useToast } from "@/hooks/use-toast";
import { FileService } from "@/domains/services/file";

export function TshirtDesigner({ id }: { id?: string }) {
  const { toast } = useToast();
  const { data: colorsResponse, isLoading: colorsLoading } = useGetColor();
  const colors = colorsResponse?.data || [];

  // Use the custom form hook with the id parameter
  const { form, onSubmit, isLoading } = useTshirtForm(id);

  // Watch form values to use in the UI
  const watchedValues = form.watch();

  // Local state
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [imagePosition, setImagePosition] = useState({ x: 200, y: 225 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [uploadingImage, setUploadingImage] = useState(false);

  // Custom form submission handler

  // Handle image upload with react-dropzone
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          // Start upload right away
          setUploadingImage(true);

          // Upload file to server
          const uploadResponse = await FileService.post.upload(file);

          if (uploadResponse?.data) {
            // Store uploaded file URL in the imgurl field
            form.setValue("imgurl", uploadResponse.data, {
              shouldValidate: true,
            });

            setUploadingImage(false);

            toast({
              title: "Upload successful",
              description: "Your image has been uploaded",
            });

            console.log("Image uploaded successfully:", uploadResponse.data);
          }
        } catch (error) {
          console.error("Upload error:", error);
          setUploadingImage(false);

          toast({
            title: "Upload failed",
            description: "Could not upload your image",
            variant: "destructive",
          });
        }
      }
    },
    [form, toast]
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

  // Update this function to allow multiple color selection
  const handleColorSelect = (color: string, colorId: string) => {
    // Keep the visual indicator of which color is currently selected
    setSelectedColor(color);

    // Get current color list
    const currentColors = form.getValues("colorlist") || [];

    // Check if the color is already selected
    const colorIndex = currentColors.indexOf(colorId);

    // Toggle color selection
    let updatedColors = [...currentColors];
    if (colorIndex >= 0) {
      // If color is already selected, remove it
      updatedColors.splice(colorIndex, 1);
    } else {
      // If color is not selected, add it
      updatedColors.push(colorId);
    }

    // Update form value
    form.setValue("colorlist", updatedColors, { shouldValidate: true });
    console.log("After setting colors:", form.getValues("colorlist"));
  };

  // Update to remove a specific color by ID
  const handleRemoveColor = (colorId: string) => {
    const currentColors = form.getValues("colorlist") || [];
    const updatedColors = currentColors.filter((id) => id !== colorId);
    form.setValue("colorlist", updatedColors, { shouldValidate: true });

    // Reset selected color visual indicator if removing the currently selected color
    const selectedColorObj = colors.find((c) => c.colorId === colorId);
  };

  const handleDragImage = (e: React.MouseEvent<HTMLDivElement>) => {
    // Simple drag implementation
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

  const handleRemoveImage = () => {
    form.setValue("imgurl", "", { shouldValidate: true });
    setImagePosition({ x: 200, y: 225 });
  };

  // For debugging
  useEffect(() => {
    console.log("Current form values:", form.getValues());
    console.log(
      "Button would be disabled:",
      isLoading ||
        uploadingImage ||
        !form.getValues("imgurl") ||
        !form.getValues("tshirtname") ||
        (form.getValues("colorlist")?.length || 0) === 0
    );
  }, [watchedValues, isLoading, uploadingImage, form]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Design Preview</h2>
            <div className="relative w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              {/* T-shirt mockup */}
              <div
                className="relative w-[400px] h-[450px]"
                onClick={handleDragImage}
              >
                <div className="absolute inset-0 opacity-20">
                  <Image
                    src="/placeholder.svg?height=450&width=400"
                    alt="T-shirt outline"
                    width={400}
                    height={450}
                    className="object-contain"
                  />
                </div>

                {/* Uploaded design - use watchedValues.imgurl */}
                {watchedValues.imgurl && (
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
                      src={watchedValues.imgurl}
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
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleResize("decrease")}
                disabled={!watchedValues.imgurl}
              >
                Smaller
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleResize("increase")}
                disabled={!watchedValues.imgurl}
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
                    <FormField
                      control={form.control}
                      name="imgurl"
                      render={() => (
                        <FormItem className="mb-6">
                          <FormLabel>Upload Design</FormLabel>
                          <div className="space-y-4">
                            <div
                              {...getRootProps()}
                              className={cn(
                                "border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer text-center",
                                isDragActive
                                  ? "border-primary bg-primary/5"
                                  : "border-muted-foreground/25",
                                isDragAccept
                                  ? "border-green-500 bg-green-50"
                                  : "",
                                isDragReject ? "border-red-500 bg-red-50" : "",
                                form.formState.errors.imagefile
                                  ? "border-red-500"
                                  : ""
                              )}
                            >
                              <input {...getInputProps()} />
                              <div className="flex flex-col items-center gap-2">
                                {uploadingImage ? (
                                  <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                ) : (
                                  <ImageIcon className="h-10 w-10 text-muted-foreground" />
                                )}

                                {isDragActive ? (
                                  <p>Drop the image here...</p>
                                ) : uploadingImage ? (
                                  <p>Uploading image...</p>
                                ) : (
                                  <div className="space-y-1">
                                    <p className="font-medium">
                                      Drag & drop an image here, or click to
                                      select
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Supports JPG, PNG, GIF, SVG
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {watchedValues.imgurl && (
                              <div className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-12 relative rounded overflow-hidden">
                                    <Image
                                      src={watchedValues.imgurl}
                                      alt="Preview"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-sm truncate max-w-[150px]">
                                    {uploadingImage
                                      ? "Uploading..."
                                      : "Image uploaded"}
                                  </span>
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={handleRemoveImage}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="colorlist"
                      render={() => (
                        <FormItem>
                          <FormLabel>T-shirt Color</FormLabel>
                          <div className="grid grid-cols-7 gap-2">
                            {colorsLoading ? (
                              <div className="col-span-7 py-2 text-center text-muted-foreground">
                                Loading colors...
                              </div>
                            ) : (colors?.length ?? 0) > 0 ? (
                              colors.map((color) => {
                                const isSelected =
                                  watchedValues.colorlist?.includes(
                                    color.colorId
                                  );
                                return (
                                  <div
                                    key={color.colorId}
                                    className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                                      isSelected
                                        ? "border-primary"
                                        : "border-transparent"
                                    }`}
                                    style={{ backgroundColor: color.colorCode }}
                                    onClick={() =>
                                      handleColorSelect(
                                        color.colorCode,
                                        color.colorId
                                      )
                                    }
                                    title={color.colorName}
                                  />
                                );
                              })
                            ) : (
                              <div className="col-span-7 py-2 text-center text-muted-foreground">
                                No colors available
                              </div>
                            )}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <FormField
                      control={form.control}
                      name="colorlist"
                      render={() => (
                        <FormItem>
                          <FormLabel>Selected Colors</FormLabel>
                          {watchedValues.colorlist?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {watchedValues.colorlist.map((colorId) => {
                                // Find the color object by ID to get its code for display
                                const selectedColor = colors.find(
                                  (c) => c.colorId === colorId
                                );
                                return (
                                  <div
                                    key={colorId}
                                    className="flex items-center gap-1 bg-muted p-1 rounded"
                                  >
                                    <div
                                      className="w-5 h-5 rounded-full"
                                      style={{
                                        backgroundColor:
                                          selectedColor?.colorCode || "#FFFFFF",
                                      }}
                                    />
                                    <span className="text-xs">
                                      {selectedColor?.colorName || "Unknown"}
                                    </span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-5 w-5"
                                      onClick={() => handleRemoveColor(colorId)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-muted-foreground text-sm">
                              No colors selected yet
                            </div>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="tshirtname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>T-shirt Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter a name for your design"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Describe your t-shirt design"
                              rows={4}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Button
              className="w-full mt-6"
              size="lg"
              type="submit"
              disabled={
                isLoading ||
                uploadingImage ||
                !watchedValues.imgurl ||
                !watchedValues.tshirtname ||
                watchedValues.colorlist.length === 0
              }
            >
              {isLoading || uploadingImage ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {uploadingImage ? "Uploading..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Design
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
