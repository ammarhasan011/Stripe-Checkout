import { Request, Response } from "express";
const bcrypt = require("bcryptjs");
const fs = require("fs/promises");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const userDBFile = "customers.json";

interface User {
  customerId: string;
  username: string;
  email: string;
  password: string;
}

async function createStripeCustomer(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 5);

    const customer = await stripe.customers.create({ email });

    const user: User = {
      customerId: customer.id,
      username,
      email,
      password: hashedPassword,
    };

    const users: User[] = [];
    // Lägg till användaren i databasen (JSON-filen)
    await addUserToDatabase(user);

    res.status(200).json({ message: "Registration successful!", user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong during registration." });
  }
}

// Funktion för att skapa en Stripe-kund
async function addUserToDatabase(user: User) {
  try {
    let users: User[] = [];
    try {
      // Läs befintlig användardatabas från filen
      const data = await fs.readFile(userDBFile, "utf8");
      users = JSON.parse(data);
    } catch (error) {
      // Om filen inte finns ännu eller är tom
      users = [];
      console.log(user);
    }
    users.push(user);

    // Spara användardatabasen till filen
    await fs.writeFile(userDBFile, JSON.stringify(users, null, 2));

    console.log(`user ${user.username} saved in json.`);
  } catch (error) {
    console.error("Error when saving users in the database:", error);
    throw error;
  }
}

module.exports = { createStripeCustomer };