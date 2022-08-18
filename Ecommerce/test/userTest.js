process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let serverLink = "http://localhost:8000/api";
describe("USER", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("ALL USER METHOD", () => {
        it("read profile", (done) => {
            chai.request(serverLink)
                .post("/signin")
                .send({
                    email: "hung.admin@gmail.com",
                    password: "123456",
                })
                .end((err, res) => {
                    res.body.should.have.property("token");
                    let token = res.body.token;
                    chai.request(serverLink)
                        .get("/user/62f0b2157455dfaf05cc17b4")
                        .set("Authorization", `Bearer ${token}`)

                        .end((err, res) => {
                            res.should.have.status(200);

                            done();
                        });
                });
        });
    });
});
