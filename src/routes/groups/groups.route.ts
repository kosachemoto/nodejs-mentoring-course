import express from 'express';

const groupsRoute = express.Router();

groupsRoute.route('/')
    .post((res, req) => {
        req.send({ message: "test" });
    });

export { groupsRoute };