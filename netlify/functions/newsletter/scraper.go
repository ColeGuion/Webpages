// scraper.go
package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
)

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

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

func fetchTLDR() ([]map[string]string, error) {
	url := "https://tldr.tech/ai/2025-12-08"

	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	resp, err := client.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch TLDR page: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("non-200 status code: %d", resp.StatusCode)
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("parse error: %w", err)
	}

	var elements []map[string]string

	// extract headings + paragraphs
	doc.Find("h1, h2, h3, p").Each(func(i int, sel *goquery.Selection) {
		text := sel.Text()
		tag := goquery.NodeName(sel)

		if text != "" {
			elements = append(elements, map[string]string{
				"tag":  tag,
				"text": text,
			})
		}
	})

	return elements, nil
}

func handleTldr(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	data, err := fetchTLDR()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	jsonStr := "["

	for i, item := range data {
		jsonStr += fmt.Sprintf(
			`{"tag":"%s","text":%q}`,
			item["tag"], item["text"],
		)
		if i < len(data)-1 {
			jsonStr += ","
		}
	}

	jsonStr += "]"
	w.Write([]byte(jsonStr))
}
