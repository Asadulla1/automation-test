import { test } from "@playwright/test";
import dotenv from "dotenv";
import {
  launch,
  goToLoginPage,
  login,
  verifyLoginSuccess,
} from "../pages/loginpage";

dotenv.config();

const { USER_NAME, USER_EMAIL, USER_PASSWORD } = process.env;

test("Login with registered user", async ({ page }) => {
  if (!USER_NAME || !USER_EMAIL || !USER_PASSWORD) {
    throw new Error(
      "Set USER_NAME, USER_EMAIL and USER_PASSWORD in the .env file",
    );
  }

  await launch(page);
  await goToLoginPage(page);
  await login(page, USER_EMAIL, USER_PASSWORD);
  await verifyLoginSuccess(page, USER_NAME);
});
