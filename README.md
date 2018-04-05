## Bucketli.st

This is the Git repository for the Bucketli.st API. We used Express, MongoDB and Mongoose to create bucket list items and store the information about what the user would like to do before their life is... over. After a user signs up for an account, they will be able to sign in and create, read, update and delete their bucket list items.

### ERD

[ERD](https://i.imgur.com/20nhnoH.jpg)

### Technologies Used
- JavaScript
- Express
- MongoDB
- Mongoose

### API End Points
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/todos`               | `todos#index`     |
| POST   | `/todos`               | `todos#create`    |
| GET    | `/todos/:id`           | `todos#show`      |
| PATCH  | `/todos/:id`           | `todos#update`    |
| GET    | `/todos/:id/watch`     | `todos#watch`     |

All data returned from API actions is formatted as JSON.

### Planning Process & Problem-solving Strategy

- As an odd numbered team, we had to work together on all features at together.
- We broke down each problem to smaller issues and tackled them piece by piece.

### Unsolved Issues for Future Iterations
- Add another relationship completed goals

## Links
- Bucketli.st Client repository: https://github.com/ohayodevs/bucket-list-client
- Bucketli.st API deployed website: https://ohayo-bucketlist.herokuapp.com/
- Bucketli.st Client website: https://ohayodevs.github.io/bucket-list-client/
