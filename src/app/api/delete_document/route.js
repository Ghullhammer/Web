import delete_document from "../../../../actions/delete_document"

export async function POST(request){

    const message = await request.json(request)
    delete_document(message.name)

    return new Response( {
        status: 200,
        headers: {
            "Content-type": "application/json"
        }
    })

}