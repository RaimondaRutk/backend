import bcrypt from "bcrypt";

export const hashIt = async (password) => {
  const salt = await bcrypt.genSalt(6);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}
//hashIt(password);
// compare the password user entered with hashed pass.
 export const compareIt = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compare(password, hashedPassword);
  return validPassword;
}
//compareIt(password, hashedPassword);