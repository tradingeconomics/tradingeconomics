"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { isatty } from "tty";
import { useMutation, useQueryClient } from "react-query";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useGymStore } from "@/store/gym";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { staffSchema } from "../data/schema";

// import { taskSchema } from "../data/schema"

export const labels = [
  {
    value: "true",
    label: "Active",
  },
  {
    value: "false",
    label: "InActive",
  },
];

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const staff = staffSchema.parse(row.original)
  const queryClient = useQueryClient();
  const { gym } = useGymStore();
  const axiosAuth = useAxiosAuth();
  const status = staff.isActive;
  const name = staff.name
  const role = staff.role

  const email = row.getValue("email") as string;

  // change status
  const { mutate: changeStaffStatus } = useMutation({
    mutationFn: async (isActive: string) => {
      const response = await axiosAuth.post("/api/gym/staff/change-status", {
        isActive,
        email,
      });

      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`Status updated!`);
    },
  });

  async function handleStatus() {
    try {
      const isActive = status === true ? `false` : `true`;
      changeStaffStatus(isActive);
    } catch (err) {
      console.log(err);
    }
  }
  // --------------

  // resend invite email
  const { mutate: resendInviteEmail } = useMutation({
    mutationFn: async () => {
      const response = await axiosAuth.post("/api/gym/staff/resend-invite", {
        role,
        email,
      });
      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`A new Invite has been emailed!`);
    },
  });
  async function handleResendEmail() {
    try {
      resendInviteEmail();
    } catch (err) {
      console.log(err);
    }
  } // ----------------------

  // handle invite email cancel
  const { mutate: cancelInviteEmailReq } = useMutation({
    mutationFn: async () => {
      const response = await axiosAuth.post("/api/gym/staff/cancel-invite", {
        email,
      });
      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`The invite has been canceled!`, {description: 'the already sent email inbox wil be invalid'});

    },
  });

  async function cancelInviteEmail() {
    try {
      cancelInviteEmailReq();
    } catch (err) {
      console.log(err);
    }
  } // -------------------
  // handle staff delete/remove
  const { mutate: handleDeleteStaffReq , isLoading} = useMutation({
    mutationFn: async () => {
      const response = await axiosAuth.post("/api/gym/staff/remove", {
        userId: staff?.id,
      });
      return response.data;
    },
    onError: (err: any) => {
      toast.error(err.response.data.errors[0].message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Staff", gym.id] });
      toast.success(`The staff has been removed`);
    },
  });

  async function handleDeleteStaff() {
    try {
      handleDeleteStaffReq();
      setShowDeleteDialog(false);
    } catch (err) {
      console.log(err);
    }
  } // -------------------

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(email);
              }}
            >
              Copy email
            </DropdownMenuItem>

            {!name ? (
              <>
                <DropdownMenuItem onClick={handleResendEmail}>
                  Resend Invite
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>Share invite link</DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="bg-red-500 bg-opacity-25"
                  onClick={cancelInviteEmail}
                >
                  Cancel Invite
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={handleStatus}>
                  {status === true ? "InActive" : "Active"}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  className="text-red-600"
                >
                  Remove Staff
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Invite link</DialogTitle>
            <DialogDescription>
              who has this link will be able to join as staff
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                id="link"
                defaultValue={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/staff/signup?inviteCode=${gym.inviteCode}&role=${role}`}
                readOnly
              />
            </div>
            <Button
              type="button"
              onClick={() => {
                toast.success('Share link added copied to clipboard')
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/staff/signup?inviteCode=${gym.inviteCode}&role=${role}`,
                );
              }}
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This staff user will no longer be
              accessible by you or others in {gym.name}. 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button disabled={isLoading} variant="destructive" onClick={handleDeleteStaff}>

              Remove
              {isLoading &&  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
