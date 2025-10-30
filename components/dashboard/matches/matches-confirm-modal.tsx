"use client";

// headlessui component
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

// icons
import { CircleAlert } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function MatchesConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-900/50" />

      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg rounded-lg bg-[#18181B] p-6 text-left shadow-xl">
          <div className="flex items-center gap-4">
            <CircleAlert className="h-10 w-10 text-vibrant-red" />
            <div>
              <DialogTitle className="text-lg font-semibold text-white">
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm text-white">{message}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="rounded-md  px-4 py-2 text-sm font-medium text-white hover:opacity-80 hoverEffect"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:opacity-80 hoverEffect"
            >
              Remove
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
