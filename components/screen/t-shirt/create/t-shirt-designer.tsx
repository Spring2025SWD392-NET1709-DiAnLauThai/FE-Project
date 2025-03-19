"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Save, Trash2, ImageIcon, Loader2, Upload } from "lucide-react"; // Added Upload icon

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
import { useCreateTshirtForm } from "@/hooks/t-shirt/use-tshirt-form";
import { useGetColor } from "@/hooks/colors/use-colors";
import { useToast } from "@/hooks/use-toast";

export function TshirtDesigner({ id }: { id?: string }) {
  const { toast } = useToast();
  const { data: colorsResponse, isLoading: colorsLoading } = useGetColor();
  const colors = colorsResponse?.data || [];

  // Store actual File objects in refs
  const imageFileRef = useRef<File | null>(null);
  const zipFileRef = useRef<File | null>(null);

  const { form, onSubmit, isLoading, isUploading } = useCreateTshirtForm();

  // Watch form values to use in the UI
  const watchedValues = form.watch();

  // Local state
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [imagePosition, setImagePosition] = useState({ x: 200, y: 225 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingZip, setUploadingZip] = useState(false);
  const [zipUploaded, setZipUploaded] = useState(false);
  const [zipFileName, setZipFileName] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  

  // Modified onDrop function for image drop/select
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          // Check file size (max 5MB)
          const MAX_SIZE = 5 * 1024 * 1024; // 5MB
          if (file.size > MAX_SIZE) {
            toast({
              title: "File Too Large",
              description: "Image must be less than 5MB",
              variant: "destructive",
            });
            return;
          }

          // Check file type
          if (!file.type.startsWith("image/")) {
            toast({
              title: "Invalid File",
              description: "Please upload an image file",
              variant: "destructive",
            });
            return;
          }

          // Create a preview URL for the image
          const previewUrl = URL.createObjectURL(file);
          setImagePreviewUrl(previewUrl);

          // Store the file reference for later upload
          imageFileRef.current = file;

          // Set a placeholder in the form
          form.setValue("imgurl", "pending-upload", {
            shouldValidate: true,
          });

          console.log("Image selected for preview:", file.name);
        } catch (error) {
          console.error("Preview error:", error);
          toast({
            title: "Preview failed",
            description: "Could not preview your image",
            variant: "destructive",
          });
        }
      }
    },
    [form, toast]
  );

  // Modified zip file selection handler
  const handleZipFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      try {
        const MAX_SIZE = 50 * 1024 * 1024; // 50MB
        if (file.size > MAX_SIZE) {
          toast({
            title: "File Too Large",
            description: "Zip file must be less than 50MB",
            variant: "destructive",
          });
          return;
        }

        // Check file type
        const validExtensions = [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2"];
        const fileExt = file.name
          .substring(file.name.lastIndexOf("."))
          .toLowerCase();
        if (!validExtensions.includes(fileExt)) {
          toast({
            title: "Invalid File",
            description: "Please upload a compressed file (ZIP, RAR, etc.)",
            variant: "destructive",
          });
          return;
        }

        setZipFileName(file.name);
        setZipUploaded(true);

        zipFileRef.current = file;

        // Set a placeholder in the form
        form.setValue("imagefile", "pending-upload", {
          shouldValidate: true,
        });

        console.log("ZIP file selected:", file.name);
      } catch (error) {
        console.error("ZIP file selection error:", error);
        setZipFileName(null);
        setZipUploaded(false);
        zipFileRef.current = null;

        toast({
          title: "Selection failed",
          description: "Could not select your source files",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formIsValid = await form.trigger();
    if (!formIsValid) {
      return;
    }

    if (!imageFileRef.current) {
      toast({
        title: "Missing Design Image",
        description: "Please upload a design image",
        variant: "destructive",
      });
      return;
    }

    if (!zipFileRef.current) {
      toast({
        title: "Missing Source Files",
        description: "Please upload your source files (ZIP)",
        variant: "destructive",
      });
      return;
    }

    const customEvent = {
      ...e,
      imageFile: imageFileRef.current,
      zipFile: zipFileRef.current,
      resetFiles: () => {
        // Reset all file-related state
        if (imagePreviewUrl) {
          URL.revokeObjectURL(imagePreviewUrl);
        }
        setImagePreviewUrl("");
        setImagePosition({ x: 400, y: 400 });
        setImageSize({ width: 400, height: 400 });
        imageFileRef.current = null;

        // Reset zip state
        setZipUploaded(false);
        setZipFileName(null);
        zipFileRef.current = null;
      },
    };

    try {
      await onSubmit(customEvent);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

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

  const handleColorSelect = (color: string, colorId: string) => {
    setSelectedColor(color);

    // Get current color list
    const currentColors = form.getValues("colorlist") || [];

    const colorIndex = currentColors.indexOf(colorId);

    let updatedColors = [...currentColors];
    if (colorIndex >= 0) {
      updatedColors.splice(colorIndex, 1);
    } else {
      updatedColors.push(colorId);
    }

    // Update form value
    form.setValue("colorlist", updatedColors, { shouldValidate: true });
  };

  // Remove color handler
  const handleRemoveColor = (colorId: string) => {
    const currentColors = form.getValues("colorlist") || [];
    const updatedColors = currentColors.filter((id) => id !== colorId);
    form.setValue("colorlist", updatedColors, { shouldValidate: true });

    // Reset selected color visual indicator if removing the currently selected color
    const selectedColorObj = colors.find((c) => c.colorId === colorId);
    if (selectedColorObj && selectedColorObj.colorCode === selectedColor) {
      setSelectedColor("#FFFFFF");
    }
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

  // Modified handleRemoveImage to properly clean up
  const handleRemoveImage = () => {
    // Reset form value
    form.setValue("imgurl", "", { shouldValidate: true });

    // Clear preview and reset position
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
    }
    setImagePreviewUrl("");
    setImagePosition({ x: 200, y: 225 });

    // Clear file reference
    imageFileRef.current = null;
  };

  // Modified handleRemoveZip to properly clean up
  const handleRemoveZip = () => {
    // Reset form value
    form.setValue("imagefile", "", { shouldValidate: true });

    // Clear state
    setZipUploaded(false);
    setZipFileName(null);

    // Clear file reference
    zipFileRef.current = null;
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8">
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

                {/* Uploaded design - use imagePreviewUrl */}
                {imagePreviewUrl && (
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
                      src={imagePreviewUrl}
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
                disabled={!imagePreviewUrl}
              >
                Smaller
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleResize("increase")}
                disabled={!imagePreviewUrl}
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

                            {imagePreviewUrl && (
                              <div className="flex items-center justify-between p-2 border rounded-md">
                                <div className="flex items-center gap-2">
                                  <div className="w-12 h-12 relative rounded overflow-hidden">
                                    <Image
                                      src={imagePreviewUrl}
                                      alt="Preview"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <span className="text-sm truncate max-w-[150px]">
                                    {uploadingImage
                                      ? "Uploading..."
                                      : "Image selected"}
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

                    <FormField
                      control={form.control}
                      name="imagefile"
                      render={({ field: { onChange, value, ...rest } }) => (
                        <FormItem>
                          <FormLabel>Source Files (ZIP, RAR, etc.)</FormLabel>
                          <FormControl>
                            <div className="border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer text-center">
                              <Input
                                {...rest}
                                id="imagefile"
                                type="file"
                                onChange={(e) => {
                                  handleZipFileChange(e);
                                }}
                                accept=".zip,.rar,.7z,.tar,.gz,.bz2"
                                className="hidden"
                              />
                              <label
                                htmlFor="imagefile"
                                className="flex flex-col items-center gap-2 cursor-pointer"
                              >
                                <div className="h-10 w-10 text-muted-foreground">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                    <polyline points="17 8 12 3 7 8" />
                                    <line x1="12" y1="3" x2="12" y2="15" />
                                  </svg>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-medium">
                                    Click to upload source files
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Upload ZIP, RAR, 7Z or other compressed
                                    files
                                  </p>
                                </div>
                              </label>
                            </div>
                          </FormControl>

                          {/* Display selected file name */}
                          {value && (
                            <div className="flex items-center justify-between p-2 border rounded-md mt-2">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 flex items-center justify-center bg-muted rounded">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M5 8V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
                                    <path d="M19 16v3a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3" />
                                    <rect
                                      width="20"
                                      height="8"
                                      x="2"
                                      y="8"
                                      rx="2"
                                    />
                                  </svg>
                                </div>
                                <span className="text-sm truncate max-w-[150px]">
                                  {zipFileName}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => onChange(undefined)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}

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
                isUploading || // Add isUploading to disable button during uploads
                !imagePreviewUrl ||
                !watchedValues.tshirtname ||
                watchedValues.colorlist.length === 0 ||
                !zipFileName
              }
            >
              {isUploading ? (
                <>
                  <Upload className="mr-2 h-4 w-4 animate-spin" />
                  Uploading Files...
                </>
              ) : isLoading ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-spin" />
                  Saving Design...
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
