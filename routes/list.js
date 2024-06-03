//Importing express module
const express = require('express')

const route = express.route()

app.use(express.json());

let books = [
    {
        id: 10,
        title: 'first',
        autor: 'Tapere Yetunde',
        publishedDate: '2010 - 12- 04',
        summary: 'fictional novel.'
     },

     {
        id: 20,
        title: 'second',
        autor: 'Charles Darwin',
        publishedDate: '1920 - 12- 04',
        summary: 'Evolution Theory.'
     },

     {
        id: 30,
        title: 'third',
        autor: 'Christ',
        publishedDate: '1000 - 12- 04',
        summary: 'Word of God.'
     }
]

/**
 * @swagger
 * /api/books:
 *  get:
 *      summary: Returns list of books
 *      description: Returns list of books requested by the user
 *      responses:
 *          200:
 *              description: A successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                  title:
 *                                      type: string
 *                                  author:
 *                                      type: string
 *                                  publishedDate:
 *                                      type: string
 *                                  summary:
 *                                      type: string
 *                          example:
 *                              - id: 10
 *                                title: 'first'
 *                                author: 'Tapere Yetunde'
 *                                publishedDate: '2010-12-04'
 *                                summary: 'fictional novel.'
 *                              - id: 20
 *                                title: 'second'
 *                                author: 'Charles Darwin'
 *                                publishedDate: '1920-12-04'
 *                                summary: 'Evolution Theory.'
 *                              - id: 30
 *                                title: 'third'
 *                                author: 'Christ'
 *                                publishedDate: '1000-12-04'
 *                                summary: 'Word of God.'
 */

 
route.get('/api/books', (req, res) => {
    res.json(books);
    console.log('working')
  });

  /**
   * /api/books/{id}:
   *    get:
   *        summary: Get a book by ID
   *        parameters:
   *           - in: path
   *            name: id
   *            required: true
   *            schema:
   *                type: integer
   *            description: Book ID
   *        responses:
   *            200:
   *                description: Returna a book with the specified ID
   *                content:
   *                   application/json:
   *                    schema:
   *                       type: object
   *                          properties:
   *                            id:
   *                                type: integer
   *                            title:
   *                                type: string
   *                            author:
   *                                  type: string
   *                              publishedDate:
   *                                  type: string
   *                              summary:
   *                                  type: string
   *                          example:
   *                              id: 10
   *                              title: 'first'
   *                              author: 'Tapere Yetunde'
   *                               publishedDate: '2010-12-04'
   *                              summary: 'fictional novel.'
   *          404:
   *              description: Not found
   */

   
  route.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookId);

    if (book) {
        res.json(book);
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
});

  /**
   * @swagger
   * /api/books:
   *    post:
   *        summary: Create a new book
   *        requestBody:
   *            required: true
   *            content:
   *                application/json:
   *                    schema:
   *                        type: object
   *                        properties:
   *                            id:
   *                                type: integer
   *                            title:
   *                                type: string
   *                            author:
   *                                type: string
   *                            publishedDate:
   *                                type: string
   *                            summary:
   *                                type: string
   *                        example:
   *                            id: 40
   *                            title: 'fourth'
   *                            author: 'New Author'
   *                            publishedDate: '2022-01-01'
   *                            summary: 'A new book summary.'
   *        responses:
   *            201:
   *                description: Successfully created
   */
  
  route.post('/api/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
  });

  /**
   * @swagger
   * /api/books/{id}:
   *    put:
   *        summary: Updating booklist
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *                type: integer
   *            description: BOOKlIST ID
   *        requestBody:
   *            required: true
   *            content:
   *                application/json:
   *                    schema:
   *                        type: object
   *                        properties:
   *                            id:
   *                                type: integer
   *                            title:
   *                                type: string
   *                            author:
   *                                type: string
   *                            publishedDate:
   *                                type: string
   *                            summary:
   *                                type: string
   *                        example:
   *                            id: 10
   *                            title: 'updated title'
   *                            author: 'Updated Author'
   *                            publishedDate: '2010-12-04'
   *                            summary: 'Updated summary.'
   *        responses:
   *            200:
   *                description: Successfully updated
   *            404:
   *                description: Not found
   */

  
  route.put('api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books[bookIndex] = req.body;
        res.json(books[bookIndex]);
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
  })

  /**
   * @swagger
   * /api/books/{id}:
   *    delete:
   *        summary: Delete a book using ID
   *        parameters:
   *          - in: path
   *            name: id
   *            required: true
   *            schema:
   *                type: integer
   *            description: ID
   *        response:
   *            200:
   *                description: Deleted successfully
   *            404:
   *                description: Not found
   */

  route.delete('./:id', (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.send({ message: 'Deleted successfully' });
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
});
