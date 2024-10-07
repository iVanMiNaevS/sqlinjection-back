const express = require("express");
const cors = require("cors");
const app = express();
const port = 3500;
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

app.use(cors());
app.use(express.json());

app.get("/post/get", postController.getPosts);
app.post("/post/getOne", postController.getOnePost);
app.put("/post/update", postController.updatePost);
app.post("/post/create", postController.createPost);
app.get("/post/getByUser", postController.getPostsByUser);
app.get("/post/getUserPosts", postController.getUserPosts);
app.delete("/post/delete", postController.deletePost);

app.post("/user/getOne", userController.getOneUserById);
app.post("/user/login", userController.login);
app.post("/user/sign-in", userController.createUser);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
