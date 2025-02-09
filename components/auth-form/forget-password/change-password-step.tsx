import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChangePasswordStepProps {
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function ChangePasswordStep({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
  isLoading,
}: ChangePasswordStepProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter your new password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Confirm your password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isLoading}
      />
      <Button
        onClick={onSubmit}
        disabled={
          !password ||
          !confirmPassword ||
          password !== confirmPassword ||
          isLoading
        }
        className="w-full"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
}
