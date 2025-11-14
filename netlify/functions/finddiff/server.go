package main

import (
    "encoding/json"
    "fmt"
    //"net/http"
    "time"
    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
    // Set CORS headers
    headers := map[string]string{
        "Content-Type":                 "application/json",
        "Access-Control-Allow-Origin":  "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    // Handle preflight OPTIONS request
    if request.HTTPMethod == "OPTIONS" {
        return events.APIGatewayProxyResponse{
            StatusCode: 200,
            Headers:    headers,
        }, nil
    }

    // Only allow POST requests
    if request.HTTPMethod != "POST" {
        return events.APIGatewayProxyResponse{
            StatusCode: 405,
            Headers:    headers,
            Body:       `{"error": "Method not allowed"}`,
        }, nil
    }

    // Parse the request body
    var req Request
    err := json.Unmarshal([]byte(request.Body), &req)
    if err != nil {
        return events.APIGatewayProxyResponse{
            StatusCode: 400,
            Headers:    headers,
            Body:       `{"error": "Invalid JSON"}`,
        }, nil
    }

    // Validate input
    if req.String1 == "" || req.String2 == "" {
        return events.APIGatewayProxyResponse{
            StatusCode: 400,
            Headers:    headers,
            Body:       `{"error": "Both strings are required"}`,
        }, nil
    }

    // Call your FindDiff function
    result, err := FindDifference(req.String1, req.String2, []Misspell{})
    /* if err != nil {
        return events.APIGatewayProxyResponse{
            StatusCode: 500,
            Headers:    headers,
            Body:       `{"error": "Error processing strings"}`,
        }, nil
    } */

    // Create response
    response := ServerResponse{
        Result: result,
    }
    if err != nil {
        response.Result = nil
        response.Error = err.Error()
    }

    // SLEEP
    fmt.Print("Sleeping for 2 seconds...")
    time.Sleep(2 * time.Second)
    fmt.Print("Done!")

    // Convert response to JSON
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        return events.APIGatewayProxyResponse{
            StatusCode: 500,
            Headers:    headers,
            Body:       `{"error": "Internal server error"}`,
        }, nil
    }

    // Return successful response
    return events.APIGatewayProxyResponse{
        StatusCode: 200,
        Headers:    headers,
        Body:       string(jsonResponse),
    }, nil
}

func main() {
    lambda.Start(handler)
}