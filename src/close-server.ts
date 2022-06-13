import { Server } from 'http';

export const closeServer =
  (server: Server): ((err: Error) => void) =>
  (err: Error): void => {
    console.log(`Error: ${err.message}`.red);

    /**
     * Close server and exit process
     */
    server.close(() => process.exit(1));
  };
