import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { TableType } from "../../constants/enum";
import {
  createNotification,
  updateNotification,
} from "../../utils/notification";
import BlurOverlay from "../Overlays/BlurOverlay";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onActionClick,
  id,
  type,
}: {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => Promise<void>;
  id: string;
  type: TableType;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const toast = useToast();

  const onActionButtonClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const notificationId = createNotification(toast, type, "Deleting");
    await onActionClick(e, id);
    updateNotification(notificationId, toast, type, "delete");
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <BlurOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {type.substring(0, type.length - 1)}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onActionButtonClick} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </BlurOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
