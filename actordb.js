function findActor(client, actor, callback) {
  console.log("Searching....");
  client.query(
    "SELECT * FROM famous_people WHERE first_name = $1;",
    [actor],
    (err, result) => {
      if (err) {
        callback(err)
        return
      }
      callback(null, result.rows)
    }
  );
}

module.exports = {
  findActor: findActor,
}