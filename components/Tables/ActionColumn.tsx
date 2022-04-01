import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import ConfirmationDialog from "../AlertComponent/ConfirmationDialog";

const ActionColumn = ({
  id,
  onEdit,
  onDelete,
}: {
  id: string;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <>
      <ButtonGroup variant={"outline"} spacing={2} size="sm" zIndex={2}>
        <Tooltip label="Edit" placement="left" hasArrow>
          <IconButton
            variant="outline"
            colorScheme={"teal"}
            aria-label="Edit Organisation"
            icon={<EditIcon />}
            onClick={(e) => onEdit(e, id)}
          />
        </Tooltip>

        <Tooltip label="Delete" placement="right" hasArrow>
          <IconButton
            variant="outline"
            colorScheme="red"
            aria-label="Delete Organisation"
            icon={<DeleteIcon />}
            onClick={onDeleteClick}
          />
        </Tooltip>
      </ButtonGroup>
      <ConfirmationDialog
        onActionClick={onDelete}
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      />
    </>
  );
};

export default ActionColumn;
