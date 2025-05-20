'use client'

import { useState } from 'react'


async function sendFileName(fileName) {
  console.log('Відправляю назву файлу:', fileName)


  const response = await fetch('/api/upload_document', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({name: "test", link: "testLink" }),
  })

  if (response.ok) {
    console.log('Назву файлу успішно відправлено!')
  } else {
    console.error('Помилка при відправленні назви файлу')
  }
}

async function sendReg(name, password, email) {
  console.log('Логін:', name)
  console.log('Пароль:', password)
  console.log('Email:', email)

  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, password, email }),
  })
}

function deleteUserServer(name) {

  fetch("http://localhost:3000/api/delete_user", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name }),
  })
}

function deleteDocumentServer(name) {

  fetch("http://localhost:3000/api/delete_document", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name }),
  })
}


export default function ClientAdminPanel({ initialUsers, initialDocuments }) {
  const [users, setUsers] = useState(initialUsers || ['Іван', 'Марія'])
  const [documents, setDocuments] = useState(initialDocuments || [
    'Дюна (1965)',
    'Убік (2009)',
    'Вій (1835)',
  ])
  const [newUser, setNewUser] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserEmail, setNewUserEmail] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [selectedFile, setSelectedFile] = useState(null);
  const [docName, setDocName] = useState('');
  const [docAuthor, setDocAuthor] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');


  const addUser = () => {
    if (newUser.trim() && newUserPassword.trim() && newUserEmail.trim()) {
      setUsers([...users, newUser.trim()])
      sendReg(newUser, newUserPassword, newUserEmail)
      setNewUser('')
      setNewUserPassword('')
      setNewUserEmail('')
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile || selectedFile.type !== 'application/pdf') {
      setUploadMessage('Будь ласка, виберіть PDF-файл');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('name', docName);
      formData.append('author', docAuthor);
      formData.append('description', docDescription);

      let res = await fetch('/api/upload_document', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Помилка при завантаженні');
      }

      const result = await res.json();
      setUploadMessage('Файл успішно завантажено');

      const uploadedName = docName || selectedFile.name || 'Новий документ';
      setDocuments([...documents, uploadedName]);

      // Очистка
      setSelectedFile(null);
      setDocName('');
      setDocAuthor('');
      setDocDescription('');
      document.getElementById('document').value = null;
    } catch (error) {
      setUploadMessage(error.message);
    }
  };



  const deleteUser = (name) => {
    setUsers(users.filter((user) => user !== name))
    deleteUserServer(name)
  }

  const deleteDocument = (doc) => {
    setDocuments(documents.filter((d) => d !== doc))
    deleteDocumentServer(doc)
  }

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <h2 id="adminPanel">Панель адміністратора</h2>
      <div className="menuSelect">
        <div className="usersList w-[20%]">
          <h3>Користувачі</h3>
          <div className='flex flex-col gap-2'>
            <input
              type="text"
              id="newUser"
              placeholder="Ім'я нового користувача"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            />
            <input
              type="text"
              id="newUserPassword"
              placeholder="Пароль нового користувача"
              value={newUserPassword}
              onChange={(e) => setNewUserPassword(e.target.value)}
            />
            <input
              type="email"
              id="newUserEmail"
              placeholder="Email нового користувача"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
            />
            <button onClick={addUser}>Додати</button>
          </div>
          <ul id="userList">
            <input
              type="text"
              placeholder="Пошук користувача"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {filteredUsers.map((user, idx) => (
              <li key={idx}>
                {user} <button onClick={() => deleteUser(user)}>Видалити</button>
              </li>
            ))}
            {filteredUsers.length === 0 && <li>Користувачів не знайдено</li>}
          </ul>
        </div>

        <div className="documentsList w-[20%]">
          <h3>Документи</h3>
          <ul id="documentList">
            {documents.map((doc, idx) => (
              <li key={idx}>
                {doc} <button onClick={() => deleteDocument(doc)}>Видалити</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="uploadContainer w-[20%]">
          <h3>Завантаження документа</h3>
          <form onSubmit={handleUpload} className="flex flex-col gap-2">
            <input
              type="file"
              name="document"
              id="document"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Назва документа"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Автор документа"
              value={docAuthor}
              onChange={(e) => setDocAuthor(e.target.value)}
            />
            <textarea
              placeholder="Опис документа"
              value={docDescription}
              onChange={(e) => setDocDescription(e.target.value)}
            />
            <button type="submit">Завантажити</button>
            {uploadMessage && <p>{uploadMessage}</p>}
          </form>
        </div>

      </div>
    </div>
  )
}
