import express from "express";

import mysql2 from "mysql2/promise";

let newConnection;

newConnection = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: "localhost",
      user: "root",
      database: "tasks_db",
    });
    return connection;
  } catch (error) {
    console.error("Error creating connection:", error);
  }
};


export { newConnection };
