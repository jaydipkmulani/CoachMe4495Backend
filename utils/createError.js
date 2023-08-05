// Utility function to create a custom error object
const createError = (status, message) => {
   // Create a new Error object
  const err = new Error();
    // Set the status code and error message for the error object
  err.status = status;
  err.message = message;

  return err;
};

export default createError;