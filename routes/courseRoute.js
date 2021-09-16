'use strict';

/* Dependencies */
const express = require('express');
const router = express.Router();

/* Module Dependencies */
const { Course, User } = require('../models')
const { asyncHandler } = require('../middleware/asyncHandler.js');
const { authenticateUser } = require('../middleware/auth-user');

/* A /api/courses GET route that will return all courses including the User associated with each course and a 200 HTTP status code. */
router.get('/courses', asyncHandler( async(req, res) => {
    const courses = await Course.findAll({
        include: [{
          model: User,
          as: 'User',
          attributes: {
            exclude: [
              'password',
              'createdAt',
              'updatedAt',
            ],
          },
        }],
        attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
            ],
        },
    });
    res.status(200).json(courses);
}));

/* A /api/courses/:id GET route that will return the corresponding course including the User associated with that course and a 200 HTTP status code. */
router.get('/courses/:id', asyncHandler( async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
          model: User,
          as: 'User',
          attributes: {
            exclude: [
              'password',
              'createdAt',
              'updatedAt',
            ],
          },
        }],
        attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
            ],
        },
    });
    res.status(200).json(course);
}));

/* A /api/courses POST route that will create a new course, set the Location header to the URI for the newly created course, and return a 201 HTTP status code and no content. */ 
router.post('/courses', authenticateUser, asyncHandler( async(req, res) => {
    try {
        const newCourse = req.body;
        const postCourse = await Course.create(newCourse);
        res.status(201).location(`/courses/${postCourse.id}`).end();
    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            const errors = error.errors.map(error => error.message);
            res.status(400).json({ errors });
        } else {
            throw error
        }
    }
}));

/* A /api/courses/:id PUT route that will update the corresponding course and return a 204 HTTP status code and no content. */
router.put('/courses/:id', authenticateUser, asyncHandler( async(req, res) => {
    try {
        const course = await Course.findByPk(req.params.id);
        if (course.userId === req.currentUser.id) {
            if (course) {
                await course.update(req.body);
                res.status(204).json({"message": "Course has been updated"}).end();
            } else {
                res.status(404).json({"message": "Course does not exist"}).end();
            }
        } else {
            res.status(403).json({"message": "Access Denied. User does not have access to complete action"}).end();
        }

    } catch (error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
            const errors = error.errors.map(error => error.message);
            res.status(400).json({ errors });
        } else {
            throw error
        }
    }
}));

/* A /api/courses/:id DELETE route that will delete the corresponding course and return a 204 HTTP status code and no content. */
router.delete('/courses/:id', authenticateUser, asyncHandler( async(req, res) => {
    const user = req.currentUser;
    const courseToDelete = await Course.findByPk(req.params.id);
    if (courseToDelete) {
        if (courseToDelete.userId !== user.id) {
            res.status(403).json({"message": "Access Denied. User does not have access to complete action"}).end();
        } else {
            await courseToDelete.destroy();
            res.status(204).json({"message": "Course has been deleted"}).end();
        }
    } else {
        res.status(404).json({"message": "Page not Found"}).end();
    }
}));

module.exports = router;