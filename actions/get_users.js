import prisma from "../lib/prisma"

export default async function get_users(){

    const result = await prisma.user.findMany();

    return result;

}