const taskName = process.argv[2];

import(`./src/${taskName}/index.ts`)
    .then((module) => {
        module();
    })
    .catch((error) => {
        console.error(error.code);
        console.log('try "npm start <task-name>')
    });
