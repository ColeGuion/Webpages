// scraper.go
package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func GetNewsletter() ([]Article, error) {
	url := "https://tldr.tech/ai/2025-12-08"

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

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

	// Grab each <article> element
	doc.Find("article").Each(func(i int, sel *goquery.Selection) {
		title := sel.Find("h1, h2, h3").First().Text()
		//text := sel.Find("p").Text()

		newsletterDiv := sel.Find("div.newsletter-html")
		//newsletterHTML, err := newsletterDiv.Html()
		//if err == nil && newsletterHTML != "" {
		//	text += "\n" + newsletterHTML
		//}
		text := newsletterDiv.Text()

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
