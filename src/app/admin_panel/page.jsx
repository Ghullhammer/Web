
import ClientAdminPanel from './client_admin_panel'
import MainHeader from '@/components/MainHeader'
import styles from "./admin_panel.css"

async function get_users() {
  const result = await fetch("http://localhost:3000/api/get_user", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  return result.json()
}

async function get_document(){
  const result = await fetch("http://localhost:3000/api/get_document", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })
  return result.json()
}

export default async function AdminPanel() {
  let usersFromServer = await get_users()
  usersFromServer = usersFromServer.map((e)=>e.name)

  let documentsFromServer = await get_document()
  documentsFromServer = documentsFromServer.map((e)=>e.name)
  console.log(documentsFromServer);
  return (
    <>
      <MainHeader />
      <ClientAdminPanel initialUsers={usersFromServer} initialDocuments = {documentsFromServer} />
    </>
  )
}
