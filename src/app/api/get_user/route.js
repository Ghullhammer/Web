
import get_users from "../../../../actions/get_users"

export async function GET(request){

    const result = await get_users();
    return new Response( JSON.stringify(result), {
        headers: {
            "Content-type": "application/json"
        }
    })

}