import upload_document from "../../../../actions/upload_document"

export async function POST(request){

        const message = await request.json(request)
        upload_document(message.name, message.link)
    
        return new Response( {
            status: 200,
            headers: {
                "Content-type": "application/json"
            }
        })
}