import {authHeader} from '../_helpers/auth-header';


export function login(username, password){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({username, password})
    };

    return fetch(`http://127.0.0.1:8000/api/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
        //if user is found
        if (user){
            //store user details in local storage to keep user logged in
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    })
}

export function logout(){
    localStorage.removeItem('user');
}


function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok){
            if  (response.status == 401){
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

//const user = await fetch('/api/register?format=json', 
//{ method: 'POST', body: JSON.stringify
//({ password: 'hei', username: 'klomp' }), 
//headers: { 'Content-Type': 'application/json' } });