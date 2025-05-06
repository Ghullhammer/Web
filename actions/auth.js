import prisma from "../lib/prisma"

export default async function auth(login, password){
    console.log(login, password)
    const result = await prisma.user.findFirst({
        where:{
            name: login,
            password: password
        }
    });
    console.log(result)
    if(result){
        return true;
    }else{
        return false;
    }
    

}