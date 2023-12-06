import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

const secret = process.env.SECRET || nanoid();
const expiration = process.env.JWT_EXPIRE || "2h";

/**
 *
 * @param {{req: Express.Request}} ctx
 */
export const authMiddleware = ({ req }) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(" ").pop().trim();
  }

  if (!token) return req;

  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log("Invalid token");
  }

  return req;
};

export const AuthenticationError = new GraphQLError(
  "Could not authenticate user.",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);

export const AuthenticatedError = new GraphQLError(
  "You are already logged in",
  {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }
);

export const createToken = ({ username, _id }) => {
  const payload = { username, _id };
  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
