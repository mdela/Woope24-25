import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from "../interfaces/User";
import { config } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

/**
 * Middleware function to authenticate a JWT token in the Authorization header of incoming requests.
 * 
 * This middleware checks if a token is provided in the `Authorization` header, verifies it, and attaches
 * the decoded user information to the request object if valid. If the token is missing or invalid, 
 * a 401 Unauthorized status is returned.
 * 
 * @param {express.Request} req - The incoming request object.
 * @param {express.Response} res - The outgoing response object.
 * @param {express.NextFunction} next - The next middleware function to be executed if authentication succeeds.
 * 
 * @returns {void}
 * 
 * @example
 * // Usage example:
 * router.get('/protected-route', authenticateToken, (req, res) => {
 *   // Access req.user here
 * });
 * 
 * @throws {401} If no token is provided or the token is invalid.
 */
export const authenticateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user as User;
    next();
  });
};

// Usage example:
// router.get('/protected-route', authenticateToken, (req, res) => {
//   // Access req.user here
// });
