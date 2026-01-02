// scraper.go
package main

import (
	"encoding/json"
	"strings"
	"fmt"
	"net/http"
	"time"

	"github.com/PuerkitoBio/goquery"
)


func GetNewsletter(url string) ([]Section, error) {
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

	// Grab each <section> element
	var sections []Section
	doc.Find("section").Each(func(k int, sect_sel *goquery.Selection) {
		// Get section heading
		header := sect_sel.Find("header").First()
		sect_emoji := header.Find("div").First().Text()
		sect_title := header.Find("h3").First().Text()
		Info("Section Title: %q", sect_title)

		// Grab each <article> element
		var articles []Article
		sect_sel.Find("article").Each(func(i int, sel *goquery.Selection) {
			link := sel.Find("a").First().AttrOr("href", "")
			if link != "" {
				Info("Article link: %s", link)
			}
			title := sel.Find("h1, h2, h3").First().Text()

			newsletterDiv := sel.Find("div.newsletter-html")
			text := newsletterDiv.Text()
			htmlContent, _ := newsletterDiv.Html()
			if title == "" && text == "" {
				return
			}

			articles = append(articles, Article{
				Title:       title,
				Link:        link,
				Text:        text,
				HtmlContent: htmlContent,
			})
		})

		// Section must contain articles
		if len(articles) > 0 {
			sections = append(sections, Section{
				Title:    strings.TrimSpace(sect_title),
				Emoji:    strings.TrimSpace(sect_emoji),
				Articles: articles,
			})
		}
	})
	return sections, nil
}

func htmlToJSONString(html string) (string, error) {
	// Marshal the HTML string as JSON
	jsonBytes, err := json.Marshal(html)
	if err != nil {
		return "", err
	}
	return string(jsonBytes), nil
}
