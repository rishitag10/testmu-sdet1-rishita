import { request, APIRequestContext } from "@playwright/test";

export class LoginAPI {

    private apiContext!: APIRequestContext;

    async init() {
        this.apiContext = await request.newContext({
            baseURL: "https://restful-booker.herokuapp.com"
        });
    }

    async generateToken() {

        const response = await this.apiContext.post("/auth", {
            data: {
                username: "admin",
                password: "password123"
            }
        });

        return await response.json();
    }

    async createBooking() {

        const response = await this.apiContext.post("/booking", {
            data: {
                firstname: "Rishita",
                lastname: "Gupta",
                totalprice: 1500,
                depositpaid: true,
                bookingdates: {
                    checkin: "2026-07-10",
                    checkout: "2026-07-15"
                },
                additionalneeds: "Breakfast"
            }
        });

        return await response.json();
    }

    async getBooking(id: number) {

        const response = await this.apiContext.get(`/booking/${id}`);

        return await response.json();
    }

}