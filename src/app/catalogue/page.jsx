"use client"
import { useState } from 'react';
import styles from './catalogue.css';
import MainHeader from '../../components/MainHeader';

function BookDetails({ title, author, description, imgLink }) {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState('');

    const toggleDescription = () => setExpanded(prev => !prev);

    const handleAddComment = () => {
        if (commentInput.trim()) {
            setComments(prev => [...prev, commentInput.trim()]);
            setCommentInput('');
        }
    };

    const shortDescription = description.slice(0, 120);

    return (
        <li className="book-item w-250">
            <h3>{title}</h3>
            <p><strong>{author}</strong></p>
            <p className="book-description">
                {expanded ? description : shortDescription}
                <span onClick={toggleDescription} style={{ color: 'blue', cursor: 'pointer' }}>
                    {expanded ? ' ▲' : ' ...'}
                </span>
            </p>

            <div><img src={imgLink} alt={title} /></div>

            <div className="comment-section">
                <button>Завантажити</button>
                <input
                    type="text"
                    placeholder="Ваш коментар..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                />
                <button onClick={handleAddComment}>Додати коментар</button>

                {comments.length > 0 && (
                    <ul className="comment-list">
                        {comments.map((c, idx) => (
                            <li key={idx}>{c}</li>
                        ))}
                    </ul>
                )}
            </div>
        </li>
    );
}

export default function Catalogue() {
    const [searchQuery, setSearchQuery] = useState('');
    const [books] = useState([
        {
            title: "Дюна (1965)",
            author: "Френк П. Герберт",
            description: "Меланж, або прянощі, — найцінніша і найрідкісніша речовина у всесвіті, яка може все: від подовження життя до сприяння міжзоряним подорожам. І знайти її можна лише на одній планеті — непривітному пустельному Арракісі",
            imgLink: "https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg"
        },
        {
            title: "1984",
            author: "Джордж Орвелл",
            description: "1984 — антиутопічний роман Джорджа Орвелла, що описує тоталітарне суспільство, де панує партія на чолі з Великим Братом. Головний герой, Вінстон Сміт, працює в Міністерстві Правди, де переписує історію",
            imgLink: "https://upload.wikimedia.org/wikipedia/commons/0/04/Nineteen_Eighty-Four_cover_Soviet_1984.jpg"
        },
        {
            title: "Убік (2009)",
            author: "Філіп К. Дік",
            description: "«Убік» — культовий роман Філіпа К. Діка, у якому реальність розсипається на очах героїв. Джо Чіпп, звичайний технік, потрапляє у світ, де все зникає або деградує, і тільки Убік дає надію.",
            imgLink: "https://www.rulit.me/data/programs/images/ubik_882539.jpg"
        },
        {
            title: "Вій (1835)",
            author: "Гоголь М. В.",
            description: "«Вій» — моторошна повість Миколи Гоголя, що поєднує містичний жах із народними віруваннями. Семінарист Хома Брут змушений три ночі поспіль читати молитви над тілом загадкової панночки",
            imgLink: "https://upload.wikimedia.org/wikipedia/commons/b/bf/%D0%92%D0%B8%D0%B9.jpg"
        }
    ]);

    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <MainHeader />

            <div id="groupList">
                <div id="catList">
                    <h2>Каталог документів</h2>
                    <input
                        className="selectorUse"
                        type="text"
                        id="searchInput"
                        placeholder="Пошук документа..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <select id="categoryFilter" className="selectorUse">
                        <option value="all">Всі категорії</option>
                        <option value="історія">Природничі науки</option>
                        <option value="наука">Технічні науки</option>
                        <option value="мистецтво">Соціальні науки</option>
                    </select>
                    <button disabled className=''>Пошук</button>
                </div>

                <ul id="documentList">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, index) => (
                            <BookDetails key={index} {...book} />
                        ))
                    ) : (
                        <li>Документів не знайдено</li>
                    )}
                </ul>
            </div>
        </div>
    );
}
