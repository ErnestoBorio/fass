// Code generated from /Users/petruza/Source/fass//src/fass.g4 by ANTLR 4.8. DO NOT EDIT.

package parser

import (
	"fmt"
	"unicode"

	"github.com/antlr/antlr4/runtime/Go/antlr"
)

// Suppress unused import error
var _ = fmt.Printf
var _ = unicode.IsLetter

var serializedLexerAtn = []uint16{
	3, 24715, 42794, 33075, 47597, 16764, 15335, 30598, 22884, 2, 8, 53, 8,
	1, 4, 2, 9, 2, 4, 3, 9, 3, 4, 4, 9, 4, 4, 5, 9, 5, 4, 6, 9, 6, 4, 7, 9,
	7, 3, 2, 3, 2, 7, 2, 18, 10, 2, 12, 2, 14, 2, 21, 11, 2, 3, 3, 6, 3, 24,
	10, 3, 13, 3, 14, 3, 25, 3, 3, 3, 3, 3, 4, 5, 4, 31, 10, 4, 3, 4, 3, 4,
	3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 3, 5, 3, 6, 3, 6, 6, 6, 45, 10,
	6, 13, 6, 14, 6, 46, 3, 7, 6, 7, 50, 10, 7, 13, 7, 14, 7, 51, 2, 2, 8,
	3, 3, 5, 4, 7, 5, 9, 6, 11, 7, 13, 8, 3, 2, 12, 5, 2, 67, 92, 97, 97, 99,
	124, 7, 2, 48, 48, 50, 59, 67, 92, 97, 97, 99, 124, 4, 2, 11, 11, 34, 34,
	4, 2, 67, 67, 99, 99, 4, 2, 70, 70, 102, 102, 4, 2, 84, 84, 116, 116, 4,
	2, 71, 71, 103, 103, 4, 2, 85, 85, 117, 117, 5, 2, 50, 59, 67, 72, 99,
	104, 3, 2, 50, 59, 2, 57, 2, 3, 3, 2, 2, 2, 2, 5, 3, 2, 2, 2, 2, 7, 3,
	2, 2, 2, 2, 9, 3, 2, 2, 2, 2, 11, 3, 2, 2, 2, 2, 13, 3, 2, 2, 2, 3, 15,
	3, 2, 2, 2, 5, 23, 3, 2, 2, 2, 7, 30, 3, 2, 2, 2, 9, 34, 3, 2, 2, 2, 11,
	42, 3, 2, 2, 2, 13, 49, 3, 2, 2, 2, 15, 19, 9, 2, 2, 2, 16, 18, 9, 3, 2,
	2, 17, 16, 3, 2, 2, 2, 18, 21, 3, 2, 2, 2, 19, 17, 3, 2, 2, 2, 19, 20,
	3, 2, 2, 2, 20, 4, 3, 2, 2, 2, 21, 19, 3, 2, 2, 2, 22, 24, 9, 4, 2, 2,
	23, 22, 3, 2, 2, 2, 24, 25, 3, 2, 2, 2, 25, 23, 3, 2, 2, 2, 25, 26, 3,
	2, 2, 2, 26, 27, 3, 2, 2, 2, 27, 28, 8, 3, 2, 2, 28, 6, 3, 2, 2, 2, 29,
	31, 7, 15, 2, 2, 30, 29, 3, 2, 2, 2, 30, 31, 3, 2, 2, 2, 31, 32, 3, 2,
	2, 2, 32, 33, 7, 12, 2, 2, 33, 8, 3, 2, 2, 2, 34, 35, 9, 5, 2, 2, 35, 36,
	9, 6, 2, 2, 36, 37, 9, 6, 2, 2, 37, 38, 9, 7, 2, 2, 38, 39, 9, 8, 2, 2,
	39, 40, 9, 9, 2, 2, 40, 41, 9, 9, 2, 2, 41, 10, 3, 2, 2, 2, 42, 44, 7,
	38, 2, 2, 43, 45, 9, 10, 2, 2, 44, 43, 3, 2, 2, 2, 45, 46, 3, 2, 2, 2,
	46, 44, 3, 2, 2, 2, 46, 47, 3, 2, 2, 2, 47, 12, 3, 2, 2, 2, 48, 50, 9,
	11, 2, 2, 49, 48, 3, 2, 2, 2, 50, 51, 3, 2, 2, 2, 51, 49, 3, 2, 2, 2, 51,
	52, 3, 2, 2, 2, 52, 14, 3, 2, 2, 2, 8, 2, 19, 25, 30, 46, 51, 3, 8, 2,
	2,
}

var lexerDeserializer = antlr.NewATNDeserializer(nil)
var lexerAtn = lexerDeserializer.DeserializeFromUInt16(serializedLexerAtn)

var lexerChannelNames = []string{
	"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
}

var lexerModeNames = []string{
	"DEFAULT_MODE",
}

var lexerLiteralNames []string

var lexerSymbolicNames = []string{
	"", "IDENTIFIER", "WHITESPACE", "EOL", "ADDRESS_KWD", "HEX", "DEC",
}

var lexerRuleNames = []string{
	"IDENTIFIER", "WHITESPACE", "EOL", "ADDRESS_KWD", "HEX", "DEC",
}

type fassLexer struct {
	*antlr.BaseLexer
	channelNames []string
	modeNames    []string
	// TODO: EOF string
}

var lexerDecisionToDFA = make([]*antlr.DFA, len(lexerAtn.DecisionToState))

func init() {
	for index, ds := range lexerAtn.DecisionToState {
		lexerDecisionToDFA[index] = antlr.NewDFA(ds, index)
	}
}

func NewfassLexer(input antlr.CharStream) *fassLexer {

	l := new(fassLexer)

	l.BaseLexer = antlr.NewBaseLexer(input)
	l.Interpreter = antlr.NewLexerATNSimulator(l, lexerAtn, lexerDecisionToDFA, antlr.NewPredictionContextCache())

	l.channelNames = lexerChannelNames
	l.modeNames = lexerModeNames
	l.RuleNames = lexerRuleNames
	l.LiteralNames = lexerLiteralNames
	l.SymbolicNames = lexerSymbolicNames
	l.GrammarFileName = "fass.g4"
	// TODO: l.EOF = antlr.TokenEOF

	return l
}

// fassLexer tokens.
const (
	fassLexerIDENTIFIER  = 1
	fassLexerWHITESPACE  = 2
	fassLexerEOL         = 3
	fassLexerADDRESS_KWD = 4
	fassLexerHEX         = 5
	fassLexerDEC         = 6
)
