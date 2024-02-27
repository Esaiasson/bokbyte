app.use(express.static(path.join(dirname, "public")));

//Put this after all middleware. Otherwise, Heroku will give you 304 page
app.get("*", function (req, res) {
  res.sendFile(path.join(dirname, "public", "index.html"));
});