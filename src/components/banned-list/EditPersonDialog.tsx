import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BannedPerson } from "@/types";
import { showError } from "@/utils/toast";

interface EditPersonDialogProps {
  person: BannedPerson | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEditPerson: (updatedPerson: BannedPerson) => void;
}

export const EditPersonDialog = ({
  person,
  open,
  onOpenChange,
  onEditPerson,
}: EditPersonDialogProps) => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (person) {
      setName(person.name);
      setReason(person.reason);
    }
  }, [person]);

  const handleSubmit = () => {
    if (!person) return;
    if (!name || !reason) {
      showError("Please provide a name and reason.");
      return;
    }
    onEditPerson({ ...person, name, reason });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Person</DialogTitle>
          <DialogDescription>
            Update the details for this person.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Photo
            </Label>
            <Input id="photo" type="file" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name/Alias
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason" className="text-right">
              Reason
            </Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};