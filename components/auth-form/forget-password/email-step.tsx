import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function EmailStep({
  email,
  setEmail,
  onSubmit,
  isLoading,
}: EmailStepProps) {
  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Enter your registered email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Button
        onClick={onSubmit}
        disabled={!email || isLoading}
        className="w-24"
      >
        {isLoading ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}
