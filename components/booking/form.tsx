"use client";

import { useBookingForm } from "@/hooks/booking/use-booking-form";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import { watch } from "fs";
import { Plus, Trash2, FileText, Upload, Image } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TiptapEditor } from "../layout/tip-tap-editor";

const BookingForm = () => {
  const { toast } = useToast();
  const [imagePreviewUrls, setImagePreviewUrls] = React.useState<{
    [key: number]: string[];
  }>({});
  const { form, onSubmit } = useBookingForm();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      // Check if adding these files would exceed the limit
      const currentFiles = form.watch(`items.${index}.image`) || [];
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

      // Update form value with new files
      const combinedFiles = [...currentFiles, ...newFilesArray];
      form.setValue(`items.${index}.image`, combinedFiles);

      // Create preview URLs
      const urls = newFilesArray.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls((prev) => ({
        ...prev,
        [index]: [...(prev[index] || []), ...urls],
      }));
    }
  };

  return (
    <div className=" mx">
      <Card className="shadow-lg border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
          <CardTitle className="text-2xl font-bold text-primary">
            New Booking Request
          </CardTitle>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-8 p-6">
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

            <Separator className="my-6" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-primary">
                  Booking Items
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append({ description: "", image: [] })}
                  className="flex items-center gap-2 border-primary/30 hover:bg-primary/10"
                >
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </div>

              {form.formState.errors.items?.root && (
                <p className="text-sm text-red-500 mt-1">
                  {form.formState.errors.items.root.message}
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
                          onClick={() => remove(index)}
                          className="h-8"
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
                            htmlFor={`items.${index}.description`}
                            className="font-medium"
                          >
                            Description
                          </Label>
                        </div>
                        <Controller
                          control={form.control}
                          name={`items.${index}.description`}
                          render={({ field }) => (
                            <TiptapEditor
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="Enter detailed description..."
                            />
                          )}
                        />
                        {form.formState.errors.items?.[index]?.description && (
                          <p className="text-sm text-red-500 mt-1">
                            {
                              form.formState.errors.items[index]?.description
                                ?.message
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
                            {form.watch(`items.${index}.image`)?.length || 0}/8
                            images
                          </span>
                        </div>

                        <Controller
                          control={form.control}
                          name={`items.${index}.image`}
                          render={({
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            field: { onChange, value, ...field },
                          }) => (
                            <div className="space-y-3">
                              <div className="border-2 border-dashed border-primary/20 rounded-lg p-4 text-center hover:bg-primary/5 transition-colors">
                                <div className="flex flex-col items-center gap-2">
                                  <Upload className="h-8 w-8 text-primary/60" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">
                                      Drag & drop images here or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      PNG, JPEG only (max 8 images)
                                    </p>
                                  </div>
                                  <Input
                                    id={`items.${index}.image`}
                                    type="file"
                                    accept="image/png,image/jpeg,image/jpg"
                                    multiple
                                    className="hidden"
                                    onChange={(e) =>
                                      handleImageChange(index, e)
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
                                        .getElementById(`items.${index}.image`)
                                        ?.click()
                                    }
                                  >
                                    Select Images
                                  </Button>
                                </div>
                              </div>
                              {form.formState.errors.items?.[index]?.image && (
                                <p className="text-sm text-red-500">
                                  {
                                    form.formState.errors.items[index]?.image
                                      ?.message
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
                                    form.setValue(`items.${index}.image`, []);
                                    setImagePreviewUrls((prev) => ({
                                      ...prev,
                                      [index]: [],
                                    }));
                                  }}
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
                                              `items.${index}.image`
                                            ) || []),
                                          ];
                                          currentFiles.splice(imgIndex, 1);
                                          form.setValue(
                                            `items.${index}.image`,
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
                                        }}
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
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              // disabled={isSubmitting}
              className="bg-primary hover:bg-primary/90"
            >
              Submit Booking
              {/* {isSubmitting ? "Submitting..." : "Submit Booking"} */}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default BookingForm;
