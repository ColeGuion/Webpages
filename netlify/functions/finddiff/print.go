// Package print logs messages to stdout based on current debug log level.
package main

import (
	"fmt"
	"log"
	"os"

)

// These are the supported print levels
const (
	LevelError = iota
	LevelWarn
	LevelInfo
	LevelDebug
)

// logLevel controls what will print
// Logging debug level: 0 Errors, 1 Warnings, 2 Information, 3 Debug
var logLevel = 3

// Standard logger instance
//var std = log.New(os.Stderr, "", log.Lshortfile)
var std = log.New(os.Stdout, "FD: ", log.Lshortfile)

// SetLevel changes the log level for the session
func SetLevel(level int) {
	logLevel = level
}

// Fatal prints an error message and then quits
func Fatal(format string, v ...interface{}) {
	if logLevel >= LevelError {
		std.Output(2, fmt.Sprintf(format, v...))
	}
	os.Exit(1)
}

// Error prints an error message
func Error(format string, v ...interface{}) {
	if logLevel >= LevelError {
		std.Output(2, fmt.Sprintf(format, v...))
	}
}

// Warning prints a warning message
func Warning(format string, v ...interface{}) {
	if logLevel >= LevelWarn {
		std.Output(2, fmt.Sprintf(format, v...))
	}
}

// Info prints an information message
func Info(format string, v ...interface{}) {
	if logLevel >= LevelInfo {
		std.Output(2, fmt.Sprintf(format, v...))
	}
}

// Debug prints a debugging message
func Debug(format string, v ...interface{}) {
	if logLevel >= LevelDebug {
		std.Output(2, fmt.Sprintf(format, v...))
	}
}
