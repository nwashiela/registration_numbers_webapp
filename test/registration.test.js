const assert = require("assert");
const registration = require("../registration");
const pg = require("pg");

const Pool = pg.Pool;
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://codex:pg1212@localhost:5432/test.registration";
const pool = new Pool({
  connectionString,
});
describe("registration_numbers_webapp", function () {
  beforeEach(async function () {
    await pool.query("delete from registration_numbers");
  });
  let instReg = registration(pool);

  it("should insert into registration", async function () {
    await instReg.setRegNumbers("CA 12378");
    await instReg.setRegNumbers("CY 45685");
    await instReg.setRegNumbers("CJ 45925");
    await instReg.setRegNumbers("CY 75396");

    let regiNumbers = await instReg.listAll();

    assert.deepEqual(regiNumbers, [
      { regnumbers: "CA 12378" },
      { regnumbers: "CY 45685" },
      { regnumbers: "CJ 45925" },
      { regnumbers: "CY 75396" },
    ]);
  });

  it("should be able filter All towns", async function () {
    await instReg.setRegNumbers("CA 12378");
    await instReg.setRegNumbers("CY 45685");
    await instReg.setRegNumbers("CJ 67925");
    await instReg.setRegNumbers("CY 75396");
    await instReg.setRegNumbers("CA 67378");
    await instReg.setRegNumbers("CJ 45925");

    var filterAllTowns = await instReg.filter("all");

    assert.deepEqual(
      [
        { regnumbers: "CA 12378" },
        { regnumbers: "CY 45685" },
        { regnumbers: "CJ 67925" },
        { regnumbers: "CY 75396" },
        { regnumbers: "CA 67378" },
        { regnumbers: "CJ 45925" },
      ],
      filterAllTowns
    );
  });
  it("should be able to filterfor each  ", async function () {
    await instReg.setRegNumbers("CJ 23451");
    await instReg.setRegNumbers("CJ 87523");
    await instReg.setRegNumbers("CY 23451");
    await instReg.setRegNumbers("CY 87523");
    await instReg.setRegNumbers("CA 1230");
    await instReg.setRegNumbers("CA 5649");
    await instReg.setRegNumbers("CA 5469");

    var filterTowns = await instReg.filter(2);
//  console.log(filterTowns)
    assert.deepequal([
       { regnumbers: 'CA 1230' },
       { regnumbers: 'CA 5469' }, 
       { regnumbers: 'CA 5469' } 
      ], filterTowns);

  });

  it('should be able to delete all in regnumbers ', async function(){
    await instReg.setRegNumbers("CJ 23451");
    await instReg.setRegNumbers("CJ 87523");
    await instReg.setRegNumbers("CY 23451");
    await instReg.setRegNumbers("CY 87523");
    await instReg.setRegNumbers("CA 1230");
    await instReg.setRegNumbers("CA 5649");
    await instReg.setRegNumbers("CA 5469");
    await instReg.deleleBtn();

    let removed = await instReg.listAll()
    assert.deepEqual({},removed )

  })

	after(function() {
		pool.end();
	})
})