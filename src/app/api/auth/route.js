import { headers } from "next/headers";
import auth from "../../../../actions/auth"

export async function POST(request){

    const message = await request.json();
    const result = await auth(message.name, message.password);
    return new Response( JSON.stringify(result), {
        headers: {
            "Content-type": "application/json"
        }
    })

}