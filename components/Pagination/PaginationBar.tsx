import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";

const PaginationBar = ({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}) => {
  const currentPageRange: number[] = [];
  for (let i = currentPage - 5; i < currentPage + 5; i++) {
    if (i > totalPages) {
      break;
    }
    if (i >= 1) {
      currentPageRange.push(i);
    }
  }

  const getButtonVisibilty = (currentPage: number, thresholdPage: number) => {
    if (currentPage === thresholdPage) {
      return "hidden";
    }

    return "visible";
  };

  return (
    <ButtonGroup variant="outline" spacing="6" isAttached>
      <IconButton
        variant="outline"
        aria-label="First Page"
        icon={<ArrowLeftIcon />}
        _hover={{ color: "teal", bg: "teal.50" }}
        onClick={(e) => onPageChange(e, 1)}
        visibility={getButtonVisibilty(currentPage, 1)}
      />
      <IconButton
        variant="outline"
        aria-label="Previous Page"
        icon={<ArrowBackIcon />}
        _hover={{ color: "teal", bg: "teal.50" }}
        onClick={(e) => onPageChange(e, currentPage - 1)}
        visibility={getButtonVisibilty(currentPage, 1)}
      />
      {currentPageRange.map((page) => {
        if (page === currentPage) {
          return (
            <Button
              colorScheme="teal"
              variant={"solid"}
              _hover={{ color: "teal", bg: "teal.50" }}
              onClick={(e) => onPageChange(e, page)}
            >
              {page}
            </Button>
          );
        }
        return <Button onClick={(e) => onPageChange(e, page)}>{page}</Button>;
      })}
      <IconButton
        variant="outline"
        _hover={{ color: "teal", bg: "teal.50" }}
        aria-label="Next Page"
        icon={<ArrowForwardIcon />}
        onClick={(e) => onPageChange(e, currentPage + 1)}
        visibility={getButtonVisibilty(currentPage, totalPages)}
      />
      <IconButton
        variant="outline"
        _hover={{ color: "teal", bg: "teal.50" }}
        aria-label="Last Page"
        icon={<ArrowRightIcon />}
        onClick={(e) => onPageChange(e, totalPages)}
        visibility={getButtonVisibilty(currentPage, totalPages)}
      />
    </ButtonGroup>
  );
};

export default PaginationBar;
