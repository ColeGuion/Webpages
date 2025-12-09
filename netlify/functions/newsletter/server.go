package main

import (
    "encoding/json"
    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
    // Set CORS headers
    headers := map[string]string{
        "Content-Type":                 "application/json",
        "Access-Control-Allow-Origin":  "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    // OPTIONS preflight
    if request.HTTPMethod == "OPTIONS" {
        return events.APIGatewayProxyResponse{
            StatusCode: 200,
            Headers:    headers,
        }, nil
    }

    // Only allow GET
    if request.HTTPMethod != "GET" {
        return events.APIGatewayProxyResponse{
            StatusCode: 405,
            Headers:    headers,
            Body:       `{"error": "Method not allowed"}`,
        }, nil
    }

    Info("Fetching TLDR newsletter")
    result, err := GetNewsletter()

    // Create response
    response := ServerResponse{
        Result: result,
    }
    if err != nil {
        response.Error = err.Error()
    }

    Info("Converting to JSON")
    jsonResponse, err := json.Marshal(response)
    if err != nil {
        return events.APIGatewayProxyResponse{
            StatusCode: 500,
            Headers:    headers,
            Body:       `{"error": "Internal server error"}`,
        }, nil
    }

    Info("Returning success")
    return events.APIGatewayProxyResponse{
        StatusCode: 200,
        Headers:    headers,
        Body:       string(jsonResponse),
    }, nil
}

func main() {
    lambda.Start(handler)
}