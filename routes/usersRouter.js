import { Router } from 'express';
import users from '../data/users.js';

const usersRouter = Router()

usersRouter.get('/users', (req, res) => {
    res.json(users)
})

usersRouter.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
})

usersRouter.post('/users', (req, res) => {
    console.log(req.body)
    const { firstName, lastName, telephone, address, hobbies } = req.body
    if(!firstName || !lastName) {
        res.status(400).json({message : 'All fields are required'})
    }
    const newUser = {
        id: users.length + 1,
        firstName, lastName,
        telephone,
        address,
        hobbies
    }
    users.push(newUser)
    return res.status(201).json({message : 'User created'}, newUser)
})

usersRouter.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: "User not found" })

    const { firstName, lastName, telephone, address, hobbies } = req.body
    user.firstName = firstName || user.firstName
    user.lastName = lastName || user.lastName
    user.telephone = telephone || user.telephone
    user.address = address || user.address
    user.hobbies = hobbies || user.hobbies

    res.json(user);
});

usersRouter.delete('/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ message: "User not found" })

    users.splice(index, 1)
    res.status(202).json({ message: "User deleted" })
});

export default usersRouter