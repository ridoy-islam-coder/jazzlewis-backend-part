

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import config from "../config";
import AppError from '../error/AppError';
import catchAsync from '../utils/catchAsync';
import { Admin } from '../modules/Dashboard/admin/admin.model';
import User from '../modules/user/user.model';




// const auth = (...userRoles: string[]) => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
//     }

//     let decoded: JwtPayload;
//     try {
//       decoded = jwt.verify(
//         token,
//         config.jwt.jwt_access_secret as string,
//       ) as JwtPayload;
//     } catch (err) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized');
//     }

//     const id = decoded.id || decoded.userId;
//     const role = decoded.role;

//     let isExist = null;
//     if (role === 'admin' || role === 'super_admin') {
//       isExist = await Admin.findById(id).select('+password');
//     } else {
//       isExist = await User.IsUserExistbyId(id);
//     }

//     if (!isExist) {
//       throw new AppError(httpStatus.NOT_FOUND, `${role} not found`);
//     }

//     if (userRoles.length && !userRoles.includes(role)) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
//     }



//     req.user = {
//       id: isExist._id,
//       userId: isExist._id,
//       _id: isExist._id, 
//       email: isExist.email,
//       role: isExist.role,
//     };
//     next();
//   });
// };

// export default auth;

type AuthAccount = {
  _id: string;
  email: string;
  role: string;
};

const auth = (...allowedRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new AppError(401, 'Unauthorized');

    const decoded = jwt.verify(
      token,
      config.jwt.jwt_access_secret as string,
    ) as JwtPayload;

    const id = decoded.id;

    const admin = await Admin.findById(id).select('email role');
    const user = admin ? null : await User.IsUserExistbyId(id);

    const account: AuthAccount | null = admin ? { _id: String(admin._id), email: admin.email, role: admin.role } : user ? { _id: String(user._id), email: user.email, role: user.role } : null;

    if (!account) {
      throw new AppError(404, 'Account not found');
    }

    if (allowedRoles.length && !allowedRoles.includes(account.role)) {
      throw new AppError(403, 'Forbidden');
    }

    req.user = {
      id: account._id,
      email: account.email,
      role: account.role,
    };

    next();
  });
};

 export default auth;