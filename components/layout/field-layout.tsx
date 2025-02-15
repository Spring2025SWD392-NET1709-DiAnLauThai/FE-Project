import React from "react";
import { Label } from "../ui/label";

interface FieldLayoutProps {
  label: string;
  children: React.ReactNode;
}

const FieldLayout: React.FC<FieldLayoutProps> = ({ label, children }) => {
  return (
    <fieldset className="space-y-4">
      <Label className="text-lg" htmlFor={label}>
        {label}
      </Label>
      <div>{children}</div>
    </fieldset>
  );
};

export default FieldLayout;
