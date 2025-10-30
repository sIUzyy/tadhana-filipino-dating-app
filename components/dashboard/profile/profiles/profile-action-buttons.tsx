// shadcn components
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// data type
interface ProfileActionButtonsProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileActionButtons({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: ProfileActionButtonsProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:justify-end mt-5">
      <AnimatePresence mode="wait">
        {!isEditing ? (
          <motion.div
            key="edit-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Button
              onClick={onEdit}
              className="w-full  lg:w-fit lg:px-12 bg-vibrant-red hover:bg-vibrant-hover rounded-md text-white hoverEffect"
            >
              Update Profile
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="edit-actions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4 lg:flex-row lg:justify-end"
          >
            <Button
              onClick={onSave}
              className="lg:w-fit lg:px-10 bg-green-600 text-white hover:opacity-90"
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={onCancel}
              className="lg:w-fit lg:px-10 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
