const express = require("express");
const cors = require("cors");
const app = express();
const port = 3500;
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

app.use(cors());
app.use(express.json());

app.get("/posts/get", postController.getPublicPosts);
app.post("/user/login", userController.login);
app.post("/user/sign-in", userController.createUser);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
