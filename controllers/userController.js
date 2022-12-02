import db from "../configs/dbCon";
const bookLists = async (req, res, next) => {
  try {
    const sql = "SELECT * FROM issued_books WHERE userid = ?";
    const listBooks = await db.query(sql, [req.user.id]);
    return res.status(200).json({ listBooks: listBooks });
  } catch (error) {
    return next(error);
  }
};

export { bookLists };
