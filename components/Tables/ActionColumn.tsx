import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, Tooltip } from "@chakra-ui/react";

const ActionColumn = ({
  id,
  onEdit,
  onDelete,
}: {
  id: string;
  onEdit: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>, id: string) => void;
}) => {
  return (
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
          onClick={(e) => onDelete(e, id)}
        />
      </Tooltip>
    </ButtonGroup>
  );
};

export default ActionColumn;
