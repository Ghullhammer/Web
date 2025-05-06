import get_documents from "../../../../actions/get_documents";

export async function GET(req){

    let result = await get_documents()
    return new Response(JSON.stringify(result), {
        headers: {
            "Content-type": "application/json"
        }
    });

}