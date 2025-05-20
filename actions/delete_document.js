import prisma from "../lib/prisma"

export default async function delete_document(name){

    const result = await prisma.document.delete({
        where:{
            name
        }
    }
    );

    return result;

}