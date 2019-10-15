/**
 * Created by du on 16/12/10.
 */
//var fly = require("../index")

var qs = require('qs');
import fly from "../index";
(() => {
    return Promise.resolve().then(function () {
        return Promise.resolve().then(function () {
            return fly.get("../package.json", { aa: 8, bb: 9, tt: { xx: 5 } });
        }).then(function (_resp) {
            const d = _resp;

            return (d => {
                console.log("get result:", d);
            })(d);
        }).catch(function (e) {
            return console.log("error", e);
        });
    }).then(function () {});
})()(() => {
    return Promise.resolve().then(function () {
        return Promise.resolve().then(function () {
            return fly.post("../package.json", { aa: 8, bb: 9, tt: { xx: 5 } });
        }).then(function (_resp) {
            const d = _resp;

            return (d => {
                console.log("post result:", d);
            })(d);
        }).catch(function (e) {
            return console.log("error", e);
        });
    }).then(function () {});
})()(() => {
    return Promise.resolve().then(function () {
        return fly.request("../package.json", { hh: 5 }, {
            method: "post"
        });
    }).then(function (_resp) {
        const d = _resp;

        return (d => {
            console.log("ajax result:", d);
        })(d);
    });
})()

//send data in the application/x-www-form-urlencoded format
(() => {
    return Promise.resolve().then(function () {
        return fly.get("", qs.stringify({ aa: 8, bb: 9, tt: { xx: 5 } }));
    }).then(function (_resp) {
        const d = _resp;

        return (d => {
            return Promise.resolve();
        })(d);
    });
})()(() => {
    return Promise.resolve().then(function () {
        return fly.post("../package.json", qs.stringify({ aa: 8, bb: 9, tt: { xx: 5 } }));
    }).then(function (_resp) {
        const d = _resp;

        return (d => {
            return Promise.resolve();
        })(d);
    });
})();