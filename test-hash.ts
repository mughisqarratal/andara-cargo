import bcrypt from "bcryptjs";

async function run() {
  // Ganti "admin123" dengan password yang kamu inginkan
  const passwordPlain = "admin123";
  
  // Membuat hash
  const hashedPassword = await bcrypt.hash(passwordPlain, 10);
  
  console.log("-----------------------------------------");
  console.log("Password Asli :", passwordPlain);
  console.log("Hash untuk DB :", hashedPassword);
  console.log("-----------------------------------------");
}

run();