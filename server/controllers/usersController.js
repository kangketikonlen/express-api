'use strict';

const
	bcrypt = require('bcrypt'),
	salt = bcrypt.genSaltSync(10),
	services = require('../services/usersService');

exports.getAll = async (req, res, next) => {
	try {
		let results = await services.all();
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.getOne = async (req, res, next) => {
	try {
		let results = await services.one(req.params.id);
		if (results.length > 0) {
			res.json({ data: results, sessions: req.decode });
		} else {
			res.status(404).json({ status: "Not Found!", pesan: "Data tidak ditemukan!" })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.create = async (req, res, next) => {
	try {
		if (req.body.users_pass != "") {
			body: Object.assign(req.body, {
				users_pass: bcrypt.hashSync(req.body.users_pass, salt)
			})
		}
		let user_exists = await services.findByName(req.body.users_login);
		if (user_exists.length > 0) {
			res.status(500).json({ status: "error", pesan: "Username sudah terpakai!" })
		} else {
			let results = await services.save(req.body);
			res.json({ data: results, sessions: req.decode });
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.update = async (req, res, next) => {
	try {
		if (req.body.users_pass != "") {
			body: Object.assign(req.body, {
				users_pass: bcrypt.hashSync(req.body.users_pass, salt)
			})
		}
		let user_exists = await services.findByName(req.body.users_login);
		if (user_exists.length > 0) {
			res.status(500).json({ status: "error", pesan: "Username sudah terpakai!" })
		} else {
			let findByID = await services.one(req.params.id);
			if (findByID.length > 0) {
				let results = await services.update(req.params.id, req.body);
				res.json({ data: results, sessions: req.decode });
			} else {
				res.status(404).json({ status: "Not Found!", pesan: "Data tidak ditemukan!" })
			}
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.softDel = async (req, res, next) => {
	try {
		let results = await services.softDel(req.params.id);
		res.json({ data: results, sessions: req.decode });
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}

exports.hardDel = async (req, res, next) => {
	try {
		let findByID = await services.one(req.params.id);
		if (findByID.length > 0) {
			let results = await services.hardDel(req.params.id);
			res.json({ data: results, sessions: req.decode });
		} else {
			res.status(404).json({ status: "Not Found!", pesan: "Data tidak ditemukan!" })
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ status: "error", pesan: "Terjadi kesalahan pada server!" });
	}
}