import { createContext, useContext, useEffect, useState } from "react";

import User from "../utils/user.js";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

function UserProvider(props) {
  const [user, setUser] = useState(User.getUser());

  User.getUser();

  return <UserContext.Provider value={{ user, setUser }} {...props} />;
}

export default UserProvider;
