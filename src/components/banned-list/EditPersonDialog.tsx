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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isNewImage, setIsNewImage] = useState(false);

  useEffect(() => {
    if (person) {
      setName(person.name);
      setReason(person.reason);
      setImagePreview(person.image || null);
      setIsNewImage(false);
    } else {
      // Clean up when dialog is closed/person is null
      if (imagePreview && isNewImage) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(null);
    }
  }, [person]);

  // Cleanup effect for when the dialog is closed
  useEffect(() => {
    return () => {
      if (imagePreview && isNewImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, isNewImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImagePreview = URL.createObjectURL(file);
      if (imagePreview && isNewImage) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(newImagePreview);
      setIsNewImage(true);
    }
  };

  const handleSubmit = () => {
    if (!person) return;
    if (!name || !reason) {
      showError("Please provide a name and reason.");
      return;
    }
    onEditPerson({ ...person, name, reason, image: imagePreview || undefined });
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
            <Label htmlFor="photo-edit" className="text-right">
              Photo
            </Label>
            <div className="col-span-3 flex items-center gap-4">
              <Avatar>
                <AvatarImage src={imagePreview || undefined} alt="Selected photo" />
                <AvatarFallback>{name.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <Input id="photo-edit" type="file" className="flex-1" onChange={handleImageChange} accept="image/*" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name-edit" className="text-right">
              Name/Alias
            </Label>
            <Input
              id="name-edit"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reason-edit" className="text-right">
              Reason
            </Label>
            <Textarea
              id="reason-edit"
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