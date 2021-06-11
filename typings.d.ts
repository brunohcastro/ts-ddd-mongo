declare namespace Express {
  export interface Application {
    server: import("http").Server;
    start: () => void;
  }

  export interface Request {
    id: string;
    container: import("awilix").AwilixContainer;
  }
}
