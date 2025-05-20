const bcrypt = require("bcrypt");
const User = require("../models/User");
const {generate} = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
    if (!password) {
        throw new Error("Password is empty");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            login,
            password: passwordHash,
            role: ROLES.READER
        });
        const token = generate({id: user.id});

        return {user, token};
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("User already exists");
        }
    }
}

async function login(login, password) {
    const user = await User.findOne({login});
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid password");
    }

    const token = generate({id: user.id});
    console.log("User до возврата из login:", user);

    return {token, user};
}

function getUsers(id) {
    return User.find({id});
}

function getRoles() {
    return [
        {id: ROLES.ADMIN, name: "Admin"},
        {id: ROLES.MODERATOR, name: "Moderator"},
        {id: ROLES.READER, name: "Reader"},
        {id: ROLES.GUEST, name: "Guest"},
    ];
}

function deleteUser(id) {
    return User.deleteOne({_id: id});
}

function updateUser(id, userData) {
    return User.findByIdAndUpdate(id, userData, {returnDocument: "after"});
}

module.exports = {
    register,
    login,
    getUsers,
    getRoles,
    deleteUser,
    updateUser,
};