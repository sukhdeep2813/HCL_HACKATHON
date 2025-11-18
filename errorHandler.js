// middlewares/errorHandler.js
const globalErrorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR OCCURRED:");
  console.error("🔍 Message:", err.message);
  console.error("📄 Stack Trace:", err.stack);  // Line number, file name
  console.error("⚠ Status Code:", err.statusCode || 500);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined
  });
};

export default globalErrorHandler;
