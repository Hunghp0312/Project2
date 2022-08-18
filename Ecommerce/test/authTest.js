process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let serverLink = "http://localhost:8000/api";
describe("AUTH", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    let categoryId;
    describe("ALL AUTH METHOD", () => {
        it("signup", (done) => {
            chai.request(serverLink)
                .post("/signup")
                .send({
                    name: "hung.test",
                    email: "hung.test@gmail.com",
                    password: "123456",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.user.should.have.property("name");
                    done();
                });
        });
        it("signin", (done) => {
            chai.request(serverLink)
                .post("/signin")
                .send({
                    email: "hung.test@gmail.com",
                    password: "123456",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property("token");
                    res.body.should.have.property("user");
                    done();
                });
        });
        it("signin", (done) => {
            chai.request(serverLink)
                .get("/signout")

                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.have.eql("Signout success");
                    done();
                });
        });
    });
});
