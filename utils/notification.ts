export const createNotification = (
  toast: any,
  type: string,
  action: string
) => {
  return toast({
    title: `${action} ${type}...`,
    status: "info",
    isClosable: true,
  });
};

export const updateNotification = (
  toastId: string,
  toast: any,
  type: string,
  action: string
) => {
  toast.update(toastId, {
    title: `${type} ${action} successfull.`,
    status: "success",
    isClosable: true,
  });
};
