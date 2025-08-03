const { User } = require("../models/index"); // Use consistent import
const { authHash, createToken, compareHash } = require("./auth/auth");

const fetchUser = async (value) => {
  try {
    const user = await User.findOne({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      return { error: "NOT_FOUND" };
    }

    const passwordsMatch = await compareHash({
      userPass: value.password,
      dbPass: user.password,
    });

    if (!passwordsMatch) {
      return { error: "WRONG_PASSWORD" };
    }

    const token = await createToken({
      email: user.email,
      password: user.password,
    });

    return { token, user };
  } catch (error) {
    console.log("fetchUser error:", error);
    return { error: "SERVER_ERROR" };
  }
};

const createUser = async (data) => {
  if (!data || !data.email || !data.password) {
    throw new Error("Missing required user data.");
  }

  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("User already exists.");
  }

  const hashedPassword = await authHash(data.password);

  const newUser = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    address: data.address || '',
  });

  return newUser;
};

module.exports = { fetchUser, createUser };
