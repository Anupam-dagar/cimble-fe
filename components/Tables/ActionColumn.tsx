import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { TableType } from "../../constants/enum";
import ConfirmationDialog from "../AlertComponent/ConfirmationDialog";
import EditConfigurationModal from "../Modal/EditConfigurationModal";

const ActionColumn = ({
  id,
  onEdit,
  onDelete,
  type,
  name,
  info,
}: {
  id: string;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  type: TableType;
  name: string;
  info: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const onDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onOpen();
  };

  const onEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEditOpen();
  };

  const getEditModal = (type: TableType) => {
    switch (type) {
      case TableType.CONFIGURATIONS: {
        return (
          <EditConfigurationModal
            isOpen={isEditOpen}
            onOpen={onEditOpen}
            onClose={onEditClose}
            configName={name}
            configInfo={info}
            id={id}
          />
        );
      }
    }
  };

  const editModal = getEditModal(type);

  return (
    <>
      <ButtonGroup variant={"outline"} spacing={2} size="sm" zIndex={2}>
        <Tooltip label="Edit" placement="left" hasArrow>
          <IconButton
            variant="outline"
            colorScheme={"teal"}
            aria-label="Edit Organisation"
            icon={<EditIcon />}
            onClick={onEditClick}
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
      {editModal}
    </>
  );
};

export default ActionColumn;
