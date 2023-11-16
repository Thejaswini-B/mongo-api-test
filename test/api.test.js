const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const { dbConnection, app } = require("../index");

describe("API Tests", () => {
  before(function (done) {
    // db is taking long time to connect , so we are using timeout as will throw err if we not mention this time
    this.timeout(10000);

    dbConnection
      .then(() => {
        console.log("Db connection while testing");
        done();
      })
      .catch((error) => {
        console.error("Error connecting to the database:", error);
        done(error);
      });
  });

  after(async () => {
    try {
      console.log("DB Closed");
    } catch (error) {
      console.error("Error closing the database:", error);
    }
  });

  describe("GET / Getting all users array", () => {
    it("should get all users", function (done) {
      //   taking time to get from db
      this.timeout(3000); // Adjust the time based on the output getting

      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          if (err) {
            console.error("Error in the test:", err);
            return done(err);
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          //   console.log(res.body);
          done();
        });
    });
  });
});
