const express = require("express"); //morgan: libreria para logs
const morgan = require("morgan"); //libreria para parsear los body de las request
const bodyParser = require("body-parser"); //libreria para manejar MongoDB
const mongoose = require("mongoose");

const app = express();

const apartmentsRoutes = require("./api/routes/apartments");
const newsRoutes = require("./api/routes/news");
const indexRoutes = require("./api/routes/index");

//Auth0 API config
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_API_jwksUri
    }),
  
    // Validate the audience and the issuer.
    audience: process.env.AUTH0_API_AUDIENCE,
    issuer: process.env.AUTH0_API_USSUER,
    algorithms: ['RS256']
  });

const checkScopes = jwtAuthz([ 'read:messages' ]);

//aplicar las librerias a las request
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//esto es para no tener el error CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-PINGOTHER"
    );
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, DELETE, OPTIONS")
        return res.status(200).json({})
    }
    next();
})

//conexion a la DB
mongoose.connect(
    "mongodb+srv://xgramajo:" +
    process.env.MONGO_ATLAS_PW +
    "@depto-cluster-g7jj3.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>console.log("DB server connect"))
    .catch(e => console.log("DB error:", e));

app.use("/", indexRoutes);
//app.use("/", checkJwt, apartmentsRoutes);
app.use("/", apartmentsRoutes);
//app.use("/", checkJwt, checkScopes, newsRoutes);
app.use("/", newsRoutes);

//esta funcion se triggerea en caso de error en algun path
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error)
});

//esta funcion se triggerea en caso de falla de DB, por ej.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;