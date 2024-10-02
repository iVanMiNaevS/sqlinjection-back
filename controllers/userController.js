const db = require("../db");

class UserController {
	async createUser(req, res) {
		const { name, surname } = req.body;
		try {
			const user = await db.query(
				"SELECt * from person where name = $1 and surname = $2",
				[name, surname]
			);
			if (user.rows.length !== 0) {
				return res
					.status(400)
					.json({ error: "Такой пользователь уже зарегестрирован" });
			}
			const newPerson = await db.query(
				"INSERT INTO person (name, surname) values ($1, $2) RETURNING *",
				[name, surname]
			);
			res.status(200).json(newPerson.rows[0]);
		} catch (err) {
			res.status(500).josn("Error on server");
		}
	}
	async login(req, res) {
		const { name, surname } = req.body;
		try {
			const user = await db.query(
				"SELECt * from person where name = $1 and surname = $2",
				[name, surname]
			);
			if (user.rows.length === 0) {
				return res
					.status(400)
					.json({ error: "Такой пользователь не зарегестрирован" });
			}
			res.status(200).json(user.rows[0]);
		} catch (error) {
			res.status(500).josn("Error on server");
		}
	}
	async getUsers(req, res) {
		const users = await db.query("SELECT * FROM person");
		res.json(users.rows);
	}
	async getOneUser(req, res) {
		const id = req.params.id;
		const users = await db.query("SELECT * FROM person where id = $1", [id]);
		res.json(users.rows[0]);
	}
	async updateUser(req, res) {
		const { id, name, surname } = req.body;
		const user = await db.query(
			"UPDATE person set name = $1, surname = $2 where id = $3 RETURNiNG *",
			[name, surname, id]
		);

		res.json(user.rows[0]);
	}
	async deleteUser(req, res) {
		const id = req.params.id;
		const users = await db.query("DELETE FROM person where id = $1", [id]);
		res.json(users.rows[0]);
	}
}

module.exports = new UserController();
