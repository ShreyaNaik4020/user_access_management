const { EntitySchema } = require("typeorm");

const Software = new EntitySchema({
  name: "Software",
  tableName: "software",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    description: {
      type: "text",
    },
    accessLevels: {
      type: "simple-array", // stores like 'Read,Write,Admin'
    },
  },
});

module.exports = { Software };