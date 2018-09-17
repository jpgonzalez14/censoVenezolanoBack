'use strict'

//models
var Censo = require('../models/censo');
var Person = require('../models/person');


function saveCenso(req, res) {
  //create object censo
  var censo = new Censo();
  //user params
  var params = req.body;


  Person.findOne({id: params.person}, (err,isPerson)=>{
    if (err) {
      res.status(500).send({
        message: 'error al comprobar el usuario'
      });
    } else {
      if (isPerson) {

        if (params.edad && params.queHace && params.educacion && params.profesion && params.enfermedades && params.ingresos && params.fechaIngreso && params.ciudad && params.pais) {
          //asign params to censo object
          censo.edad = params.edad;
          censo.queHace = params.queHace;
          censo.educacion = params.educacion;
          censo.profesion = params.profesion;
          censo.enfermedades = params.enfermedades;
          censo.ingresos = params.ingresos;
          censo.fechaIngreso = params.fechaIngreso;
          censo.pais = params.pais;
          censo.ciudad = params.ciudad;
          censo.person = isPerson._id;


          //save censo in database
          censo.save((err, censoStored) => {
            if (err) {
              res.status(500).send({
                message: 'error al guardar el censo: ' + err.message
              });
            } else {
              if (!censoStored) {
                res.status(404).send({
                  message: 'no se ha registrado la persona'
                });
              } else {
                res.status(200).send({
                  censo: censoStored
                });
              }
            }
          });

        } else {
          res.status(200).send({
            message: 'No ingreso todos los datos'
          });
        }

      } else {
        res.status(500).send({
          message: 'no existe esa persona'
        });
      }
    }
  });


};

function getCensos(req, res){
  Censo.find({}).exec((err, censos)=>{
    if (err) {
      res.status(500).send({message: 'error al pedir lista de censos'});
    } else {
      if (!censos) {
        res.status(404).send({message: 'no hay censos'});

      } else {
        res.status(200).send({censos});
      }
    }
  });
}

function getEstadisticas(req, res){
  Censo.find({}).exec((err, censos)=>{
    if (err) {
      res.status(500).send({message: 'error al pedir lista de censos'});
    } else {
      if (!censos) {
        res.status(404).send({message: 'no hay censos'});

      } else {
        let estadisticas = filtrarEstadisticas(censos);
        res.status(200).send({estadisticas});
      }
    }
  });
}

