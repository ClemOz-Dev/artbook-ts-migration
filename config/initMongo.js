db = db.getSiblingDB('artbook');

db.createUser({
  user: "artbook",
  pwd: "artbook",
  roles: [{ role: "readWrite", db: "artbook" }]
});