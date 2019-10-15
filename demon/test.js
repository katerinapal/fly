/**
 * Created by du on 16/12/10.
 */
//var fly = require("../index")

var qs = require('qs');
import fly from "../index"
(async () => {
    try {
        const d = await fly.get("../package.json", {aa: 8, bb: 9, tt: {xx: 5}});

        return await (async d => {
            console.log("get result:", d)
        })(d);
    } catch (e) {
        return await console.log("error", e);
    }
})()

(async () => {
    try {
        const d = await fly.post("../package.json", {aa: 8, bb: 9, tt: {xx: 5}});

        return await (async d => {
            console.log("post result:", d)
        })(d);
    } catch (e) {
        return await console.log("error", e);
    }
})()

(async () => {
    const d = await fly.request("../package.json", {hh: 5}, {
        method: "post"
    });

    return await (async d => {
        console.log("ajax result:", d)
    })(d);
})()


//send data in the application/x-www-form-urlencoded format
(async () => {
    const d = await fly.get("",qs.stringify({aa: 8, bb: 9, tt: {xx: 5}}));

    return await (async d => {

    })(d);
})()
(async () => {
    const d = await fly.post("../package.json", qs.stringify({aa: 8, bb: 9, tt: {xx: 5}}));

    return await (async d => {

    })(d);
})()
