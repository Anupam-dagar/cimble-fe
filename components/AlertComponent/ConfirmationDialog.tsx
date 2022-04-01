import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onActionClick,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  onActionClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const onActionButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onActionClick(e, id);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Customer
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
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
