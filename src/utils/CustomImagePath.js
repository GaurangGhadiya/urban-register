export const getImagePath = (path) => {
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH; // For staging
    // const prefix = "/"; // For local
    return `${prefix}${path}`;
  };
  