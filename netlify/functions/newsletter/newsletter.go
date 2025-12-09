package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

// Types
type Article struct {
	Title string `json:"title"`
	Text  string `json:"text"`
}

type ServerResponse struct {
	Result []Article `json:"result,omitempty"`
	Error  string    `json:"error,omitempty"`
}

// Your scraper function
func GetNewsletter() ([]Article, error) {
	url := "https://tldr.tech/ai/2025-12-08"

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch page: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("unexpected status %d", resp.StatusCode)
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to parse HTML: %w", err)
	}

	var articles []Article
	doc.Find("article").Each(func(i int, sel *goquery.Selection) {
		title := sel.Find("h1, h2, h3").First().Text()
		text := sel.Find("div.newsletter-html").Text()

		if title == "" && text == "" {
			return
		}

		articles = append(articles, Article{
			Title: title,
			Text:  text,
		})
	})

	return articles, nil
}

// Lambda handler
func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	headers := map[string]string{
		"Content-Type":                 "application/json",
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "GET, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	}

	if request.HTTPMethod == "OPTIONS" {
		return events.APIGatewayProxyResponse{StatusCode: 200, Headers: headers}, nil
	}
	if request.HTTPMethod != "GET" {
		return events.APIGatewayProxyResponse{StatusCode: 405, Headers: headers, Body: `{"error":"Method not allowed"}`}, nil
	}

	articles, err := GetNewsletter()
	resp := ServerResponse{Result: articles}
	if err != nil {
		resp = ServerResponse{Error: err.Error()}
	}

	body, _ := json.Marshal(resp)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Headers:    headers,
		Body:       string(body),
	}, nil
}

func main() {
	lambda.Start(handler)
}