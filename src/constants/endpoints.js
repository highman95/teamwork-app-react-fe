const url = 'https://teamwork-app-api-stage.herokuapp.com/api/v1';
// const url = 'http://localhost:3500/api/v1';

export default {
    signIn: `${url}/auth/signin`,
    signUp: `${url}/auth/create-user`,
    feeds: `${url}/feed`,
    articles: `${url}/articles`,
    gifs: `${url}/gifs`,
    roles: `${url}/roles`,
    departments: `${url}/departments`,
};
