import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { BannedPerson } from "@/types";

interface RemovePersonDialogProps {
  person: BannedPerson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRemovePerson: (id: number) => void;
}

export const RemovePersonDialog = ({
  person,
  open,
  onOpenChange,
  onRemovePerson,
}: RemovePersonDialogProps) => {
  if (!person) return null;

  const handleRemove = () => {
    onRemovePerson(person.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            <strong>{person.name}</strong> from the banned list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};