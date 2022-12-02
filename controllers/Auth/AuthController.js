import Joi from "joi";
import bcrypt from "bcrypt";
import db from "../../configs/dbCon.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import jwtServices from "../../services/JwtServices.js";
import { REFRESH_SECRET } from "../../configs/index.js";
const Login = async (req, res, next) => {
  const { mobile, pwd } = req.body;

  //validate incoming request
  // const userLoginSchema = Joi.object({
  //   email: Joi.string().email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ["com", "net"] },
  //   }),
  //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  // });
  try {
    const sql = "SELECT * FROM users WHERE mobile=?";
    const userCheck = await db.query(sql, [mobile]);
    if (userCheck.length > 0) {
      const userPwd = userCheck[0].password;
      //if password is matched
      if (pwd == userPwd) {
        //create payload
        const payload = {
          id: userCheck[0].id,
          role: userCheck[0].role,
        };
        //generate tokens
        const accessToken = jwtServices.sign(payload);
        const refreshToken = jwtServices.sign(payload, "1h", REFRESH_SECRET);
        return res.status(200).json({
          login_status: true,
          role: userCheck[0].role,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
      return next(CustomErrorHandler.wrongCredentials());
    } else {
      return next(CustomErrorHandler.wrongCredentials());
    }
  } catch (error) {
    return next(error);
  }
};
export { Login };
