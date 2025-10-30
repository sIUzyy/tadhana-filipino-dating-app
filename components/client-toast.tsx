"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToast() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          textAlign: "center",
        },
      }}
    />
  );
}
