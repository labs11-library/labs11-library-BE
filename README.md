# Book Maps Backend https://book-maps.herokuapp.com/

**Contributing Engineers**

- [Jacob Layton](https://github.com/JacobLayton)
- [Scott Vojik](https://github.com/sk-vojik)
- [Henry Neal](https://github.com/henron1)
- [David Flack](https://github.com/Zooheck)
- [Blake Fletcher](https://github.com/blkfltchr)



## API Documentation

### General
* server url: https://book-maps.herokuapp.com


### USER ROUTES

#### GET all Users

URL: /users

If successful, response will be an array of objects. Example response data from /users:

```
[
    {
        "userId": 1,
        "googleId": null,
        "facebookId": null,
        "goodreadsId": null,
        "email": "Adrien_Wisozk@gmail.com",
        "password": "vvwkkOwfmOwngOc",
        "firstName": "Rasheed",
        "lastName": "Zulauf",
        "latitude": "60.1863",
        "longitude": "-102.0928",
        "picture": "http://lorempixel.com/640/480/technics",
        "bio": "Maiores dolorum impedit doloribus quaerat voluptatem.",
        "token": null
    },
    {
        "userId": 2,
        "googleId": null,
        "facebookId": null,
        "goodreadsId": null,
        "email": "Eleonore99@gmail.com",
        "password": "f0PgaxgpHyNJL9u",
        "firstName": "Vella",
        "lastName": "Batz",
        "latitude": "-0.8971",
        "longitude": "0.0065",
        "picture": "http://lorempixel.com/640/480/nightlife",
        "bio": "Quisquam alias officia rerum eum.",
        "token": null
    },
]
```

#### GET User by userId

URL: /users/:userId

If successful, response will be the requested user object. Example response for /users/1:

```
{
    "userId": 1,
    "googleId": null,
    "facebookId": null,
    "goodreadsId": null,
    "email": "Adrien_Wisozk@gmail.com",
    "password": "vvwkkOwfmOwngOc",
    "firstName": "Rasheed",
    "lastName": "Zulauf",
    "latitude": "60.1863",
    "longitude": "-102.0928",
    "picture": "http://lorempixel.com/640/480/technics",
    "bio": "Maiores dolorum impedit doloribus quaerat voluptatem.",
    "token": null
}
```

### POST (create) User

URL: /users

If successful, you will receive a success message. None of the values are required by the server to create User. This route is most likely testing only. Example successful POST data:

```
{
    "googleId": null,
    "facebookId": null,
    "goodreadsId": null,
    "email": "test@gmail.com",
    "password": "vvwkkOwfmOwngOc",
    "firstName": "Test",
    "lastName": "Testy",
    "latitude": "60.1863",
    "longitude": "-102.0928",
    "picture": "http://lorempixel.com/640/480/technics",
    "bio": "Maiores dolorum impedit doloribus quaerat voluptatem.",
    "token": null
}
```
Will return: 
```
{
    "message": "User created successfully."
}
```

### PUT (edit) User

URL: /users/:userId

If successful, you will receive a success message, as well as the new edited user object. You can edit as many or as few as you wish. Example successful PUT for /users/1:

```
{
	"firstName": "newTest"
}
```

Will return:
```
{
    "message": "User successfully edited!",
    "editedUser": {
        "userId": 1,
        "googleId": null,
        "facebookId": null,
        "goodreadsId": null,
        "email": "test@gmail.com",
        "password": "vvwkkOwfmOwngOc",
        "firstName": "newTest",
        "lastName": "Testy",
        "latitude": "60.1863",
        "longitude": "-102.0928",
        "picture": "http://lorempixel.com/640/480/technics",
        "bio": "Maiores dolorum impedit doloribus quaerat voluptatem.",
        "token": null
    }
}
```

### DELETE User

URL: /users/:userId

A successful delete will return a message. Example successful DELETE of /users/1 will return:

```
{
    "message": "Sorry to see you go, newTest"
}
```

### USER Inventory Routes

#### GET A User's Inventory:

URL: /users/:userId/inventory

A successful GET will return an array of book objects in the user inventory. Example successful GET of /users/1/inventory will return:
```
[
    {
        "bookId": 19,
        "userId": 1,
        "title": "Sapiens",
        "authors": "Yuval Noah Harari",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 1983759288,
        "avgRating": 4.8,
        "description": "Book is in perfect condition - one of my faves!"
    },
    {
        "bookId": 20,
        "userId": 1,
        "title": "1984",
        "authors": "George Orwell",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 4827440918,
        "avgRating": 4.3,
        "description": "Good condition, missing the last page because I used it to wipe away my tears"
    }
]
```

### GET A User's Specific Inventory Book by bookId

URL: /users/:userId/inventory/:bookId

A successful GET will return the requested book object. Example successful GET of /users/1/inventory/20:
```
{
    "bookId": 20,
    "userId": 1,
    "title": "1984",
    "authors": "George Orwell",
    "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
    "ISBN": 4827440918,
    "avgRating": 4.3,
    "description": "Great condition, missing the last page because I used it to wipe away my tears"
}
```

### PUT (edit) A User's Specific Inventory Book by bookId

URL: /users/:userId/inventory/:bookId

A successful PUT will return a success message, along with the edited book object. You can edit as many or few fields as you like, I would suggest the front end limit this to only description. Example successful PUT of /users/1/inventory/20:
```
{
    "description": "Book is missing last two pages"
}
```
Will return:
```
{
    "message": "Book edited!",
    "editedBook": {
        "bookId": 20,
        "userId": 1,
        "title": "1984",
        "authors": "George Orwell",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 4827440918,
        "avgRating": 4.3,
        "description": "Book is missing last two pages"
    }
}
```


#### POST to a User's Inventory:

URL: /users/:userId/inventory

NOTE: This POST will be largely automated by pre-populated form from goodreads API search.
A successful post will return a success message, as well as the new book that was just added. Example successful POST data to /users/1/inventory:

```
}
    "title": "1984",
    "authors": "George Orwell",
    "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
    "ISBN": 4827440918,
    "avgRating": 4.3,
    "description": "Great condition, missing the last page because I used it to wipe away my tears"
}
```

Will Return:
```
{
    "message": "Book added to shelf!",
    "newBook": {
        "bookId": 20,
        "userId": 1,
        "title": "1984",
        "authors": "George Orwell",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 4827440918,
        "avgRating": 4.3,
        "description": "Great condition, missing the last page because I used it to wipe away my tears"
    }
}
```

#### DELETE Book Item from User's Inventory:

URL: /users/:userId/inventory/:bookId

A successful DELETE will return success message. Example of successful DELETE on /users/1/inventory/20 will return:
```
{
    "message": "Item removed from inventory."
}
```

### CheckedOut Routes

#### GET User's checkedOut List:

URL: /users/:userId/checkedOut

A successful GET will return an array of book objects. Example successful GET on /users/3/CheckedOut will return:

```
[
    {
        "borrower": "Geraldine",
        "borrowerId": 3,
        "bookId": 1,
        "title": "1984",
        "authors": "George Orwell",
        "description": "Great condition, missing the last page because I used it to wipe away my tears",
        "checkedOutId": 1,
        "checkoutDate": null,
        "dueDate": null,
        "lenderId": 1,
        "lender": "Anabelle"
    },
    {
        "borrower": "Geraldine",
        "borrowerId": 3,
        "bookId": 2,
        "title": "Siddhartha",
        "authors": "Hermann Hesse",
        "description": "Used but good condition",
        "checkedOutId": 2,
        "checkoutDate": null,
        "dueDate": null,
        "lenderId": 1,
        "lender": "Anabelle"
    }
]
```

#### GET User's Specific checkedOut Item by checkedOutId:

##### RESPONSE WILL BE MADE BETTER SOON

URL: /users/:userId/checkedOut/:checkedOutId

If successful, you will be returned an object with all the specific checkedOut item data. Example GET of /users/3/checkedOut/1

```
{
    "checkedOutId": 1,
    "borrowerId": 3,
    "lenderId": 1,
    "bookId": 1,
    "checkoutDate": null,
    "dueDate": null
}
```

#### POST To a User's checkedOut List:

URL: /users/userId/checkedOut

A POST must be sent with the `bookId` and `borrowerId`. The backend will get the `lenderId` from the `req.params.userId`, as the lender will be clicking the `confirmed loaned out` button on their dashboard when they've handed off the book. If successful, you will get a success message. Here is an example POST to /users/3/checkedOut:

```
{
    "bookId": 2,
    "borrowerId": 1
}
```
Will return: 
```
{
    "message": "Book checked out!"
}
```

### BOOK Routes

#### GET All books

URL: /books

A successful GET will return an array of all the book objects currently in the databse. Example successful GET of /books will return:
```
[
    {
        "bookId": 1,
        "userId": 1,
        "title": "1984",
        "authors": "George Orwell",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 1840039288,
        "avgRating": 4.3,
        "description": "Great condition, missing the last page because I used it to wipe away my tears"
    },
    {
        "bookId": 2,
        "userId": 1,
        "title": "Siddhartha",
        "authors": "Hermann Hesse",
        "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
        "ISBN": 1837499200,
        "avgRating": 4.5,
        "description": "Used but good condition"
    }
]
```

#### GET Book by bookId

URL: /books/:bookId

A successful GET will return the requested book object. Here's an example GET of /books/1:

```
{
    "bookId": 1,
    "userId": 1,
    "title": "1984",
    "authors": "George Orwell",
    "image": "thisImageWillBeProvidedByGoodreadsAPI.com",
    "ISBN": 1840039288,
    "avgRating": 4.3,
    "description": "Great condition, missing the last page because I used it to wipe away my tears"
}
```

#### POST to Books

##### NOTE: This will probably never be used. A user will instead add a book to their inventory, which will automatically add a book to the book database. 










