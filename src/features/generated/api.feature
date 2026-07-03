Feature: Booking Service API Functionality

  Scenario: Create a new booking successfully
    Given a booking request payload with:
      | firstname | lastname | totalprice | depositpaid | bookingdates.checkin | bookingdates.checkout | additionalneeds |
      | John      | Doe      | 150        | true        | 2023-01-01           | 2023-01-05            | Breakfast       |
    When a POST request is sent to the "/booking" endpoint
    Then the response status code should be 200
    And the response should contain a "bookingid"
    And the response "booking" object details should match the request payload

  Scenario: Retrieve an existing booking by its ID
    Given a booking has been successfully created with ID "123"
    When a GET request is sent to the "/booking/123" endpoint
    Then the response status code should be 200
    And the response body should contain the details of the created booking

  Scenario: Successfully update an existing booking
    Given a booking has been successfully created with ID "456"
    And an updated booking request payload with:
      | firstname | lastname | totalprice | depositpaid | bookingdates.checkin | bookingdates.checkout | additionalneeds |
      | Jane      | Smith    | 200        | false       | 2023-02-10           | 2023-02-15            | Parking         |
    When a PUT request is sent to the "/booking/456" endpoint
    Then the response status code should be 200
    And the response body should contain the updated booking details

  Scenario: Attempt to retrieve a booking with an invalid ID
    Given an invalid booking ID "999999"
    When a GET request is sent to the "/booking/999999" endpoint
    Then the response status code should be 404
    And the response body should be empty or indicate "Not Found"