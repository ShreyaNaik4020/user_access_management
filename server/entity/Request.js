const { EntitySchema } = require("typeorm");

const Request = new EntitySchema({
  name: "Request",
  tableName: "requests",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    accessType: {
      type: "varchar", // 'Read', 'Write', 'Admin'
    },
    reason: {
      type: "text",
    },
    status: {
      type: "varchar",
      default: "Pending", // 'Pending', 'Approved', 'Rejected'
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      eager: true,
    },
    software: {
      type: "many-to-one",
      target: "Software",
      eager: true,
    },
  },
});

module.exports = { Request };