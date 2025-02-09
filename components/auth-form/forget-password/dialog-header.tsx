import { Key } from "lucide-react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DialogHeaderProps {
  step: "email" | "verify" | "change";
}

export function ForgotPasswordHeader({ step }: DialogHeaderProps) {
  return (
    <DialogHeader>
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
        <Key className="h-6 w-6 text-purple-600" />
      </div>
      <DialogTitle className="text-center">
        {step === "change" ? "Change new password" : "Forget password"}
      </DialogTitle>
      {step === "email" && (
        <p className="text-center text-sm text-muted-foreground">
          Enter your registered email below
        </p>
      )}
      {step === "change" && (
        <p className="text-center text-sm text-muted-foreground">
          Enter a different password with the previous
        </p>
      )}
    </DialogHeader>
  );
}
