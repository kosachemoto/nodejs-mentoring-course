const taskName = process.argv[2];

import(`./src/${taskName}`)
    .then((module) => {
        module.default();
    })
    .catch((error) => {
        console.error(error.code);
        console.log('try "npm start <task-name>')
    });
