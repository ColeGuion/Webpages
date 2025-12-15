package main

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handleFindDiff(request events.APIGatewayProxyRequest, headers map[string]string) (events.APIGatewayProxyResponse, error) {
	var req Request
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error":"Invalid JSON in request body"}`,
		}, nil
	}

	if req.String1 == "" || req.String2 == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error":"Both strings are required"}`,
		}, nil
	}

	Info("Sending to FindDifference()")
	result, err := FindDifference(req.String1, req.String2, []Misspell{})
	Info("Got FindDifference() Result")

	resp := ServerResponse{
		Result: result,
	}
	if err != nil {
		resp.Error = err.Error()
	}

	Info("Convert response to JSON")
	jsonResp, _ := json.Marshal(resp)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "Bad marshalling. Internal server error"}`,
		}, nil
	}

	Info("Returning successful response")
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(jsonResp),
	}, nil
}

func handleGetNewsletter(request events.APIGatewayProxyRequest, headers map[string]string) (events.APIGatewayProxyResponse, error) {
	var req NewsletterRequest
	if err := json.Unmarshal([]byte(request.Body), &req); err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error":"Invalid JSON in request body"}`,
		}, nil
	}

	if req.Url == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Headers:    headers,
			Body:       `{"error":"String is required"}`,
		}, nil
	}

	Info("URL: %q", req.Url)
	Info("Sending to GetNewsletter()")
	result, err := GetNewsletter(req.Url)
	Info("Got GetNewsletter() Result")

	resp := NewsletterResponse{
		Result: result,
	}
	if err != nil {
		resp.Error = err.Error()
	}

	Info("Convert response to JSON")
	jsonResp, _ := json.Marshal(resp)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Headers:    headers,
			Body:       `{"error": "Bad marshalling. Internal server error"}`,
		}, nil
	}

	Info("Returning successful response")
	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(jsonResp),
	}, nil
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	headers := map[string]string{
		"Content-Type":                 "application/json",
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	}

	if request.HTTPMethod == "OPTIONS" {
		return events.APIGatewayProxyResponse{
			StatusCode: 200,
			Headers:    headers,
		}, nil
	}

	if request.HTTPMethod != "POST" {
		return events.APIGatewayProxyResponse{
			StatusCode: 405,
			Headers:    headers,
			Body:       `{"error":"Method not allowed"}`,
		}, nil
	}

	switch request.Path {
	case "/.netlify/functions/finddiff":
		return handleFindDiff(request, headers)

	case "/.netlify/functions/finddiff/newsletter":
		return handleGetNewsletter(request, headers)

	default:
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Headers:    headers,
			Body:       `{"error":"Not found"}`,
		}, nil
	}
}

func main() {
	lambda.Start(handler)
}
