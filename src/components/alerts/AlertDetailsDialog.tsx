import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Alert, AlertStatus } from "@/types";

interface AlertDetailsDialogProps {
  alert: Alert | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateStatus: (id: number, status: AlertStatus) => void;
}

export const AlertDetailsDialog = ({
  alert,
  open,
  onOpenChange,
  onUpdateStatus,
}: AlertDetailsDialogProps) => {
  if (!alert) return null;

  const handleConfirm = () => {
    onUpdateStatus(alert.id, "Confirmed");
  };

  const handleFalseAlarm = () => {
    onUpdateStatus(alert.id, "False Alarm");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Alert Details</DialogTitle>
          <DialogDescription>
            Review the alert from {alert.camera} at {alert.time}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="bg-black aspect-video rounded-md flex items-center justify-center text-white">
            <p>Camera Snapshot for Alert #{alert.id}</p>
          </div>
          <div>
            <p>
              <strong>Type:</strong> {alert.type}
            </p>
            <p>
              <strong>Severity:</strong> {alert.severity}
            </p>
            <p>
              <strong>Status:</strong> {alert.status}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={handleFalseAlarm}>
            Mark as False Alarm
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Confirm Incident
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};