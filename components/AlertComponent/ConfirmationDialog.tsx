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
import { TableType } from "../../constants/enum";
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
  onActionClick: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  id: string;
  type: TableType;
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
