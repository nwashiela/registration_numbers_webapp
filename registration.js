module.exports = function (pool) {
  async function getTownId(number) {
    var substr = number.substring(0, 2);

    var check = await pool.query("select id from town where start_with = $1", [
      substr,
    ]);
    // var results = await pool.query(chregistrationeck, [substring])

    return check.rows[0].id;
  }
  
  async function setRegNumbers(number) {
    const townId = await getTownId(number);

    if (number) {
      let keepReg = await checkReg(number);
      if (keepReg === 0) {
        await pool.query(
          "insert into registration_numbers(regnumbers, allreg_id) values ($1, $2)",
          [number, townId]
         
        );
        return "successfully edded";
        // return townId.rowCount
      } else {
        // return  "registration already exist"
        return false;
      }
    
    }
  }

  async function checkReg(reg) {
    let rNumber = await pool.query(
      "select regnumbers from registration_numbers where regnumbers = $1",
      [reg]
    );
    return rNumber.rowCount;
  }

  async function listAll() {
    const sqlList = await pool.query(
      "select regnumbers from registration_numbers"
    );
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

    return regList;
    // }
  }

  async function filter(town_tag) {
    if (town_tag === "all") {
      let All = await pool.query("select regnumbers from registration_numbers");
      return All.rows;
    } else {
      let selected_id = await pool.query(
        "select regnumbers from registration_numbers where allReg_id =$1",
        [town_tag]
      );
      // console.log(selected_id.rows);
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
    var clean = await pool.query("delete from registration_numbers");
    return clean;
  }

  return {
    setRegNumbers,
    listAll,
    regCheck,
    deleleBtn,
    getTownId,
    filter,
    checkReg,
  };
};
