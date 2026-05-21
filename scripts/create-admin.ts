import { prisma } from "../src/lib/prisma";

async function main() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "jpmaster4rill@gmail.com";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  try {
    const user = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: {
        password: ADMIN_PASSWORD, // Store plaintext for simplicity in dev
      },
      create: {
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD, // Store plaintext for simplicity in dev
      },
    });

    console.log(`✅ Admin user created/updated: ${user.email}`);
    console.log(`📝 Email: ${ADMIN_EMAIL}`);
    console.log(`🔐 Password: ${ADMIN_PASSWORD}`);
    console.log(`\n⚠️  Note: For production, use bcryptjs to hash passwords!`);
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
