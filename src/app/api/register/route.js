import register from "../../../../actions/register"

export async function POST(request){

    const message = await request.json(request)
    register(message.name, message.password, message.email)

    return new Response( {
        status: 200,
        headers: {
            "Content-type": "application/json"
        }
    })

}