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
    <div className="grid grid-cols-4 grid-rows-1 gap-4">
      <div className="col-span-3">
        <Input
          placeholder="Enter your registered email"
          className="w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="col-start-4">
        <Button
          onClick={onSubmit}
          disabled={!email || isLoading}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
