const errorMiddleware = (err, req, res, next) => {

  console.log(err);
  // Handle validation(model) errors
  if (err.name === "ValidationError") {
    // err.errors
    // message properties
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors,
    });
  }

  // Handle email unique validation errors
  if(err.code===11000 && err.keyPattern.email===1){
    return res.status(400).json({
      success: false,
      message: "Email must be unique",
    });
  }


  // ApiError
  const status = err.statusCode || 500;
  const message = err.message || "Server Error";
  return res.status(status).json({
    success: false,
    message,
    errors: err.erros || [],
  });

};

module.exports = { errorMiddleware };
