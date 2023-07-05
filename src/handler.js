const { nanoid } = require('nanoid');
const booksData = require('./booksData');

const addBookHandler = (r, h) => {
  const { pageCount, readPage } = r.payload;

  const finished = pageCount === readPage ? 1 : 0;
  const id = nanoid(16);
  const insertsedAt = new Date().toISOString();
  const updateAT = insertsedAt;
  const book = {
    ...r.payload,
    id,
    finished,
    insertsedAt,
    updateAT,
  };

  booksData.push(book); // push data obj ke array
  const isSuccess = booksData.filter((note) => note.id === id).length > 0;
  //  filter data dari array notes cari obj dengan id dari obj ===id yg baru dibuat,
  //  jika return length > 0 maka true
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBookByIdHandler = (r, h) => {
  const { id } = r.params;
  const book = booksData.filter((val) => val.id === id)[0];
  if (book !== undefined) {
    return { status: 'success', data: { book } };
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const getAllBooksHandler = (r, h) => ({
  status: 'success',
  data: { booksData },
});

const editBookByIdHandler = (r, h) => {
  const { id } = r.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = r.payload;
  const updateAT = new Date().toISOString();
  const index = booksData.findIndex((note) => note.id === id);

  if (index !== -1) {
    booksData[index] = {
      ...booksData[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };
  }
  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbaharui',
  });
  response.code(200);
  return response;
};

const deleteBookByIdHandler = (r, h) => {
  const { id } = r.params;
  const index = booksData.findIndex((note) => note.id === id);
  if (index !== -1) {
    booksData.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
