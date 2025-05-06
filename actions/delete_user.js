import prisma from "../lib/prisma";

export default async function delete_user(name){
    
    console.log("На сервере удаляю,", name)
    await prisma.user.delete({
        where: {
            name: name
        },
    })



}