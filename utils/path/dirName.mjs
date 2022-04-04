import { getFileName } from "./filename.mjs";
import path from "path";

export const getDirName = (url) => path.dirname(getFileName(url));
