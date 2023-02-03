// function hast5dmha ma3 ay request 3ayza a validate 3aleeh sha8ala 3ala ay haga 3ayza asha8l al validation ma3aha 
// al 
// function btsta2bl schema =>> al schema de ally gaya mn al joi 

const { StatusCodes } = require("http-status-codes");

module.exports = (schema) =>{
    return(req,res,next) => {
        const validation = [];
                            // de ally gaya mn joi
        const validateResult = schema.body.validate(req.body);
        console.log(validateResult.error);
        if(validateResult.error){
            validation.push(validateResult.error.details[0].message);
        }
        // law hya bkema 8er al zero teb2a true => law zero hatb2a false law ay kema tanya hatb2a true ya3ny law al length akbr mn zero ya3ny kda fe error yb2a rag3ly al error da 
        if(validation.length)
        {
            // res.json({message:validation.join()});
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message:`validation: ${validation.join()}`});
            return; 
        }
        next();
    }
};

// harboto bmalaf al route aroo7 henaak a3mlo require 