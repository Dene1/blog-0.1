const express = require("express");
const {getUsers, getRoles, updateUser, deleteUser} = require("../controllers/user");
const hasRole = require("../middleware/hasRole")
const authenticated = require("../middleware/authenticated")
const mapUser = require("../helpers/mapUser")
const ROLES = require("../constants/roles")

const router = express.Router();

router.get("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const users = await getUsers();

    res.send({data: users});
});

router.get("/roles", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const roles = await getRoles();

    res.send({data: roles});
});

router.patch("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {role: req.body.roleId});

    res.send({data: mapUser(newUser)});
});

router.delete("/:id", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);

    res.send({error: null});
});

module.exports = router;