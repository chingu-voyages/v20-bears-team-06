import { Stream } from "stream";

export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  url: string;
  createReadStream: () => Stream;
}
