import delete_user from "../../../../actions/delete_user"

export async function POST(request){

    const message = await request.json(request)
    delete_user(message.name)

    return new Response( {
        status: 200,
        headers: {
            "Content-type": "application/json"
        }
    })

}