const Collaborator = require( '../models/Collaborator.js' );

const { response } = require ( 'express' );


const app = require('../Express_server.js');

const register = (req, res = response ) => { 
  /*  if ( ( req.user.role === 'planilla' ) || ( req.user.role ==='general' ) ) {
        console.log('soy el administrador');
    } else {
       return res.status( 500 ).json({
           status: 'Error',
           msg: 'Por favor contacte con el Administrador para mas información',
       });
    }*/
    const { id, nationality, name, last_name, direction, tel, cel,
        date_admission, dispatch_date} = req.body;

    try {
        let Collaborator = new Collaborator();
        Collaborator.id = id;
        Collaborator.nationality = nationality;
        Collaborator. name =  name;
        Collaborator. lastname =  last_name;
        Collaborator.direction = direction;
        Collaborator.tel = tel;
        Collaborator.cel = cel;
       //Collaborator.date_admission = date_admission;
        //Collaborator.dispatch_date = dispatch_date;
        
        Collaborator.save();

        return res.status( 200 ).json({
            status: 'success',
            msg: 'Colaborador registrado con exito',
        })

    } catch( error ) {
        return res.status( 500 ).json({
            status: 'Error',
            msg: 'Por favor contacte con el Administrador para mas información',
        });
    }
};

const update = (req, res =response)=>{

};
module.exports = {
    register,
 };