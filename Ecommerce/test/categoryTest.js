process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let serverLink = "http://localhost:8000/api";
describe("CATEGORY", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    let categoryId;
    describe("ALL category API method", () => {
        it("it should GET all the category", (done) => {
            chai.request(serverLink)
                .get("/categories")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(6);
                    done();
                });
        });
        it("you are not authorize to create category", (done) => {
            chai.request(serverLink)
                .post("/signin")
                .send({
                    email: "hung.user@gmail.com",
                    password: "123456",
                })
                .end((err, res) => {
                    res.body.should.have.property("token");
                    let token = res.body.token;
                    chai.request(serverLink)
                        .post("/category/create/62f0b2157455dfaf05cc17b4")
                        .set("Authorization", `Bearer ${token}`)
                        .send({
                            name: "test",
                        })
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.error.should.have.eql("Access denied");
                            done();
                        });
                });
        });
        it("create category", (done) => {
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
                        .post("/category/create/62f0b2157455dfaf05cc17b4")
                        .set("Authorization", `Bearer ${token}`)
                        .send({
                            name: "test",
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.data.should.have.property("name");

                            categoryId = res.body.data._id;
                            done();
                        });
                });
        });
        it("update category", (done) => {
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
                        .put(`/category/${categoryId}/62f0b2157455dfaf05cc17b4`)
                        .send({ name: "test1" })
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done();
                        });
                });
        });
        it("delete category", (done) => {
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
                        .delete(
                            `/category/${categoryId}/62f0b2157455dfaf05cc17b4`
                        )
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.message.should.be.eql("Category deleted");
                            done();
                        });
                });
        });
    });
});
