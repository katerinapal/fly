function expect(left, right) {
    if (left !== right) {
        console.log("Expect: " + left + " but: " + right);
        throw new Error();
    }
}

var csrfToken = "";
fly.config.headers = { "x-tag": "flyio" };
fly.config.baseURL = "http://www.dtworkroom.com/doris/1/2.0.0/";
var newFly = new Fly();
newFly.config = fly.config;
var log = console.log;
fly.interceptors.request.use(function (request) {
    return Promise.resolve().then(function () {
        log("request：path:" + request.url + "，baseURL:" + request.baseURL);
        if (!csrfToken) {
            log("No token，request token firstly...");
            // locking the current instance, let the incomming request task enter a
            // queue before they enter the request interceptors.
            fly.lock();

            return Promise.resolve().then(function () {
                return newFly.get("/token");
            }).then(function (_resp) {
                const d = _resp;

                return (d => {
                    request.headers["csrfToken"] = csrfToken = d.data.data.token;
                    log("token请求成功，值为: " + d.data.data.token);
                    log("发起请求：path:" + request.url + "，baseURL:" + request.baseURL);
                    return request;
                })(d);
            }).then(function () {
                return (() => {
                    //fly.clear(); //clear the request queue
                    // unlock the current instance, flush the request queue.
                    fly.unlock();
                })();
            }, function (_err) {
                return Promise.resolve().then(function () {
                    return (() => {
                        fly.unlock();
                    })();
                }).then(function () {
                    throw _err;
                });
            });
        } else {
            request.headers["csrfToken"] = csrfToken;
        }
    }).then(function () {});
});

describe("request", function () {
    it("request", function (done) {
        this.timeout(15000);
        var data = {
            "a": "你好",
            "b": [5, "6"],
            "c": { "d": 8, "e": { "a": 5, "b": [66, 8] } }
        };

        var promises = [(() => {
            return Promise.resolve().then(function () {
                return Promise.resolve().then(function () {
                    return fly.get("/test?tag=1");
                }).then(function (_resp) {
                    const d = _resp;

                    return (d => {
                        log("success");
                    })(d);
                }).catch(function (e) {
                    return (e => {
                        log("fail");
                    })(e);
                });
            }).then(function () {});
        })(), (() => {
            return Promise.resolve().then(function () {
                return Promise.resolve().then(function () {
                    return fly.get("/test?tag=2");
                }).then(function (_resp) {
                    const d = _resp;

                    return (d => {
                        log("success");
                    })(d);
                }).catch(function (e) {
                    return (e => {
                        log("fail");
                    })(e);
                });
            }).then(function () {});
        })(), (() => {
            return Promise.resolve().then(function () {
                return Promise.resolve().then(function () {
                    return fly.get("/test?tag=3");
                }).then(function (_resp) {
                    const d = _resp;

                    return (d => {
                        log("success");
                    })(d);
                }).catch(function (e) {
                    return (e => {
                        log("fail");
                    })(e);
                });
            }).then(function () {});
        })(), (() => {
            return Promise.resolve().then(function () {
                let generatedVariable19;

                return Promise.resolve().then(function () {
                    return fly.get("/test?fm=true", { aa: 8, bb: 9, tt: { xx: 5 } }, {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    });
                }).then(function (_resp) {
                    generatedVariable19 = _resp;

                    return (() => {
                        log("success");
                    })();
                }).catch(function (catchVar) {
                    return (() => {
                        log("fail");
                    })();
                });
            }).then(function () {});
        })(), (() => {
            return Promise.resolve().then(function () {
                let generatedVariable20;

                return Promise.resolve().then(function () {
                    return fly.post("/test?fm=true", { aa: 8, bb: 9, tt: { xx: 5 } }, {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    });
                }).then(function (_resp) {
                    generatedVariable20 = _resp;

                    return (() => {
                        log("success");
                    })();
                }).catch(function (catchVar) {
                    return (() => {
                        log("fail");
                    })();
                });
            }).then(function () {});
        })(), (() => {
            return Promise.resolve().then(function () {
                let generatedVariable21;

                return Promise.resolve().then(function () {
                    return fly.post("/test?fm=true", { aa: 8, bb: 9, tt: { xx: 5 } });
                }).then(function (_resp) {
                    generatedVariable21 = _resp;

                    return (() => {
                        log("success");
                    })();
                }).catch(function (catchVar) {
                    return (() => {
                        log("fail");
                    })();
                });
            }).then(function () {});
        })(), (() => {
            try {
                return fly.get("http://xxx.bxxcom");
            } catch (e) {
                return (e => {
                    log(e.message);
                })(e);
            }
        })()];

        (() => {
            fly.spread(function () {
                done();
            });

            return fly.all(promises);
        })();
    });
});