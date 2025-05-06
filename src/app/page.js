"use client"

import { useState } from "react";
import styles from "./page.css";
import MainHeader from "../components/MainHeader";
import Modal from "../components/Modal";


export default function Home() {


const [modalInfo, setModalInfo] = useState({ isOpen: false, title: "", content: "" });

    const openModal = (title, content, e) => {
        e.preventDefault();
      setModalInfo({ isOpen: true, title, content });
    };
  
    const closeModal = () => {
      setModalInfo({ ...modalInfo, isOpen: false });
    };


  return (
    <>
    
        <MainHeader/>
      
      <main>
          <section>
              <h2>Типи</h2>
              <a>Художня література</a>
              <ul>
                  <li><a href="#">Романи</a></li>
                  <li><a href="#">Повісті</a></li>
                  <li><a href="#">Оповідання</a></li>
              </ul>
              <a>Документальна література</a>
              <ul>
                  <li><a href="#">Природничі науки</a></li>
                  <li><a href="#">Технічні науки</a></li>
                  <li><a href="#">Соціальні науки</a></li>
              </ul>
              <div>
                  <input type="text" value="Пошук"/>
                  <button type="submit">→</button>
              </div>
          </section>
          

          <section>
              <h2>Нові надходження</h2>
              <ul>
                  <li><a href="#">Шантарам — Грегорі Девід Робертс</a></li>
                  <li><a href="#">Сила звички — Чарльз Дахігг</a></li>
                  <li><a href="#">Таємничий острів — Жуль Верн</a></li>
              </ul>
          </section>


          <section>
              <h2>Популярні книги</h2>
              <ul>
                  <li><a href="#">Гаррі Поттер і філософський камінь — Джоан Роулінг</a></li>
                  <li><a href="#">1984 — Джордж Орвелл</a></li>
                  <li><a href="#">Майстер і Маргарита — Михайло Булгаков</a></li>
              </ul>
          </section>

          <section>
              <h2>Цитата дня</h2>
              <blockquote>«Книга — це мрія, яку ти тримаєш у руках.» — Ніл Гейман</blockquote>
          </section>

          <section>
              <h2>Підпишіться на новини</h2>
              <form>
                  <input type="email" placeholder="Введіть ваш email"/>
                  <button type="submit">Підписатися</button>
              </form>
          </section>
      </main>
      
            <footer>
        <div>
          <li><a href="#" onClick={(e) => openModal("Про нас", "Компанія, що створює найкращу онлайн-бібліотеку.", e)}>Про нас</a></li>
          <li><a href="#" onClick={(e) => openModal("Контакти", "Напишіть нам на email: info@library.ua або зателефонуйте: +380 44 123 4567", e)}>Контакти</a></li>
          <li><a href="#" onClick={(e) => openModal("Умови використання", "Всі матеріали доступні лише для особистого використання.", e)}>Умови використання</a></li>
          <li><a href="#" onClick={(e) => openModal("Історія", "Наша бібліотека була створена у 2020 році та продовжує розвиватися.", e)}>Історія</a></li>
        </div>
        <div>
          <h4>Статистика:</h4>
          <li>Збережено: 3 файлів</li>
          <li>Щоденних відвідувачів: 20</li>
        </div>
      </footer>

      {modalInfo.isOpen && (
        <Modal
          title={modalInfo.title}
          content={modalInfo.content}
          onClose={closeModal}
        />
      )}
      
    </>
  );
}
