import prisma from "../lib/prisma";

export default async function upload_document(name, link){

    await prisma.document.create({
        data: {
            name: name,
            link: link
        }
    })

}