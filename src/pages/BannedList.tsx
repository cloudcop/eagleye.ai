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
import { useAppContext } from "@/context/AppContext";

const BannedList = () => {
  const { bannedList, addPerson, editPerson, removePerson } = useAppContext();
  const [personToEdit, setPersonToEdit] = useState<BannedPerson | null>(null);
  const [personToRemove, setPersonToRemove] = useState<BannedPerson | null>(
    null
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Banned List</h1>
        <AddPersonDialog onAddPerson={addPerson} />
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
              {bannedList.map((person) => (
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
        onEditPerson={editPerson}
      />

      <RemovePersonDialog
        person={personToRemove}
        open={!!personToRemove}
        onOpenChange={(open) => !open && setPersonToRemove(null)}
        onRemovePerson={removePerson}
      />
    </div>
  );
};

export default BannedList;