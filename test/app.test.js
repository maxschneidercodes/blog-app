const post = require("../models/posts");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Posts", () => {
  describe("/GET posts", () => {
    it("it should GET all the posts", (done) => {
      chai
        .request(app)
        .get("/posts")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
