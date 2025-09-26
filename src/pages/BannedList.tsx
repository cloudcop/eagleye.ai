import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddPersonDialog } from "@/components/banned-list/AddPersonDialog";
import { EditPersonDialog } from "@/components/banned-list/EditPersonDialog";
import { RemovePersonDialog } from "@/components/banned-list/RemovePersonDialog";
import type { BannedPerson } from "@/types";
import { showSuccess } from "@/utils/toast";

const initialBannedList: BannedPerson[] = [
  {
    id: 1,
    name: "John Doe",
    reason: "Shoplifting",
    date: "2024-07-15",
    image: "https://github.com/shadcn.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    reason: "Repeat Offender",
    date: "2024-06-20",
  },
  {
    id: 3,
    name: "Unknown Male",
    reason: "Suspicious Activity",
    date: "2024-05-10",
  },
];

const BannedList = () => {
  const [banned, setBanned] = useState<BannedPerson[]>(initialBannedList);
  const [personToEdit, setPersonToEdit] = useState<BannedPerson | null>(null);
  const [personToRemove, setPersonToRemove] = useState<BannedPerson | null>(null);

  const handleAddPerson = (newPerson: Omit<BannedPerson, "id" | "date">) => {
    const personToAdd: BannedPerson = {
      ...newPerson,
      id: Math.max(0, ...banned.map((p) => p.id)) + 1,
      date: new Date().toISOString().split("T")[0],
    };
    setBanned([personToAdd, ...banned]);
    showSuccess(`${personToAdd.name} has been added to the banned list.`);
  };

  const handleEditPerson = (updatedPerson: BannedPerson) => {
    setBanned(
      banned.map((p) => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    showSuccess(`${updatedPerson.name}'s details have been updated.`);
  };

  const handleRemovePerson = (id: number) => {
    const person = banned.find(p => p.id === id);
    setBanned(banned.filter((p) => p.id !== id));
    if (person) {
      showSuccess(`${person.name} has been removed from the banned list.`);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Banned List</h1>
        <AddPersonDialog onAddPerson={handleAddPerson} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banned Individuals</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name/Alias</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Date Banned</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banned.map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={person.image} alt={person.name} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{person.name}</TableCell>
                  <TableCell>{person.reason}</TableCell>
                  <TableCell>{person.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPersonToEdit(person)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setPersonToRemove(person)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <EditPersonDialog
        person={personToEdit}
        open={!!personToEdit}
        onOpenChange={(open) => !open && setPersonToEdit(null)}
        onEditPerson={handleEditPerson}
      />

      <RemovePersonDialog
        person={personToRemove}
        open={!!personToRemove}
        onOpenChange={(open) => !open && setPersonToRemove(null)}
        onRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default BannedList;