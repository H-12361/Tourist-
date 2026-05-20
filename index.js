if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo").default || require("connect-mongo");

const User = require("./modles/user");            // ✅ typo fix
const UserRouter = require("./router/user");
const listingRouter = require("./router/listing");
const reviewsRouter = require("./router/review");

// ================== DATABASE ==================
const Mongo_Url = process.env.ATLASDB_URL;

mongoose
  .connect(Mongo_Url)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

// ================== VIEW ENGINE ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// ================== MIDDLEWARE ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ================== SESSION STORE ==================
const store = MongoStore.create({
  mongoUrl: Mongo_Url,
  crypto: {
    secret: process.env.SESSION_SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Session Store Error:", err);
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ================== PASSPORT AUTH ==================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ================== FLASH & CURRENT USER ==================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.curruser = req.user;
  next();
});

// ================== ROUTES ==================
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", UserRouter);

// ================== ERROR HANDLER ==================
app.all("*splat", (req, res, next) => {          // ✅ Express v5 fix
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

// ================== SERVER ==================
app.listen(8080, () => {
  console.log("🚀 Server running on port 8080");
});