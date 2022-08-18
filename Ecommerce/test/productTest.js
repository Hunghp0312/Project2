process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);
let serverLink = "http://localhost:8000/api";
describe("PRODUCT", () => {
    beforeEach((done) => {
        done();
    });
    /*
     * Test the /GET route
     */
    describe("ALL PRODUCT method", () => {
        it("it should GET all the product", (done) => {
            chai.request(serverLink)
                .get("/products")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(6);
                    done();
                });
        });

        it("it should GET all the product's categories", (done) => {
            chai.request(serverLink)
                .get("/products/categories")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a("array");
                    res.body.length.should.be.eql(5);
                    done();
                });
        });
    });
});
