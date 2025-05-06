import prisma from "../lib/prisma";

export default async function get_documents(){

    let result = await prisma.document.findMany()

    return result;

}