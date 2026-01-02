// structs.go
package main

// Request structure matches what we send from JavaScript
type Request struct {
	String1 string `json:"string1"`
	String2 string `json:"string2"`
}

// ServerResponse structure for what we return to JavaScript
type ServerResponse struct {
	Result []Response `json:"result"`
	Error  string     `json:"error,omitempty"`
}

type NewsletterRequest struct {
	Url string `json:"url"`
}

// ServerResponse structure for what we return to JavaScript
type NewsletterResponse struct {
	Result []Section `json:"result,omitempty"`
	Error  string    `json:"error,omitempty"`
}

type Misspell struct {
	Index       int      // The index of the misspelled word in the text
	Length      int      // The length of the misspelled word
	Type        string   // The type of error
	Suggestions []string // Suggested word replacements
}

type Response struct {
	Index   int    `json:"index"`
	Length  int    `json:"length"`
	Message string `json:"message"`
	Type    string `json:"type"`
}


type Article struct {
	Title string `json:"title"`
	Link        string `json:"link,omitempty"`
	Text        string `json:"text"`
	HtmlContent string `json:"htmlContent,omitempty"` // Optional HTML content
}
type Section struct {
	Title    string    `json:"title"`
	Emoji    string    `json:"emoji"`
	Articles []Article `json:"articles"`
}