/*
Filtra el arreglo recibido por parametro en las diferentes condiciones
Edad: rangos de:
Niños: 0-12
Jovenes: 13-17
Adultos: 18-59
Viejos: 60+ 

Se realiza el conteo en base a las siguientes opciones:

educacion = ['Ninguna','Prescolar', 'Primaria', 'Secundaria', 'Bachiller', 'Superior']
profesion = ["Ninguna","Cerrajero","Constructor","Medico","Astronauta","Guardia","Administrador",'Actor','Bombero','Ejecutivo','Vendedor','Agricultor','Ingeniero','Enfermera','Educador','Plomero']
enfermedadeses = ['Sano','Diabetes','Desnutricion','Dengue','Zika','Fractura','Cardiaco','Respiratorio','Motriz', 'Mental', 'Chagas']
queHace = ['Nada','Que le importa','Sobrevivir','Vendedor informal','Pedir dinero','Crimen','Acompañante','Trabajo Formal','Viajar', 'Llorar']
pais = ['Colombia','Ecuador','Peru','Argentina','Mexico','Chile','Brasil','Bolivia']
ciudad = {
  'Colombia': ['Bogota','Medellin','Cucuta','Barranquilla','Cali','Cartagena'],
  'Ecuador': ['Quito','Guayaquil','Cuencua','Santo Domingo', 'Portoviejo'],
  'Peru': ['Lima','Cusco', 'Callao','Arequipa','Trujillo'],
  'Argentina': ['Buenos Aires','Mar del Plata','Cordoba','Rosario','Mendoza'],
  'Mexico': ['Ciudad de Mexico','Xalapa', 'Veracruz','Guadalajara','Acapulco','Guanajuato'],
  'Chile': ['Santiago','Valparaiso','Talca','Viña del Mar','Concepcion'],
  'Brasil': ['Salvador','Rio de Janeiro','São Paulo','Brasilia','Fortaleza'],
  'Bolivia': ['La Paz','Cochabamba','Santa Cruz','Trinidad', 'San Borja']
}

El filtrado de fecha de ingreso se hace por meses de la siguiente manera:
mes_año
ej: enero_2016
*/
function filtrarEstadisticas(data) {
  let filtro = {};
  // inicializar filtros
  let edad = {
    ninos: 0,
    adolescentes: 0,
    adultos: 0,
    viejos: 0,
  };
  let educacion = {
    ninguna: 0,
    prescolar: 0,
    primaria: 0,
    secundaria: 0,
    bachiller: 0,
    superior: 0
  };
  let profesion = {
    ninguna: 0,
    cerrajero: 0,
    constructor: 0,
    medico: 0,
    astronauta: 0,
    guardia: 0,
    administrador: 0,
    actor: 0,
    bombero: 0,
    ejecutivo: 0,
    vendedor: 0,
    agricultor: 0,
    ingeniero: 0,
    enfermera: 0,
    educador: 0,
    plomero: 0
  };
  let enfermedades = {
    sano: 0,
    diabetes: 0,
    desnutricion: 0,
    dengue: 0,
    zika: 0,
    fractura: 0,
    cardiaco: 0,
    respiratorio: 0,
    motriz: 0,
    mental: 0,
    chagas: 0
  };
  let queHace = {
    nada: 0,
    queleimporta: 0,
    sobrevivir: 0,
    pedirdinero: 0,
    viajar: 0,
    crimen: 0,
    trabajoformal: 0,
    vendedorinformal: 0,
    llorar: 0,
    acompanante: 0
  };
  let pais = {
    colombia: 0,
    ecuador: 0,
    peru: 0,
    argentina: 0,
    mexico: 0,
    chile: 0,
    brasil: 0,
    bolivia: 0
  }
  let ciudad = {
    bogota: 0,
    medellin: 0,
    cucuta: 0,
    cali: 0,
    barranquilla: 0,
    cartagena: 0,
    quito: 0,
    guayaquil: 0,
    cuenca: 0,
    santodomingo: 0,
    portoviejo: 0,
    lima: 0,
    cusco: 0,
    callao: 0,
    trujillo: 0,
    arequipa: 0,
    buenosaires: 0,
    mardelplata: 0,
    rosario: 0,
    mendoza: 0,
    cordoba: 0,
    ciudademexico: 0,
    xalapa: 0,
    veracruz: 0,
    guadalajara: 0,
    acapulco: 0,
    guanajuato: 0,
    santiago: 0,
    valparaiso: 0,
    talca: 0,
    vinadelmar: 0,
    concepcion: 0,
    salvador: 0,
    riodejaneiro: 0,
    saopaulo: 0,
    brasilia: 0,
    fortaleza: 0,
    lapaz: 0,
    cochabamba: 0,
    santacruz: 0,
    trinidad: 0,
    sanborja: 0
  }
  let fechaIngreso = {
    enero_2016: 0,
    febrero_2016: 0,
    marzo_2016: 0,
    abril_2016: 0,
    mayo_2016: 0,
    junio_2016: 0,
    julio_2016: 0,
    agosto_2016: 0,
    septiembre_2016: 0,
    octubre_2016: 0,
    noviembre_2016: 0,
    diciembre_2016: 0,
    enero_2017: 0,
    febrero_2017: 0,
    marzo_2017: 0,
    abril_2017: 0,
    mayo_2017: 0,
    junio_2017: 0,
    julio_2017: 0,
    agosto_2017: 0,
    septiembre_2017: 0,
    octubre_2017: 0,
    noviembre_2017: 0,
    diciembre_2017: 0,
    enero_2018: 0,
    febrero_2018: 0,
    marzo_2018: 0,
    abril_2018: 0,
    mayo_2018: 0,
    junio_2018: 0,
    julio_2018: 0,
    agosto_2018: 0,
    septiembre_2018: 0,
    octubre_2018: 0,
    noviembre_2018: 0,
    diciembre_2018: 0,
  }
  // Filtrar
  for(let i=0; i < data.length; i++) {

    let pEdad = data[i].edad;
    let pEducacion = data[i].educacion;
    let pProfesion = data[i].profesion;
    let pEnfermedades = data[i].enfermedades;
    let pQuehace = data[i].queHace;
    let pPais = data[i].pais;
    let pCiudad = data[i].ciudad;
    let pFechaIngreso = data[i].fechaIngreso;

    if(pEdad < 13) edad.ninos++;
    else if(pEdad < 18) edad.adolescentes++;
    else if(pEdad < 60) edad.adultos++;
    else edad.viejos++;

    if(pEducacion === 'Prescolar') educacion.prescolar++;
    else if(pEducacion === 'Primaria') educacion.primaria++;
    else if(pEducacion === 'Secundaria') educacion.secundaria++;
    else if(pEducacion === 'Bachiller') educacion.bachiller++;
    else if(pEducacion === 'Superior') educacion.superior++;
    else educacion.ninguna++;

    if(pProfesion === 'Cerrajero') profesion.cerrajero++;
    else if(pProfesion === 'Constructor') profesion.constructor++;
    else if(pProfesion === 'Medico') profesion.medico++;
    else if(pProfesion === 'Astronauta') profesion.astronauta++;
    else if(pProfesion === 'Guardia') profesion.guardia++;
    else if(pProfesion === 'Administrador') profesion.administrador++;
    else if(pProfesion === 'Actor') profesion.actor++;
    else if(pProfesion === 'Bombero') profesion.bombero++;
    else if(pProfesion === 'Ejecutivo') profesion.ejecutivo++;
    else if(pProfesion === 'Vendedor') profesion.vendedor++;
    else if(pProfesion === 'Agricultor') profesion.agricultor++;
    else if(pProfesion === 'Ingeniero') profesion.ingeniero++;
    else if(pProfesion === 'Enfermera') profesion.enfermera++;
    else if(pProfesion === 'Educador') profesion.educador++;
    else if(pProfesion === 'Plomero') profesion.plomero++;
    else profesion.ninguna++;

    if(pEnfermedades === 'Diabetes') enfermedades.diabetes++;
    else if(pEnfermedades === 'Desnutricion') enfermedades.desnutricion++;
    else if(pEnfermedades === 'Dengue') enfermedades.dengue++;
    else if(pEnfermedades === 'Zika') enfermedades.zika++;
    else if(pEnfermedades === 'Fractura') enfermedades.fractura++;
    else if(pEnfermedades === 'Cardiaco') enfermedades.cardiaco++;
    else if(pEnfermedades === 'Respiratorio') enfermedades.respiratorio++;
    else if(pEnfermedades === 'Motriz') enfermedades.motriz++;
    else if(pEnfermedades === 'Mental') enfermedades.mental++;
    else if(pEnfermedades === 'Chagas') enfermedades.chagas++;
    else enfermedades.sano++;

    if(pQuehace === 'Que le importa') queHace.queleimporta++;
    else if(pQuehace === 'Sobrevivir') queHace.sobrevivir++;
    else if(pQuehace === 'Pedir dinero') queHace.pedirdinero++;
    else if(pQuehace === 'Viajar') queHace.viajar++;
    else if(pQuehace === 'Trabajo formal') queHace.trabajoformal++;
    else if(pQuehace === 'Vendedor informal') queHace.vendedorinformal++;
    else if(pQuehace === 'Llorar') queHace.llorar++;
    else if(pQuehace === 'Crimen') queHace.crimen++;
    else if(pQuehace === 'Acompañante') queHace.acompanante++;
    else queHace.nada++;

    if(pPais === 'Colombia') pais.colombia++;
    else if(pPais === 'Ecuador') pais.ecuador++;
    else if(pPais === 'Peru') pais.peru++;
    else if(pPais === 'Argentina') pais.argentina++;
    else if(pPais === 'Mexico') pais.mexico++;
    else if(pPais === 'Chile') pais.chile++;
    else if(pPais === 'Brasil') pais.brasil++;
    else pais.bolivia++;

    if(pCiudad === 'Bogota') ciudad.bogota++;
    else if(pCiudad === 'Medellin') ciudad.medellin++;
    else if(pCiudad === 'Cucuta') ciudad.cucuta++;
    else if(pCiudad === 'Cali') ciudad.cali++;
    else if(pCiudad === 'Barranquilla') ciudad.barranquilla++;
    else if(pCiudad === 'Cartagena') ciudad.cartagena++;
    else if(pCiudad === 'Quito') ciudad.quito++;
    else if(pCiudad === 'Guayaquil') ciudad.guayaquil++;
    else if(pCiudad === 'Cuencua') ciudad.cuenca++;
    else if(pCiudad === 'Santo Domingo') ciudad.santodomingo++;
    else if(pCiudad === 'Portoviejo') ciudad.portoviejo++;
    else if(pCiudad === 'Lima') ciudad.lima++;
    else if(pCiudad === 'Cusco') ciudad.cusco++;
    else if(pCiudad === 'Callao') ciudad.callao++;
    else if(pCiudad === 'Arequipa') ciudad.arequipa++;
    else if(pCiudad === 'Trujillo') ciudad.trujillo++;
    else if(pCiudad === 'Buenos Aires') ciudad.buenosaires++;
    else if(pCiudad === 'Mar del Plata') ciudad.mardelplata++;
    else if(pCiudad === 'Cordoba') ciudad.cordoba++;
    else if(pCiudad === 'Rosario') ciudad.rosario++;
    else if(pCiudad === 'Mendoza') ciudad.mendoza++;
    else if(pCiudad === 'Ciudad de Mexico') ciudad.ciudademexico++;
    else if(pCiudad === 'Xalapa') ciudad.xalapa++;
    else if(pCiudad === 'Veracruz') ciudad.veracruz++;
    else if(pCiudad === 'Guadalajara') ciudad.guadalajara++;
    else if(pCiudad === 'Acapulco') ciudad.acapulco++;
    else if(pCiudad === 'Guanajuato') ciudad.guanajuato++;
    else if(pCiudad === 'Santiago') ciudad.santiago++;
    else if(pCiudad === 'Valparaiso') ciudad.valparaiso++;
    else if(pCiudad === 'Viña del Mar') ciudad.vinadelmar++;
    else if(pCiudad === 'Talca') ciudad.talca++;
    else if(pCiudad === 'Concepcion') ciudad.concepcion++;
    else if(pCiudad === 'Salvador') ciudad.salvador++;
    else if(pCiudad === 'Rio de Janeiro') ciudad.riodejaneiro++;
    else if(pCiudad === 'São Paulo') ciudad.saopaulo++;
    else if(pCiudad === 'Brasilia') ciudad.brasilia++;
    else if(pCiudad === 'Fortaleza') ciudad.fortaleza++;
    else if(pCiudad === 'La Paz') ciudad.lapaz++;
    else if(pCiudad === 'Cochabamba') ciudad.cochabamba++;
    else if(pCiudad === 'Santa Cruz') ciudad.santacruz++;
    else if(pCiudad === 'Trinidad') ciudad.trinidad++;
    else ciudad.sanborja++;

    if(pFechaIngreso.startsWith('2016-01')) fechaIngreso.enero_2016++;
    else if(pFechaIngreso.startsWith('2016-02')) fechaIngreso.febrero_2016++;
    else if(pFechaIngreso.startsWith('2016-03')) fechaIngreso.marzo_2016++;
    else if(pFechaIngreso.startsWith('2016-04')) fechaIngreso.abril_2016++;
    else if(pFechaIngreso.startsWith('2016-05')) fechaIngreso.mayo_2016++;
    else if(pFechaIngreso.startsWith('2016-06')) fechaIngreso.junio_2016++;
    else if(pFechaIngreso.startsWith('2016-07')) fechaIngreso.julio_2016++;
    else if(pFechaIngreso.startsWith('2016-08')) fechaIngreso.agosto_2016++;
    else if(pFechaIngreso.startsWith('2016-09')) fechaIngreso.septiembre_2016++;
    else if(pFechaIngreso.startsWith('2016-10')) fechaIngreso.octubre_2016++;
    else if(pFechaIngreso.startsWith('2016-11')) fechaIngreso.noviembre_2016++;
    else if(pFechaIngreso.startsWith('2016-12')) fechaIngreso.diciembre_2016++;
    else if(pFechaIngreso.startsWith('2017-01')) fechaIngreso.enero_2017++;
    else if(pFechaIngreso.startsWith('2017-02')) fechaIngreso.febrero_2017++;
    else if(pFechaIngreso.startsWith('2017-03')) fechaIngreso.marzo_2017++;
    else if(pFechaIngreso.startsWith('2017-04')) fechaIngreso.abril_2017++;
    else if(pFechaIngreso.startsWith('2017-05')) fechaIngreso.mayo_2017++;
    else if(pFechaIngreso.startsWith('2017-06')) fechaIngreso.junio_2017++;
    else if(pFechaIngreso.startsWith('2017-07')) fechaIngreso.julio_2017++;
    else if(pFechaIngreso.startsWith('2017-08')) fechaIngreso.agosto_2017++;
    else if(pFechaIngreso.startsWith('2017-09')) fechaIngreso.septiembre_2017++;
    else if(pFechaIngreso.startsWith('2017-10')) fechaIngreso.octubre_2017++;
    else if(pFechaIngreso.startsWith('2017-11')) fechaIngreso.noviembre_2017++;
    else if(pFechaIngreso.startsWith('2017-12')) fechaIngreso.diciembre_2017++;
    else if(pFechaIngreso.startsWith('2018-01')) fechaIngreso.enero_2018++;
    else if(pFechaIngreso.startsWith('2018-02')) fechaIngreso.febrero_2018++;
    else if(pFechaIngreso.startsWith('2018-03')) fechaIngreso.marzo_2018++;
    else if(pFechaIngreso.startsWith('2018-04')) fechaIngreso.abril_2018++;
    else if(pFechaIngreso.startsWith('2018-05')) fechaIngreso.mayo_2018++;
    else if(pFechaIngreso.startsWith('2018-06')) fechaIngreso.junio_2018++;
    else if(pFechaIngreso.startsWith('2018-07')) fechaIngreso.julio_2018++;
    else if(pFechaIngreso.startsWith('2018-08')) fechaIngreso.agosto_2018++;
    else if(pFechaIngreso.startsWith('2018-09')) fechaIngreso.septiembre_2018++;
    else if(pFechaIngreso.startsWith('2018-10')) fechaIngreso.octubre_2018++;   
    else if(pFechaIngreso.startsWith('2018-11')) fechaIngreso.noviembre_2018++;
    else fechaIngreso.diciembre_2018++;
  }
  filtro.edad = edad;
  filtro.educacion = educacion;
  filtro.enfermedades = enfermedades;
  filtro.profesion = profesion;
  filtro.queHace = queHace;
  filtro.pais = pais;
  filtro.ciudad = ciudad;
  filtro.fechaIngreso = fechaIngreso;
  return filtro;
}

//Filtrar por pais
function filtrarPais(data, pais) {
    return data.filter(d => d.pais === pais);
}

//Filtrar por ciudad
function filtrarCiudad(data, ciudad) {
  return data.filter(d => d.ciudad === ciudad);
}


  //export objects
  module.exports = {
    saveCenso,
    getCensos,
    getEstadisticas
  };
