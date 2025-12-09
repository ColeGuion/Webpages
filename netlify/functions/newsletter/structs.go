// structs.go
package main

type Article struct {
    Title string `json:"title"`
    Text  string `json:"text"`
}

// ServerResponse structure for what we return to JavaScript
type ServerResponse struct {
    Result []Article `json:"result,omitempty"`
    Error  string    `json:"error,omitempty"`
}
