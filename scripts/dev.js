module.exports = () => {
    var bs = require("browser-sync").create();

    bs.watch("*.html").on("change", bs.reload);

    // Start the server
    bs.init({
        server: process.cwd() + "/src"
    });

};