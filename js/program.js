const tabBtns = document.querySelectorAll(".nav-btn");
const tabContainers = document.querySelectorAll(".tab-container");
const bookSel = document.querySelector(".bookSel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
    const buttonName = btn.classList[0].replace("Btn", "").toLowerCase();
    const targetTab = document.querySelector(`.${buttonName}-tab`);
    tabContainers.forEach((tab) => (tab.style.display = "none"));
    if (targetTab) {
      targetTab.style.display = "block";
    }
  });
});

const NKJVBible = {
  version: "NKJV",
  books: [
    {
      name: "Ruth",
      chapters: [
        {
          verses: [
            {
              text: "In the beginning God created the heavens and the earth.",
              num: 1,
            },
            {
              text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
              num: 2,
            }
          ],
          num: 1,
        },
        {
          verses: [
            {
              text: "In the beginning God created the heavens and the earth.",
              num: 1,
            },
            {
              text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
              num: 2,
            }
          ],
          num: 2,
        },
        {
          verses: [
            {
              text: "In the beginning God created the heavens and the earth.",
              num: 1,
            },
            {
              text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
              num: 2,
            }
          ],
          num: 3,
        },
        {
          verses: [
            {
              text: "In the beginning God created the heavens and the earth.",
              num: 1,
            },
            {
              text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
              num: 2,
            }
          ],
          num: 4,
        },
      ],
    },
  ],
};

function getBookNames() {
  return NKJVBible.books.map((book) => book.name);
}

function getBook(name) {
  return NKJVBible.books.find(
    (book) => book.name.toLowerCase() === name.toLowerCase()
  );
}

function getChapter(book, chapter) {
  const selectedBook = getBook(book);
  if (selectedBook) {
    return selectedBook.chapters.find((chap) => chap.num === chapter);
  }
}

function getVerse(book, chapter, verse) {
  const selectedChapter = getChapter(book, chapter);
  if (selectedChapter) {
    return selectedChapter.verses.find((v) => v.num === verse);
  }
}

function getRandomVerse() {
  const randomBookName = getRandomItem(getBookNames());
  if (randomBookName) {
    const randomBook = getBook(randomBookName);
    const randomChapter = getRandomItem(randomBook.chapters);
    if (randomChapter) {
      const randomVerse = getRandomItem(randomChapter.verses);
      if (randomVerse) {
        return {
          book: randomBookName,
          chapter: randomChapter.num,
          verse: randomVerse.num,
          text: randomVerse.text,
        };
      }
    }
  }
  return null;
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function fillWelcomeCards(numberOfCards) {
  const welcomeCardsContainer = document.querySelector(".welcome-cards");
  welcomeCardsContainer.innerHTML = "";

  for (let i = 0; i < numberOfCards; i++) {
    const randomVerse = getRandomVerse();

    if (randomVerse) {
      welcomeCardsContainer.insertAdjacentHTML(
        "beforeend",
        `
      <div class="welcome-card">
            <p class="reference-info">
              <span class="reference-book">${randomVerse.book}</span>
              (<span class="reference-chapter-number">${randomVerse.chapter}</span>:
              <span class="reference-verse-number">${randomVerse.verse}</span>)
            </p>
            <p class="card-reference-verse">${randomVerse.text}</p>
          </div>
      `
      );
    }
  }
}

fillWelcomeCards(10);

const bookDropDown = document.querySelector(".bookDropDown");
function fillBooks(chapters) {
  bookDropDown.innerHTML = "";
  for (let i = 0; i < chapters.length; i++) {
    if (chapters) {
      bookDropDown.insertAdjacentHTML(
        "beforeend",
        `<button class="bookBtn">${chapters[i]}</button>
      `
      );
      const bookBtns = document.querySelectorAll(".bookBtn");
      bookBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          fillChapterBtns(btn.textContent);
        });
      });
    }
  }
}
fillBooks(getBookNames());

function fillChapterBtns(book) {
  let chapters = getBook(book).chapters;
  const chapterListCont = document.querySelector(".chapterList");
  chapterListCont.innerHTML = "";
  chapters.forEach((chapter) => {
    chapterListCont.insertAdjacentHTML(
      "beforeend",
      `<button class="chapterNumBtn scrBtn">${chapter.num}</button>`
    );
  });

  const chapterNumBtns = document.querySelectorAll(".chapterNumBtn");
  chapterNumBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      fillVerseBtns(book, btn.textContent);
      chapterNumBtns.forEach((button) => button.classList.remove("activeScr"));
      btn.classList.toggle("activeScr");
    });
  });
}

function fillVerseBtns(book, chapter) {
  let verses = getBook(book).chapters[chapter].verses;
  // verses = getChapter(book, chapter).verses;
  const verseListCont = document.querySelector(".verseList");
  verseListCont.innerHTML = "";
  verses.forEach((verse) => {
    verseListCont.insertAdjacentHTML(
      "beforeend",
      `<button class="verseNumBtn scrBtn">${verse.num}</button>`
    );
  });

  const verseNumBtns = document.querySelectorAll(".verseNumBtn");
  verseNumBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      verseNumBtns.forEach((button) => button.classList.remove("activeScr"));
      btn.classList.toggle("activeScr");
    });
  });
}


