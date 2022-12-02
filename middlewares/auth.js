import jwtServices from "../services/JwtServices";
import CustomErrorHandler from "../services/CustomErrorHandler";

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(CustomErrorHandler.unAuthorize());
  }

  try {
    const token = authHeader.split(" ")[1];
    //console.log(token);
    const { id, role } = await jwtServices.verify(token);
    const user = {
      id,
      role,
    };
    req.user = user;
    next();
  } catch (error) {
    return next(CustomErrorHandler.unAuthorize());
  }
};

export default auth;
