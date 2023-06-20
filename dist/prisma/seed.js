"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const argon = require("argon2");
async function main() {
    const plainPassword = "superadmin@123";
    const hash = await argon.hash(plainPassword);
    await prisma.user.create({
        data: {
            name: "superadmin",
            email: "superadmin@gmail.com",
            password: hash,
            googleid: null,
            hashedRt: null,
            roleId: 3
        },
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map