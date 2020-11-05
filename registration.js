module.exports = function (pool) {

  async function getTownId(number) {

    var substr = number.substring(0, 2);

    console.log(substr);

    var check = await pool.query("select id from town where start_with = $1", [
      substr]);
    // var results = await pool.query(chregistrationeck, [substring])

    console.log(check.rows);

    return check.rows[0].id;
  }

  // var check = await pool.query('select id from town where start_with = $1', [substr]);

  async function setRegNumbers(number) {

    const townId = await getTownId(number);

if(townId <1){
    var insert2 = await pool.query("insert into registration_numbers(regnumbers, allreg_id) values ($1, $2)",[number, townId]);
}
    
  }
  // }

  async function listAll() {
    const sqlList = await pool.query(
      "select regnumbers from registration_numbers"
    );
    console.log(sqlList);
    return sqlList.rows;
  }

  async function regCheck(regEntered) {
    var regList = [];

    // for (var i = 0; i < regEntered.length; i++) {

    if (regEntered.startsWith("CY")) {
      regList.push(regEntered);
    } else if (regEntered.startsWith("CJ")) {
      regList.push(regEntered);
    } else if (regEntered.startsWith("CA")) {
      regList.push(regEntered);
    }

    // console.log(regList);
    return regList;
    // }
  }

  async function filter(town_tag) {
    if (town_tag === "all") {
      let All = await pool.query("select * from registration_numbers");
      return All.rows;
    } else {
      let selected_id = await pool.query(
        "select regnumbers from registration_numbers where allReg_id =$1",
        [town_tag]
      );
      console.log(selected_id.rows)
      return selected_id.rows;
    }
    // if(town_tag === 'CY'){
    //    return  bellvile.rows11
    // }
    // if(town_tag === 'CJ'){
    //   let paarl = await pool.query("select allreg_id from registration_numbers", [town_tag])
    //   return  paarl.rows
    // }
    // if(town_tag === 'CA'){
    //    let capeTown = await pool.query("select allreg_id from registration_numbers")[town_tag]
    //    return  capeTown.rows
    // }
  }
  async function deleleBtn() {
    await pool.query("delete from registration_numbers");
  }

  async function dpRegNumber(){
      let duplicate = await pool.query('select foreign key from registration_numbers where allReg_id = $1')
      return duplicate.rowCount
  }
  return {
    setRegNumbers,
    listAll,
    regCheck,
    deleleBtn,
    getTownId,
    filter,
  };
};
