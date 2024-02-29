"use client";
import Layout from "@/app/layout";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type User = {
  id?: number;
  name: string;
  email: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const [user, setUser] = useState<User>({
    name: '',
    email: ''
  });

  async function getUsers() {
    const response = await axios.get('/api/users');
    return response.data;
  }

  async function handleNewUser() {
    const response = await axios.post('/api/users', user);

    if (response.status === 200) {
      setUsers([...users, response.data.data]);
      setUser({ name: '', email: '' });

      setOpen(false);
    }

    return response.data;
  }

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <Layout>
      <main className="container">
        <Header />

        <section className="float-end mb-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant={'outline'}>Create User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New user</DialogTitle>
                <DialogDescription>
                  Create a new user by filling out the form below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" onChange={
                    (e) => setUser({ ...user, name: e.target.value })
                  }
                    value={user.name}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" type="email"
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    value={user.email}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleNewUser}>
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        <Table>
          <TableCaption>A list of your recent users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {users.length} users
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </main>
    </Layout>
  );
}
