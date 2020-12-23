# Temperature Conversion API Documentation
The Temperature Conversion API takes a number in either degrees Fahrenheit or degrees Celsius and converts it to the opposite unit. If the number was in degrees Fahrenheit, it will be converted to degrees Celsius and vice versa.

## *Convert Celsius to Fahrenheit*
**Request Format:** /toFahrenheit

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:**  Given a number in degrees Celsius, it returns a plain text response containing the number converted to degrees Fahrenheit.

**Example Request:** /toFahrenheit

**Example Response:**
```
Result: 123.45 degrees Fahrenheit
```

**Error Handling:**
- Possible 400 (invalid request) errors (all plain text):
  - If a required parameter is missing, it returns an error with the message: `Error: Missing required parameter.`

## *Convert Fahrenheit to Celsius*
**Request Format:** /toCelsius

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Given a number in degrees Fahrenheit, it returns a JSON object containing the number converted to degrees Celsius.


**Example Request:** /toCelsius

**Example Response:**
```json
{
    "output": "Result: 678.9 degrees Celsius"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all JSON):
  - If a required parameter is missing, it returns a JSON object containing the message: `Error: Missing required parameter.`