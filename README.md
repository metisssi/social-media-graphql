# 📱 Social Media App

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Apollo Client (GraphQL)
- Semantic UI React
- React Router
- Moment.js

**Backend:**
- Node.js + Apollo Server
- GraphQL
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js

---

## 📸 Screenshots

### 1️⃣ Register New Account
![Register](https://github.com/user-attachments/assets/430126c6-b02c-4f4c-99de-1825e1342015)

Create a new account with username, email, password, and password confirmation.

---

### 2️⃣ Login to Account
![Login](https://github.com/user-attachments/assets/83d9ef06-2583-4b3f-8de2-1db475c4deeb)

Sign in with your username and password.

---

### 3️⃣ View All Posts
![Home Page](https://github.com/user-attachments/assets/1be64dff-e5c6-49d2-9023-098533085cc4)

See all recent posts from users on the home page. Logged-in users can create new posts.

---

### 4️⃣ Create a Post
![Create Post Form](https://github.com/user-attachments/assets/51e84bab-fd95-4583-9502-3556d45b5736)
![Post Validation](https://github.com/user-attachments/assets/b09ab94b-c993-4a5c-9c41-58b69a15758f)
![New Post Created](https://github.com/user-attachments/assets/ac2ebb55-ffbf-4832-8b55-065e487aa762)

Logged-in users can write and share new posts with the community.

---

### 5️⃣ Like Posts
![Like Button](https://github.com/user-attachments/assets/383a8705-66ed-4144-a359-39e5cece5c3a)
![Liked Post](https://github.com/user-attachments/assets/cf6f6ed0-811a-46b6-86f3-c52e7c72aea7)

Click the heart icon to like posts. Click again to unlike. See the total like count on each post.

---

### 6️⃣ View Single Post
![Single Post View](https://github.com/user-attachments/assets/b4f2150b-d67f-4b26-8777-d24f78b4f77a)

Click on any post to view it in detail with all comments.

---

### 7️⃣ Add Comments
![Add Comment](https://github.com/user-attachments/assets/62a2aa4e-fec9-4c06-b108-7c87a4f52e08)

Post comments on any post to join the conversation.

---

### 8️⃣ Delete Your Content
![Delete Button](https://github.com/user-attachments/assets/47d63573-fba5-47fc-b7e3-540f22d75a86)
![Delete Confirmation](https://github.com/user-attachments/assets/5d74ba4a-b374-4d56-ac37-0cc4b485a806)

Delete your own posts and comments with a confirmation popup.

---

## ✨ Main Features

- 🔐 **Register & Login** - Secure JWT authentication
- 📝 **Create Posts** - Share your thoughts with text posts
- ❤️ **Like Posts** - Like and unlike posts
- 💬 **Comments** - Comment on posts
- 🗑️ **Delete** - Remove your own posts and comments
- ⏰ **Timestamps** - See how long ago posts were created
- 🔔 **Real-time Updates** - GraphQL subscriptions for new posts

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/social-media-app.git
cd social-media-app
```

### 2. Setup Backend
```bash
npm install
```

Create `.env` file in root folder:
```env
MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_jwt_secret_key
```

Start backend:
```bash
npm start
```

Backend runs on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd client
npm install
```

Create `.env` file in client folder:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start frontend:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

---

## 🔑 Environment Variables

**Backend (.env):**
- `MONGODB_URI` - MongoDB connection string
- `SECRET_KEY` - Secret for JWT tokens

**Frontend (.env):**
- `REACT_APP_API_URL` - Backend GraphQL endpoint

---

## 🔌 GraphQL API

### Queries
```graphql
# Get all posts
getPosts: [Post]

# Get single post
getPost(postId: ID!): Post
```

### Mutations
```graphql
# User authentication
register(registerInput: RegisterInput): User!
login(username: String!, password: String!): User!

# Post operations
createPost(body: String!): Post!
deletePost(postId: ID!): String!

# Comment operations
createComment(postId: ID!, body: String!): Post!
deleteComment(postId: ID!, commentId: ID!): Post!

# Like operation
likePost(postId: ID!): Post!
```

### Subscriptions
```graphql
# Real-time new posts
newPost: Post!
```

---

## 📁 Project Structure

```
social-media-app/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── MenuBar.js
│   │   │   ├── PostCard.js
│   │   │   ├── PostForm.js
│   │   │   ├── LikeButton.js
│   │   │   └── DeleteButton.js
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── SinglePost.js
│   │   ├── context/         # Context API
│   │   │   └── auth.js
│   │   ├── util/            # Utility functions
│   │   │   ├── AuthRoute.js
│   │   │   ├── hooks.js
│   │   │   └── grapql.js
│   │   ├── App.js
│   │   └── ApolloProvider.js
│   └── package.json
├── grapql/                  # GraphQL backend
│   ├── resolvers/
│   │   ├── index.js
│   │   ├── posts.js
│   │   ├── users.js
│   │   └── comments.js
│   └── typeDefs.js
├── models/                  # MongoDB models
│   ├── User.js
│   └── Post.js
├── util/                    # Utilities
│   ├── check-auth.js
│   └── validators.js
├── index.js                 # Server entry
└── package.json
```

---

## 🎯 How It Works

### Authentication Flow
1. User registers with username, email, and password
2. Password is hashed with bcrypt
3. JWT token is generated and sent to client
4. Client stores token in localStorage
5. Token is sent in Authorization header for protected requests

### Post Flow
1. User creates a post with text content
2. Post is saved to MongoDB with username and timestamp
3. Post appears in the feed immediately
4. Other users can like and comment on the post

### Like System
1. User clicks heart icon on a post
2. If not liked: adds user to likes array
3. If already liked: removes user from likes array
4. Like count updates automatically

### Comment System
1. User types comment in single post view
2. Comment is added to post's comments array
3. Comment shows with username and timestamp
4. User can delete their own comments

---

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **Authorization Checks** - Users can only delete own content
- **Input Validation** - Email and password validation
- **Error Handling** - Proper error messages

---

## 🚀 Available Scripts

### Backend
```bash
npm start        # Start with nodemon (dev)
npm run serve    # Start with node (production)
```

### Frontend
```bash
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Your Name**
- A.Simchera

---

**Made with ❤️ for social media enthusiasts**

---

**Made with ❤️ for language learners worldwide**
