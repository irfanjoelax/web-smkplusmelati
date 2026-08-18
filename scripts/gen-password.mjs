import crypto from "node:crypto";

const password = process.argv[2] || "admin123";
const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");

console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
