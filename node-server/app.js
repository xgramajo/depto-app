const express = require("express");
//morgan: libreria para logs
const morgan = require("morgan");
//libreria para parsear los body de las request
const bodyParser = require("body-parser");
//libreria para manejar MongoDB
const mongoose = require("mongoose");
//Auth0 config
// config express-session
var session = require('express-session');
// Load environment variables from .env
var dotenv = require('dotenv');
// Load Passport
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');

dotenv.config();

// Configure Passport to use Auth0
var strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            process.env.AUTH0_CALLBACK_URL
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

const app = express();

// config express-session
var sess = {
    secret: process.env.AUTH0_RANDOM_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true
};

if (app.get('env') === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    sess.cookie.secure = true;

    // Uncomment the line below if your application is behind a proxy (like on Heroku)
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
}

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());

const userInViews = require('./api/lib/middleware/userInViews');
const apartmentsRoutes = require("./api/routes/apartments");
const newsRoutes = require("./api/routes/news");
const usersRoutes = require("./api/routes/users");
const authRoutes = require("./api/routes/auth");
const indexRoutes = require("./api/routes/index");

//aplicar las librerias a las request
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//esto es para no tener el error CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, DELETE, ")
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

app.use((userInViews()));
app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", usersRoutes);
app.use("/", apartmentsRoutes);
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