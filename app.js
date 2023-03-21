const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

let usersInfo = [];

app.post('/api/signup', (request, response) => {
    let userInfo = request.body;
    const { username, password, epost } = userInfo;

    if(username && password && epost) {
        let usernameExists = false;
        let emailExists = false;

        usersInfo.forEach((user) => {
            if(user.username === username && user.epost === epost) {
                usernameExists = true;
                emailExists = true;
            } else if(user.username === username) {
                usernameExists = true;
            } else if(user.epost === epost) {
                emailExists = true;
            }
        })

           if(usernameExists && emailExists) {
                const result = {
                    'sucess': false,
                    'usernameExists': true,
                    'emailExists': true
                }
                response.json(result);
           } else if(usernameExists) {
                const result = {
                    'sucess': false,
                    'usernameExists': true,
                    'emailExists': false
                }
                response.json(result);
           } else if(emailExists) {
                const result = {
                    'sucess': false,
                    'usernameExists': false,
                    'emailExists': true
                }
                response.json(result);
           } else {
                const result = {
                    'sucess': true,
                    'usernameExists': false,
                    'emailExists': false,
                    'newData': usersInfo
                }
                usersInfo.push(userInfo);
                response.json(result);
                console.log(usersInfo)
           }
    } else {
        response.status(400).json({
            sucess: false,
            error: "very bad request :(, please provide us with all the reuested details!"
        })
    }
})



app.post('/api/login', (request, response) => {
    let userInfo = request.body;
    const { username, password, epost } = userInfo;

    usersInfo.forEach((user) => {
        if(user.username === username && user.password === password && user.epost === epost) {
            return response.json({
                sucess: true,
                message: "WELCOME!!"
            })
        } else {
            return response.json({
                sucess:false,
                message:"Username, password or email does not match our database!"
            })
        }
    })
})

app.listen(PORT, () => {
    console.log('Listning on port 8000')
})