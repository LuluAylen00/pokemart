async function blitzcrank(type, param = "") {
    try {
        let request = await fetch(`http://localhost:3151/api/${type}/${param}`)
        let response = await request.json();
        return response
    } catch (error) {
        console.log(error);
    }

}

export default blitzcrank