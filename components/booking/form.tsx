"use client";

import { useBookingForm } from "@/hooks/booking/use-booking-form";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Plus,
  Trash2,
  FileText,
  Upload,
  Image,
  CalendarIcon,
  Loader2,
} from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TiptapEditor } from "../layout/tip-tap-editor";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Progress } from "@/components/ui/progress";

const BookingForm = () => {
  const { toast } = useToast();
  const [imagePreviewUrls, setImagePreviewUrls] = React.useState<{
    [key: number]: string[];
  }>({});
  const [uploadingItemIndex, setUploadingItemIndex] = useState<number | null>(
    null
  );
  const { form, onSubmit, isLoading, isUploading, uploadProgress } =
    useBookingForm();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "bookingdetails",
  });

  const handleImageChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      // Set the start date if not already set
      form.setValue("startdate", new Date());

      const currentFiles =
        form.watch(`bookingdetails.${index}.designFile`) || [];
      const newFilesArray = Array.from(e.target.files);

      // Validate file types
      const invalidFiles = newFilesArray.filter((file) => {
        const fileType = file.type.toLowerCase();
        return !(
          fileType === "image/png" ||
          fileType === "image/jpeg" ||
          fileType === "image/jpg"
        );
      });

      if (invalidFiles.length > 0) {
        toast({
          title: "Invalid file type",
          description: "Only PNG and JPEG images are allowed.",
          variant: "destructive",
        });
        return;
      }

      // Check if adding would exceed the limit
      if (currentFiles.length + newFilesArray.length > 8) {
        toast({
          title: "Too many images",
          description: "Maximum of 8 images allowed per item.",
          variant: "destructive",
        });
        return;
      }

      // Set uploading item index
      setUploadingItemIndex(index);

      try {
        // Update form value with new files
        const combinedFiles = [...currentFiles, ...newFilesArray];
        form.setValue(`bookingdetails.${index}.designFile`, combinedFiles);
        form.setValue(`bookingdetails.${index}.unitprice`, 100000);

        // Create preview URLs
        const urls = newFilesArray.map((file) => URL.createObjectURL(file));
        setImagePreviewUrls((prev) => ({
          ...prev,
          [index]: [...(prev[index] || []), ...urls],
        }));

        // Simulate waiting for file upload to complete
        // In a real implementation, you'd wait for the upload promise to resolve
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was a problem uploading your images.",
          variant: "destructive",
        });
      } finally {
        // Clear uploading state
        setUploadingItemIndex(null);
      }
    }
  };

  return (
    <div className="mx">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-2xl font-bold text-primary">
            New Booking Request
          </CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <CardContent className="space-y-8 p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg font-medium">
                    Booking Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a descriptive title for your booking"
                    className="text-lg"
                    {...form.register("title")}
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>
                <FormField
                  control={form.control}
                  name="enddate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-lg font-medium">
                        Deadline
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);

                              // Check if date is valid (in the future)
                              if (date && date < new Date()) {
                                toast({
                                  title: "Warning: Past date selected",
                                  description:
                                    "The deadline should be in the future.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The deadline for this booking request
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-primary">
                    Booking Items
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      append({
                        description: "",
                        designFile: [],
                        unitprice: 100000,
                      });
                      toast({
                        title: "Item added",
                        description: "A new booking item has been added.",
                      });
                    }}
                    className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
                    disabled={isUploading || isLoading}
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </div>

                {form.formState.errors.bookingdetails?.root && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.bookingdetails.root.message}
                  </p>
                )}

                <div className="grid gap-6">
                  {fields.map((field, index) => (
                    <Card
                      key={field.id}
                      className="border-2 border-primary/20 overflow-hidden"
                    >
                      <CardHeader className="bg-primary/5 py-3 px-4 flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-medium">
                          Item {index + 1}
                        </CardTitle>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              remove(index);
                              setImagePreviewUrls((prev) => {
                                const newUrls = { ...prev };
                                delete newUrls[index];
                                return newUrls;
                              });
                              toast({
                                title: "Item removed",
                                description: `Item ${
                                  index + 1
                                } has been removed.`,
                              });
                            }}
                            className="h-8"
                            disabled={
                              isUploading ||
                              isLoading ||
                              uploadingItemIndex === index
                            }
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent className="p-4 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <Label
                              htmlFor={`bookingdetails.${index}.description`}
                              className="font-medium"
                            >
                              Description
                            </Label>
                          </div>
                          <Controller
                            control={form.control}
                            name={`bookingdetails.${index}.description`}
                            render={({ field }) => (
                              <TiptapEditor
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Enter detailed description..."
                              />
                            )}
                          />
                          {form.formState.errors.bookingdetails?.[index]
                            ?.description && (
                            <p className="text-sm text-red-500 mt-1">
                              {
                                form.formState.errors.bookingdetails[index]
                                  ?.description?.message
                              }
                            </p>
                          )}
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Image className="h-5 w-5 text-primary" />
                              <Label
                                htmlFor={`items.${index}.image`}
                                className="font-medium"
                              >
                                Images
                              </Label>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {form.watch(`bookingdetails.${index}.designFile`)
                                ?.length || 0}
                              /8 images
                            </span>
                          </div>

                          <Controller
                            control={form.control}
                            name={`bookingdetails.${index}.designFile`}
                            render={({
                              field: { onChange, value, ...field },
                            }) => (
                              <div className="space-y-3">
                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center hover:bg-primary/5 transition-colors">
                                  <div className="flex flex-col items-center gap-2">
                                    {uploadingItemIndex === index ? (
                                      <Loader2 className="h-8 w-8 text-primary/60 animate-spin" />
                                    ) : (
                                      <Upload className="h-8 w-8 text-primary/60" />
                                    )}
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">
                                        {uploadingItemIndex === index
                                          ? "Uploading images..."
                                          : "Drag & drop images here or click to browse"}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        PNG, JPEG only (max 8 images)
                                      </p>
                                    </div>

                                    {/* Upload progress bar */}
                                    {uploadingItemIndex === index &&
                                      uploadProgress[index] > 0 && (
                                        <div className="w-full mt-2">
                                          <Progress
                                            value={uploadProgress[index]}
                                            className="h-2"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                            {uploadProgress[index]}% complete
                                          </p>
                                        </div>
                                      )}

                                    <Input
                                      id={`items.${index}.image`}
                                      type="file"
                                      accept="image/png,image/jpeg,image/jpg"
                                      multiple
                                      className="hidden"
                                      onChange={(e) =>
                                        handleImageChange(index, e)
                                      }
                                      disabled={
                                        isUploading ||
                                        uploadingItemIndex !== null
                                      }
                                      {...field}
                                    />
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="mt-2"
                                      onClick={() =>
                                        document
                                          .getElementById(
                                            `items.${index}.image`
                                          )
                                          ?.click()
                                      }
                                      disabled={
                                        isUploading ||
                                        uploadingItemIndex !== null
                                      }
                                    >
                                      {uploadingItemIndex === index ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Uploading...
                                        </>
                                      ) : (
                                        "Select Images"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                                {form.formState.errors.bookingdetails?.[index]
                                  ?.designFile && (
                                  <p className="text-sm text-red-500">
                                    {
                                      form.formState.errors.bookingdetails[
                                        index
                                      ]?.designFile?.message
                                    }
                                  </p>
                                )}
                              </div>
                            )}
                          />

                          {/* Image previews */}
                          {imagePreviewUrls[index] &&
                            imagePreviewUrls[index].length > 0 && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-medium">
                                    Image Previews:
                                  </p>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 h-7 px-2 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => {
                                      form.setValue(
                                        `bookingdetails.${index}.designFile`,
                                        []
                                      );
                                      setImagePreviewUrls((prev) => ({
                                        ...prev,
                                        [index]: [],
                                      }));
                                      toast({
                                        title: "Images cleared",
                                        description: `All images for item ${
                                          index + 1
                                        } have been removed.`,
                                      });
                                    }}
                                    disabled={
                                      isUploading ||
                                      isLoading ||
                                      uploadingItemIndex === index
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5 mr-1" />
                                    Clear all
                                  </Button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                  {imagePreviewUrls[index].map(
                                    (url, imgIndex) => (
                                      <div
                                        key={imgIndex}
                                        className="relative group"
                                      >
                                        <div className="aspect-square rounded-md overflow-hidden border-2 border-primary/20 shadow-sm">
                                          <img
                                            src={url || "/placeholder.svg"}
                                            alt={`Preview ${imgIndex}`}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                          />
                                        </div>
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          size="icon"
                                          className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                          onClick={() => {
                                            // Remove this image from the form value
                                            const currentFiles = [
                                              ...(form.watch(
                                                `bookingdetails.${index}.designFile`
                                              ) || []),
                                            ];
                                            currentFiles.splice(imgIndex, 1);
                                            form.setValue(
                                              `bookingdetails.${index}.designFile`,
                                              currentFiles
                                            );

                                            // Remove the preview URL
                                            const newUrls = [
                                              ...imagePreviewUrls[index],
                                            ];
                                            newUrls.splice(imgIndex, 1);
                                            setImagePreviewUrls((prev) => ({
                                              ...prev,
                                              [index]: newUrls,
                                            }));

                                            toast({
                                              title: "Image removed",
                                              description: `Image ${
                                                imgIndex + 1
                                              } for item ${
                                                index + 1
                                              } has been removed.`,
                                            });
                                          }}
                                          disabled={
                                            isUploading ||
                                            isLoading ||
                                            uploadingItemIndex === index
                                          }
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 border-t p-6 bg-muted/20">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  setImagePreviewUrls({});
                  toast({
                    title: "Form reset",
                    description: "All form data has been cleared.",
                  });
                }}
                disabled={
                  isLoading || isUploading || uploadingItemIndex !== null
                }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading || isUploading || uploadingItemIndex !== null
                }
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : isUploading || uploadingItemIndex !== null ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading Images...
                  </>
                ) : (
                  "Submit Booking"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BookingForm;
