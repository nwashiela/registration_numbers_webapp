module.exports =  function getRoutes(registration) {

  async function dFRouts(req, res) {
    res.render("index", {
      list: await registration.listAll(),
      messages: "",
    });
  }
   async function pstMessageList(req, res) {
    const regEntered = req.body.regName;
    const reg = regEntered.toUpperCase();

    if (!reg) {
      req.flash("info", "registration is not entered");
      res.render("index");
    } else if (!/C[AYJ] \d{3,6}$/.test(reg)) {
      req.flash("info", "invalid registration");
    } else  {
      
      var add = await registration.setRegNumbers(reg);
   //   var checking = await registration.check(reg)
     
      if (add === false) {
        req.flash("info", "registration already exist");

      } 
      req.flash("success", add) //templating message
  
    }
     
  


    res.render("index", {
      list: await registration.listAll(),
      message: await registration.regCheck(reg),
      // registration.regCheck(regEntered)
    });
  }
  async function filterTown(req, res) {
    var towns = req.query.town;

    var filterTowns = await registration.filter(towns);
    res.render("index", {
      list: filterTowns,
    });
  }
  async function clear(req, res) {
   
    await registration.deleleBtn();
    req.flash('success', 'successfully cleared the registration list')
    res.redirect("/reg_numbers");
  }
  return {
    dFRouts,
    pstMessageList,
    filterTown,
    clear
  };
};
