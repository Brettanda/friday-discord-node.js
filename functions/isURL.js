module.exports = content => {
    const pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; // fragment locator
    
    if (pattern.test(content)) {
        console.log("url");
        return true;
    }
    return false;
}