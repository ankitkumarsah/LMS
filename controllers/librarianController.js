import db from "../configs/dbCon";
import CustomErrorHandler from "../services/CustomErrorHandler";
import bcrypt from "bcrypt";
///////////////////////////////////////////////////

//add new user
const addUser = async (req, res, next) => {
  const { name, email, mobile, password, status } = req.body;

  try {
    //check user is exists
    const sql = "SELECT * FROM users WHERE mobile =?";
    const chekUser = await db.query(sql, [mobile]);
    if (chekUser.length > 0) {
      return next(
        CustomErrorHandler.alreadyExists(
          "This User is already Present in Our Records!"
        )
      );
    } else {
      //if user is not present
      //const hashpass = await bcrypt.hash(password, 12);
      const sql2 =
        "INSERT INTO users(name,email,mobile,book_qty,password,role,status) VALUES (?,?,?,?,?,?,?)";
      const insertUser = await db.query(sql2, [
        name,
        email,
        mobile,
        "0",
        password,
        "0",
        status,
      ]);
      return res.status(201).json({ msg: "User inserted Successfully!" });
    }
  } catch (error) {
    return next(error);
  }
};

//add new book
const addBook = async (req, res, next) => {
  const { bookname, description, bookauthor, quantity, status } = req.body;
  try {
    const sql =
      "INSERT INTO books (bookname, description, bookauthor, quantity,status) VALUES (?,?,?,?,?)";
    const dataInsert = await db.query(sql, [
      bookname,
      description,
      bookauthor,
      quantity,
      status,
    ]);

    return res.status(201).json({ msg: "Book Inserted Successfully!" });
  } catch (error) {
    return next(error);
  }
};
//issue book to user
const issueBook = async (req, res, next) => {
  const { user_id, bookid } = req.body;
  const userid = parseInt(user_id);
  try {
    const sql =
      "SELECT COUNT(*) as book_qty FROM issued_books WHERE userid = ?";
    const checkBookQty = await db.query(sql, [userid]);
    console.log(checkBookQty[0].book_qty);
    if (checkBookQty[0].book_qty == 3) {
      return next(
        CustomErrorHandler.alreadyExists(
          "You can't issue more than 3 books at a time"
        )
      );
    } else {
      const sql2 =
        "INSERT INTO issued_books (bookid,userid,status) VALUES (?,?,?)";
      const insertBookIssue = await db.query(sql2, [bookid, userid, 1]);
      return res.status(200).json({ msg: "Book Issued Successfully!" });
    }
  } catch (error) {
    return next(error);
  }
};

export { addUser, addBook, issueBook };
