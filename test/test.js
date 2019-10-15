function expect(left, right) {
    if (left !== right) {
        console.log("Expect: " + left + " but: " + right);
        throw new Error();
    }
}

var csrfToken = "";
fly.config.headers = {"x-tag": "flyio"}
fly.config.baseURL = "http://www.dtworkroom.com/doris/1/2.0.0/"
var newFly = new Fly;
newFly.config = fly.config;
var log = console.log
fly.interceptors.request.use(async function(request) {
    log("request：path:" + request.url + "，baseURL:" + request.baseURL)
    if (!csrfToken) {
        log("No token，request token firstly...");
        // locking the current instance, let the incomming request task enter a
        // queue before they enter the request interceptors.
        fly.lock();

        try {
            const d = await newFly.get("/token");

            return await (async d => {
                request.headers["csrfToken"] = csrfToken = d.data.data.token;
                log("token请求成功，值为: " + d.data.data.token);
                log("发起请求：path:" + request.url + "，baseURL:" + request.baseURL)
                return request
            })(d);
        } finally {
            await (async () => {
                //fly.clear(); //clear the request queue
                // unlock the current instance, flush the request queue.
                fly.unlock();
            })();
        }
    } else {
        request.headers["csrfToken"] = csrfToken;
    }
})

describe("request", function () {
    it("request", function (done) {
        this.timeout(15000);
        var data = {
            "a": "你好",
            "b": [5, "6"],
            "c": {"d": 8, "e": {"a": 5, "b": [66, 8]}}
        };

        var promises = [
            (async () => {
                try {
                    const d = await fly.get("/test?tag=1");

                    return await (async d => {
                            log("success")
                        })(d);
                } catch (e) {
                    return await (async e => {
                        log("fail")
                    })(e);
                }
            })(),
            (async () => {
                try {
                    const d = await fly.get("/test?tag=2");

                    return await (async d => {
                            log("success")
                        })(d);
                } catch (e) {
                    return await (async e => {
                        log("fail")
                    })(e);
                }
            })(),
            (async () => {
                try {
                    const d = await fly.get("/test?tag=3");

                    return await (async d => {
                            log("success")
                        })(d);
                } catch (e) {
                    return await (async e => {
                        log("fail")
                    })(e);
                }
            })(),
            (async () => {
                let generatedVariable19;

                try {
                    generatedVariable19 = await fly.get("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}}, {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    });

                    return await (async () => {
                            log("success")
                        })();
                } catch (catchVar) {
                    return await (async () => {
                        log("fail")
                    })();
                }
            })(),
            (async () => {
                let generatedVariable20;

                try {
                    generatedVariable20 = await fly.post("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}}, {
                        headers: {
                            "content-type": "application/x-www-form-urlencoded"
                        }
                    });

                    return await (async () => {
                            log("success")
                        })();
                } catch (catchVar) {
                    return await (async () => {
                        log("fail")
                    })();
                }
            })(),

            (async () => {
                let generatedVariable21;

                try {
                    generatedVariable21 = await fly.post("/test?fm=true", {aa: 8, bb: 9, tt: {xx: 5}});

                    return await (async () => {
                            log("success")
                        })();
                } catch (catchVar) {
                    return await (async () => {
                        log("fail")
                    })();
                }
            })(),

            (async () => {
                try {
                    return await fly.get("http://xxx.bxxcom");
                } catch (e) {
                    return await (async e => {
                        log(e.message);
                    })(e);
                }
            })()
        ];

        (async () => {
            fly.spread(function () {
                done()
            });

            return await fly.all(promises);
        })()
    })
});