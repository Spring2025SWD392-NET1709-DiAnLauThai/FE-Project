import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface VerifyStepProps {
  code: string;
  setCode: (code: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function VerifyStep({
  code,
  setCode,
  onSubmit,
  isLoading,
}: VerifyStepProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={isLoading}
      />
      <Button
        onClick={onSubmit}
        disabled={!code || isLoading}
        className="w-full"
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>
    </div>
  );
}
