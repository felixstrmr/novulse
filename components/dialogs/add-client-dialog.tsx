"use client";

import { useState } from "react";
import AddClientForm from "@/components/forms/add-client-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddClientDialog() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Dialog onOpenChange={setOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button>Add client</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="hidden" />
        <AddClientForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
