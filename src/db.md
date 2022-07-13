#Post

- id
- title
- slug
- image
- CreateAt
- status (1 Approved) (2 pending) (3 Reject)
- hot(true or false)
- content
- userId
- categoryId

#Category

- id
- title
- slug
- status: (1 Approved) (2 pending)

#User

- id
- displayName
- email
- password
- avatar
- status (1 Active) (2 pending) (3 ban)
- role: (1 Admin) (2 Mod) (3 User)
- permission:"ADD_POST"
