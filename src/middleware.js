const booksData = require('./booksData');
const validateRequestMiddleware = (request, h) => {
  const { name, readPage, pageCount } = request.payload;

  if (!name) {
    console.log('Properti name tidak ada ');
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400)
      .takeover();
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400)
      .takeover();
  }

  return h.continue;
};

const validateEditBook = (req, h) => {
  const { id } = req.params;
  const index = booksData.findIndex((book) => book.id === id);
  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbaharui buku. Id tidak ditemukan',
      })
      .code(404)
      .takeover();
  }

  if (req.payload === null) {
    return h
      .response({
        status: 'fail',
        message: 'Data tidak boleh kosong',
      })
      .code(400)
      .takeover();
  }

  const { name, readPage, pageCount } = req.payload;

  console.log(name);
  if (!name) {
    console.log('Properti name tidak ada ');
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbaharui buku. Mohon isi nama buku',
      })
      .code(400)
      .takeover();
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbaharui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400)
      .takeover();
  }

  return h.continue;
};

const validateDeleteBook = (req, h) => {
  const { id } = req.params;
  const index = booksData.findIndex((book) => book.id === id);
  if (index === -1) {
    return h
      .response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      })
      .code(404)
      .takeover();
  }

  return h.continue;
};

module.exports = {
  validateRequestMiddleware,
  validateEditBook,
  validateDeleteBook,
};
