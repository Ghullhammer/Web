import prisma from "../lib/prisma"

export default async function add_document(name, author, description, downloadLink){

    const result = await prisma.document.create({
        data:{
            name,
            author,
            description,
            downloadLink
        }
    }
    );

    return result;

}