module.exports = function (pool) {

    async function getTownId(number) {

        console.log(number);

        var numerious = number.toUpperCase()
        var substr = numerious.substring(0, 2)

        console.log(substr);

        var check = await pool.query('select id from town where start_with = $1', [substr]);
        // var results = await pool.query(chregistrationeck, [substring])

        console.log(check.rows);

        return check.rows[0].id
    }        
    
    
    // var check = await pool.query('select id from town where start_with = $1', [substr]);


    async function setRegNumbers(number) {

        const townId = await getTownId(number);

        let insert2 = await pool.query('insert into registration_numbers(regnumbers, allreg_id) values ($1, $2)', [number, townId]);
    }
// }

    async function listAll() {

        const sqlList = await pool.query('select regnumbers from registration_numbers')
        console.log(sqlList);
        return sqlList.rows
    }

    async function regCheck(regEntered) {

        var regList = [];

        // for (var i = 0; i < regEntered.length; i++) {

        if (regEntered.startsWith("CY")) {
            regList.push(regEntered);

        }
        else if (regEntered.startsWith("CJ")) {
            regList.push(regEntered);

        }
        else if (regEntered.startsWith("CA")) {
            regList.push(regEntered);

        }

        console.log(regList)
        return regList;
        // }
    }

    // async function filter(town_tag){
    //     if(town_tag === 'all'){
    //         "select * from select regnumbers from registration_numbers"
    //     }
    //     if(town_tag === 'CY'){
    //         "select allreg_id from registration_numbers"
    //     }
    //     if(town_tag === 'CJ'){
    //         "select allreg_id from registration_numbers"
    //     }
    //     if(town_tag === 'CA'){
    //         "select allreg_id from registration_numbers"
    //     }

    // }
    async function deleleBtn() {
        await pool.query('delete from registration_numbers')
    }



    return {
        setRegNumbers,
        listAll,
        regCheck,
        deleleBtn,
        getTownId
    }
}