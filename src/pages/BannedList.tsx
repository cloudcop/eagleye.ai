import { useState, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { AddPersonDialog } from "@/components/banned-list/AddPersonDialog";
import { EditPersonDialog } from "@/components/banned-list/EditPersonDialog";
import { RemovePersonDialog } from "@/components/banned-list/RemovePersonDialog";
import type { BannedPerson } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { ArrowUpDown } from "lucide-react";

type SortKey = keyof BannedPerson;

const BannedList = () => {
  const { bannedList, addPerson, editPerson, removePerson } = useAppContext();

  const [personToEdit, setPersonToEdit] = useState<BannedPerson | null>(null);
  const [personToRemove, setPersonToRemove] = useState<BannedPerson | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>({ key: "date", direction: "descending" });

  const filteredList = useMemo(
    () =>
      bannedList.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [bannedList, searchTerm]
  );

  const sortedList = useMemo(() => {
    let sortableItems = [...filteredList];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredList, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: SortKey) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />;
    }
    return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
  };

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
          <div className="mb-4">
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("name")}>
                    Name/Alias
                    {getSortIndicator("name")}
                  </Button>
                </TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>
                  <Button variant="ghost" onClick={() => requestSort("date")}>
                    Date Banned
                    {getSortIndicator("date")}
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedList.length > 0 ? (
                sortedList.map((person) => (
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
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