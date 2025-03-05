import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface DialogCustomProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  className?: string;
}

const DialogCustom: React.FC<DialogCustomProps> = ({
  children,
  isOpen,
  onClose,
  title,
  className,
}) => {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <AlertDialogTrigger asChild>{title}</AlertDialogTrigger>
      <AlertDialogContent
        className={cn(
          "max-w-[1000px] grid place-content-center border border-none bg-black/0",
          className
        )}
      >
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogCustom;
