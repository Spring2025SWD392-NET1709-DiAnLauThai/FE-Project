"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TipTapEditor from "../tiptap-editor";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileImporter } from "../import-file";
import FieldLayout from "../layout/field-layout";

const OrderForm = () => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create Post</CardTitle>
        <CardDescription>
          Use the form below to create a new post with rich text formatting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          <FieldLayout label="Title">
            <Input
              id="title"
              placeholder="Enter your post title"
              className="text-lg w-96"
            />
          </FieldLayout>
          <div className="flex flex-row gap-4 ">
            <FieldLayout label="Content">
              <TipTapEditor />
            </FieldLayout>
            <FieldLayout label="Cover Image">
              <FileImporter
                onFileContent={(content) => console.log("content", content)}
              />
            </FieldLayout>
          </div>
          <div className="flex flex-row gap-4 ">
            <FieldLayout label="Content">
              <TipTapEditor />
            </FieldLayout>
            <FieldLayout label="Cover Image">
              <FileImporter
                onFileContent={(content) => console.log("content", content)}
              />
            </FieldLayout>
          </div>
          <div className="flex flex-row gap-4 ">
            <FieldLayout label="Content">
              <TipTapEditor />
            </FieldLayout>
            <FieldLayout label="Cover Image">
              <FileImporter
                onFileContent={(content) => console.log("content", content)}
              />
            </FieldLayout>
          </div>
          <div className="flex flex-row gap-4 ">
            <FieldLayout label="Content">
              <TipTapEditor />
            </FieldLayout>
            <FieldLayout label="Cover Image">
              <FileImporter
                onFileContent={(content) => console.log("content", content)}
              />
            </FieldLayout>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Publish</Button>
      </CardFooter>
    </Card>
  );
};

export default OrderForm;
