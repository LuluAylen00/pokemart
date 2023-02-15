let route = "http://localhost:3151/api"

function requester(ruta, param = "") {
    return `${route}/${ruta}/${param}`;
}

module.exports = requester;