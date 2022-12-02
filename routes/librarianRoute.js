import express from "express";
import {
  addBook,
  addUser,
  issueBook,
} from "../controllers/LibrarianController";
import auth from "../middlewares/auth";
const librarianRoute = express.Router();

librarianRoute.post("/addbook", auth, addBook);
librarianRoute.post("/adduser", auth, addUser);
librarianRoute.post("/issuebook", auth, issueBook);
export default librarianRoute;
