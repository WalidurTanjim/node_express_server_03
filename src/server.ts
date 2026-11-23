import app from "./app";
import config from "./config";
import initDB from "./config/db";

const port = config?.PORT || 5000;

// server start function
const startServer = async () => {
     try {
          await initDB();

          app.listen(port, () => {
               console.log(`Server is running on port ${port}`);
          });
     } catch (error) {
          console.error("Server startup failed:", error);
          process.exit(1);
     }
};

startServer();
