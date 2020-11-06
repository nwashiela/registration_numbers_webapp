const assert = require("assert");
const Greetings = require('../index');
const pg = require("pg");
	const Pool = pg.Pool;
	const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg1212@localhost:5432/test.registration';
	const pool = new Pool({
		connectionString
    });
	describe("Registration Numbers", function () {
		beforeEach(async function () {
			await pool.query("delete from registration_numbers");
		});
		it("should be able to select id from town", async function(){
			let registration = Reg(pool);

		let capeTown = await registration.setRegNumbers("CA","1");
		let bellville = await registration.setRegNumbers("CY","2");
		let paarl =	await registration.setRegNumbers("CJ","3");

		assert.strictEqual(capeTown,)
		})



    after(function() {
		pool.end();
	})

});