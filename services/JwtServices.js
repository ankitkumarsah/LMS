import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs";

class jwtServices {
  static sign(payload, expiry = "1h", secret = JWT_SECRET) {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }

  static verify(token, secret = JWT_SECRET) {
    return jwt.verify(token, secret);
  }
}
export default jwtServices;
