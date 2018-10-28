export const shelves = [{
  id: "shelf1",
  name: "Shelf 1"
}, {
  id: "shelf2",
  name: "Shelf 2"
}, {
  id: "shelf3",
  name: "Shelf 3"
}];

export const books = [
  {
    id: 1,
    title: "Book1 Title",
    authors: "Jonh Doe",
    imageLinks: { thumbnail: "http://fakeimage.com/image1.png" },
    shelf: "shelf1"
  },
  {
    id: 2,
    title: "Book2 Title",
    authors: "Jane Doe",
    imageLinks: { thumbnail: "http://fakeimage.com/image2.png" },
    shelf: "shelf3"
  }
];

export const booksWithoutShelf = [
  {
    id: 1,
    title: "Book1 Title",
    authors: "Jonh Doe",
    imageLinks: { thumbnail: "http://fakeimage.com/image1.png" }
  },
  {
    id: 3,
    title: "Book3 Title",
    authors: "Jonh Roe",
    imageLinks: { thumbnail: "http://fakeimage.com/image3.png" }
  }
];