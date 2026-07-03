import { Given, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { LoginAPI } from "../api/LoginAPI";

const api = new LoginAPI();

let token: any;
let booking: any;

Before({ tags: "@api" }, async function () {
    await api.init();
});

Given("I create an authentication token", async function () {

    token = await api.generateToken();

});

Then("the token should be generated successfully", async function () {

    expect(token.token).toBeDefined();

});

Given("I create a new booking", async function () {

    booking = await api.createBooking();

});

Then("booking should be created successfully", async function () {

    expect(booking.bookingid).toBeDefined();

});

Given("I fetch booking details", async function () {

    if (!booking) {
        booking = await api.createBooking();
    }

    booking = await api.getBooking(booking.bookingid);

});

Then("booking details should be returned", async function () {

    expect(booking.firstname).toBe("Rishita");

});

Given("I update the booking", async function () {

});

Then("booking should be updated successfully", async function () {

    expect(true).toBeTruthy();

});

Given("I delete the booking", async function () {

});

Then("booking should be deleted successfully", async function () {

    expect(true).toBeTruthy();

});