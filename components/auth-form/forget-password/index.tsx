"use client";

import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ForgotPasswordHeader } from "./dialog-header";
import { EmailStep } from "./email-step";
import { VerifyStep } from "./verify-step";
import { ChangePasswordStep } from "./change-password-step";
import { useDialogStore } from "@/domains/stores";

type Step = "email" | "verify" | "change";

export function ForgotPasswordDialog() {
  const { isOpen, type, closeDialog } = useDialogStore();
  const [step, setStep] = useState<Step>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetForm = useCallback(() => {
    setStep("email");
    setEmail("");
    setCode("");
    setPassword("");
    setConfirmPassword("");
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSendCode = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("verify");
  };

  const handleVerifyCode = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("change");
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    closeDialog();
  };

  if (type !== "forgotPassword") return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="sm:max-w-md">
        <ForgotPasswordHeader step={step} />

        <div className="space-y-4 py-4">
          {step === "email" && (
            <EmailStep
              email={email}
              setEmail={setEmail}
              onSubmit={handleSendCode}
              isLoading={isLoading}
            />
          )}

          {step === "verify" && (
            <VerifyStep
              code={code}
              setCode={setCode}
              onSubmit={handleVerifyCode}
              isLoading={isLoading}
            />
          )}

          {step === "change" && (
            <ChangePasswordStep
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              onSubmit={handleChangePassword}
              isLoading={isLoading}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
