import express from "express";

import mysql2 from "mysql2/promise";
const newConnection = async () => {
  const connection = await mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "tasks_db",
  });

  return connection;
};

export { newConnection };
