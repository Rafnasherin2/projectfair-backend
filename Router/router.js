const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')
const projectController = require('../Controller/projectController')
const jwtMiddileware = require("../Middileware/jwtMiddileWare")
const multerConfig = require("../Middileware/multerMiddileware")
//Register

router.post('/register',userController.register)

//login
router.post('/login',userController.login)

// addProject
// router specific middileware
router.post('/addProject',jwtMiddileware,multerConfig.single('projectImage'),projectController.addProjects)


// homeProject
router.get('/homeproject',projectController.getHomeProjects)

// userProject
router.get('/userproject',jwtMiddileware,projectController.getUserProjects)

// allProject
router.get('/allproject',jwtMiddileware,projectController.getAllProjects)

// editproject
// router specific middileware
router.put ('/projects/edit/:pid',jwtMiddileware,multerConfig.single('projectImage'),
projectController.editUserProject)

// deleteproject

router.delete('/projects/remove/:pid',jwtMiddileware,projectController.deleteProject)

module.exports = router