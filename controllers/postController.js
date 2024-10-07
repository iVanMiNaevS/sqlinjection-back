const db = require("../db");
class PostController {
	async createPost(req, res) {
		const { title, text, userId, privatePost } = req.body;
		try {
			const newPost = await db.query(
				"INSERT INTO post (title, content, user_id, protected) values ($1, $2, $3, $4) RETURNING *",
				[title, text, userId, privatePost]
			);
			res.status(200).json(newPost.rows[0]);
		} catch (error) {
			res.status(500).json(error);
		}
	}
	async deletePost(req, res) {
		const { id } = req.body;
		try {
			const deletePost = await db.query("DELETE from post where id = $1", [id]);
			res.status(200).json("delete");
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
	async getPostsByUser(req, res) {
		const { id } = req.query;
		try {
			const posts = await db.query(
				"select * from post where user_id = $1 and protected = false",
				[id]
			);
			res.status(200).json(posts.rows);
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
	async getUserPosts(req, res) {
		const { id } = req.query;
		try {
			const posts = await db.query("select * from post where user_id = $1", [
				id,
			]);
			res.status(200).json(posts.rows);
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
	async getPosts(req, res) {
		const status = req.query.protected;
		try {
			const posts = await db.query("select * from post where protected = $1", [
				status,
			]);
			res.status(200).json(posts.rows);
		} catch (err) {
			res.status(500).json("Error on server");
		}
	}
	async updatePost(req, res) {
		const { title, text, privatePost, userId } = req.body;
		const { id } = req.query;
		try {
			const user = await db.query(
				"UPDATE post set title = $1, content = $2, protected = $3 where id = $4 and user_id= $5 RETURNiNG *",
				[title, text, privatePost, id, userId]
			);
			res.status(200).json(user.rows);
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}
	async getOnePost(req, res) {
		const { id } = req.body;
		try {
			const posts = await db.query("select * from post where id = $1", [id]);
			res.status(200).json(posts.rows);
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	}
}

module.exports = new PostController();
