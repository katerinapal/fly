let Fly = require("../../dist/npm/fly");
let EngineWrapper = require("../../dist/npm/engine-wrapper");
let adapter = require("../adapter/node");
let utils = require("../utils/utils");
let nodeEngine = EngineWrapper(adapter);
let fs = require("fs");
let path = require("path");
let request = require("request");
let rq = request.defaults({ jar: true });
Object.assign(Fly.prototype, {

    // Http plugin
    "$http": rq,

    // File download API
    download(url, savePath, params = null, options) {
        var _this = this;

        return Promise.resolve().then(function () {
            return Promise.resolve().then(function () {
                return _this.request(url, params, utils.merge({ responseType: "stream" }, options));
            }).then(function (_resp) {
                const d = _resp;

                return (d => {
                    return new Promise((resolve, reject) => {
                        fs.writeFile(savePath, d.data, err => {
                            if (!err) {
                                resolve({ size: d.data.length, path: path.resolve(savePath) });
                            } else {
                                // Failed to save file
                                err.status = 2;
                                reject(err);
                            }
                        });
                    });
                })(d);
            }).catch(function (e) {
                return (e => {
                    return Promise.reject(e);
                })(e);
            });
        }).then(function () {});
    },

    // File upload API
    upload(url, formData, options) {
        return this.post(url, null, utils.merge({ formData }, options));
    }
});

module.exports = function (engine) {
    return new Fly(engine || nodeEngine);
};