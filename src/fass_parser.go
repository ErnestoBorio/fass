// Code generated from /Users/petruza/Source/fass//src/fass.g4 by ANTLR 4.8. DO NOT EDIT.

package parser // fass

import (
	"fmt"
	"reflect"
	"strconv"

	"github.com/antlr/antlr4/runtime/Go/antlr"
)

// Suppress unused import errors
var _ = fmt.Printf
var _ = reflect.Copy
var _ = strconv.Itoa

var parserATN = []uint16{
	3, 24715, 42794, 33075, 47597, 16764, 15335, 30598, 22884, 3, 8, 42, 4,
	2, 9, 2, 4, 3, 9, 3, 4, 4, 9, 4, 4, 5, 9, 5, 4, 6, 9, 6, 4, 7, 9, 7, 3,
	2, 5, 2, 16, 10, 2, 3, 2, 7, 2, 19, 10, 2, 12, 2, 14, 2, 22, 11, 2, 3,
	2, 5, 2, 25, 10, 2, 3, 2, 3, 2, 3, 3, 3, 3, 3, 4, 3, 4, 5, 4, 33, 10, 4,
	3, 5, 3, 5, 3, 5, 3, 6, 3, 6, 3, 7, 3, 7, 3, 7, 2, 2, 8, 2, 4, 6, 8, 10,
	12, 2, 2, 2, 39, 2, 20, 3, 2, 2, 2, 4, 28, 3, 2, 2, 2, 6, 32, 3, 2, 2,
	2, 8, 34, 3, 2, 2, 2, 10, 37, 3, 2, 2, 2, 12, 39, 3, 2, 2, 2, 14, 16, 5,
	4, 3, 2, 15, 14, 3, 2, 2, 2, 15, 16, 3, 2, 2, 2, 16, 17, 3, 2, 2, 2, 17,
	19, 7, 5, 2, 2, 18, 15, 3, 2, 2, 2, 19, 22, 3, 2, 2, 2, 20, 18, 3, 2, 2,
	2, 20, 21, 3, 2, 2, 2, 21, 24, 3, 2, 2, 2, 22, 20, 3, 2, 2, 2, 23, 25,
	5, 4, 3, 2, 24, 23, 3, 2, 2, 2, 24, 25, 3, 2, 2, 2, 25, 26, 3, 2, 2, 2,
	26, 27, 7, 2, 2, 3, 27, 3, 3, 2, 2, 2, 28, 29, 5, 8, 5, 2, 29, 5, 3, 2,
	2, 2, 30, 33, 5, 10, 6, 2, 31, 33, 5, 12, 7, 2, 32, 30, 3, 2, 2, 2, 32,
	31, 3, 2, 2, 2, 33, 7, 3, 2, 2, 2, 34, 35, 7, 6, 2, 2, 35, 36, 5, 6, 4,
	2, 36, 9, 3, 2, 2, 2, 37, 38, 7, 7, 2, 2, 38, 11, 3, 2, 2, 2, 39, 40, 7,
	8, 2, 2, 40, 13, 3, 2, 2, 2, 6, 15, 20, 24, 32,
}
var deserializer = antlr.NewATNDeserializer(nil)
var deserializedATN = deserializer.DeserializeFromUInt16(parserATN)

var literalNames []string

var symbolicNames = []string{
	"", "IDENTIFIER", "WHITESPACE", "EOL", "ADDRESS_KWD", "HEX", "DEC",
}

var ruleNames = []string{
	"program", "statement", "address", "address_stmt", "hex", "dec",
}
var decisionToDFA = make([]*antlr.DFA, len(deserializedATN.DecisionToState))

func init() {
	for index, ds := range deserializedATN.DecisionToState {
		decisionToDFA[index] = antlr.NewDFA(ds, index)
	}
}

type fassParser struct {
	*antlr.BaseParser
}

func NewfassParser(input antlr.TokenStream) *fassParser {
	this := new(fassParser)

	this.BaseParser = antlr.NewBaseParser(input)

	this.Interpreter = antlr.NewParserATNSimulator(this, deserializedATN, decisionToDFA, antlr.NewPredictionContextCache())
	this.RuleNames = ruleNames
	this.LiteralNames = literalNames
	this.SymbolicNames = symbolicNames
	this.GrammarFileName = "fass.g4"

	return this
}

// fassParser tokens.
const (
	fassParserEOF         = antlr.TokenEOF
	fassParserIDENTIFIER  = 1
	fassParserWHITESPACE  = 2
	fassParserEOL         = 3
	fassParserADDRESS_KWD = 4
	fassParserHEX         = 5
	fassParserDEC         = 6
)

// fassParser rules.
const (
	fassParserRULE_program      = 0
	fassParserRULE_statement    = 1
	fassParserRULE_address      = 2
	fassParserRULE_address_stmt = 3
	fassParserRULE_hex          = 4
	fassParserRULE_dec          = 5
)

// IProgramContext is an interface to support dynamic dispatch.
type IProgramContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsProgramContext differentiates from other interfaces.
	IsProgramContext()
}

type ProgramContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyProgramContext() *ProgramContext {
	var p = new(ProgramContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_program
	return p
}

func (*ProgramContext) IsProgramContext() {}

func NewProgramContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *ProgramContext {
	var p = new(ProgramContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_program

	return p
}

func (s *ProgramContext) GetParser() antlr.Parser { return s.parser }

func (s *ProgramContext) EOF() antlr.TerminalNode {
	return s.GetToken(fassParserEOF, 0)
}

func (s *ProgramContext) AllEOL() []antlr.TerminalNode {
	return s.GetTokens(fassParserEOL)
}

func (s *ProgramContext) EOL(i int) antlr.TerminalNode {
	return s.GetToken(fassParserEOL, i)
}

func (s *ProgramContext) AllStatement() []IStatementContext {
	var ts = s.GetTypedRuleContexts(reflect.TypeOf((*IStatementContext)(nil)).Elem())
	var tst = make([]IStatementContext, len(ts))

	for i, t := range ts {
		if t != nil {
			tst[i] = t.(IStatementContext)
		}
	}

	return tst
}

func (s *ProgramContext) Statement(i int) IStatementContext {
	var t = s.GetTypedRuleContext(reflect.TypeOf((*IStatementContext)(nil)).Elem(), i)

	if t == nil {
		return nil
	}

	return t.(IStatementContext)
}

func (s *ProgramContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *ProgramContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

func (s *ProgramContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterProgram(s)
	}
}

func (s *ProgramContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitProgram(s)
	}
}

func (p *fassParser) Program() (localctx IProgramContext) {
	localctx = NewProgramContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 0, fassParserRULE_program)
	var _la int

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	var _alt int

	p.EnterOuterAlt(localctx, 1)
	p.SetState(18)
	p.GetErrorHandler().Sync(p)
	_alt = p.GetInterpreter().AdaptivePredict(p.GetTokenStream(), 1, p.GetParserRuleContext())

	for _alt != 2 && _alt != antlr.ATNInvalidAltNumber {
		if _alt == 1 {
			p.SetState(13)
			p.GetErrorHandler().Sync(p)
			_la = p.GetTokenStream().LA(1)

			if _la == fassParserADDRESS_KWD {
				{
					p.SetState(12)
					p.Statement()
				}

			}
			{
				p.SetState(15)
				p.Match(fassParserEOL)
			}

		}
		p.SetState(20)
		p.GetErrorHandler().Sync(p)
		_alt = p.GetInterpreter().AdaptivePredict(p.GetTokenStream(), 1, p.GetParserRuleContext())
	}
	p.SetState(22)
	p.GetErrorHandler().Sync(p)
	_la = p.GetTokenStream().LA(1)

	if _la == fassParserADDRESS_KWD {
		{
			p.SetState(21)
			p.Statement()
		}

	}
	{
		p.SetState(24)
		p.Match(fassParserEOF)
	}

	return localctx
}

// IStatementContext is an interface to support dynamic dispatch.
type IStatementContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsStatementContext differentiates from other interfaces.
	IsStatementContext()
}

type StatementContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyStatementContext() *StatementContext {
	var p = new(StatementContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_statement
	return p
}

func (*StatementContext) IsStatementContext() {}

func NewStatementContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *StatementContext {
	var p = new(StatementContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_statement

	return p
}

func (s *StatementContext) GetParser() antlr.Parser { return s.parser }

func (s *StatementContext) Address_stmt() IAddress_stmtContext {
	var t = s.GetTypedRuleContext(reflect.TypeOf((*IAddress_stmtContext)(nil)).Elem(), 0)

	if t == nil {
		return nil
	}

	return t.(IAddress_stmtContext)
}

func (s *StatementContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *StatementContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

func (s *StatementContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterStatement(s)
	}
}

func (s *StatementContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitStatement(s)
	}
}

func (p *fassParser) Statement() (localctx IStatementContext) {
	localctx = NewStatementContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 2, fassParserRULE_statement)

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	p.EnterOuterAlt(localctx, 1)
	{
		p.SetState(26)
		p.Address_stmt()
	}

	return localctx
}

// IAddressContext is an interface to support dynamic dispatch.
type IAddressContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsAddressContext differentiates from other interfaces.
	IsAddressContext()
}

type AddressContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyAddressContext() *AddressContext {
	var p = new(AddressContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_address
	return p
}

func (*AddressContext) IsAddressContext() {}

func NewAddressContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *AddressContext {
	var p = new(AddressContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_address

	return p
}

func (s *AddressContext) GetParser() antlr.Parser { return s.parser }

func (s *AddressContext) CopyFrom(ctx *AddressContext) {
	s.BaseParserRuleContext.CopyFrom(ctx.BaseParserRuleContext)
}

func (s *AddressContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *AddressContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

type Address_decContext struct {
	*AddressContext
}

func NewAddress_decContext(parser antlr.Parser, ctx antlr.ParserRuleContext) *Address_decContext {
	var p = new(Address_decContext)

	p.AddressContext = NewEmptyAddressContext()
	p.parser = parser
	p.CopyFrom(ctx.(*AddressContext))

	return p
}

func (s *Address_decContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *Address_decContext) Dec() IDecContext {
	var t = s.GetTypedRuleContext(reflect.TypeOf((*IDecContext)(nil)).Elem(), 0)

	if t == nil {
		return nil
	}

	return t.(IDecContext)
}

func (s *Address_decContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterAddress_dec(s)
	}
}

func (s *Address_decContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitAddress_dec(s)
	}
}

type Address_hexContext struct {
	*AddressContext
}

func NewAddress_hexContext(parser antlr.Parser, ctx antlr.ParserRuleContext) *Address_hexContext {
	var p = new(Address_hexContext)

	p.AddressContext = NewEmptyAddressContext()
	p.parser = parser
	p.CopyFrom(ctx.(*AddressContext))

	return p
}

func (s *Address_hexContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *Address_hexContext) Hex() IHexContext {
	var t = s.GetTypedRuleContext(reflect.TypeOf((*IHexContext)(nil)).Elem(), 0)

	if t == nil {
		return nil
	}

	return t.(IHexContext)
}

func (s *Address_hexContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterAddress_hex(s)
	}
}

func (s *Address_hexContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitAddress_hex(s)
	}
}

func (p *fassParser) Address() (localctx IAddressContext) {
	localctx = NewAddressContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 4, fassParserRULE_address)

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	p.SetState(30)
	p.GetErrorHandler().Sync(p)

	switch p.GetTokenStream().LA(1) {
	case fassParserHEX:
		localctx = NewAddress_hexContext(p, localctx)
		p.EnterOuterAlt(localctx, 1)
		{
			p.SetState(28)
			p.Hex()
		}

	case fassParserDEC:
		localctx = NewAddress_decContext(p, localctx)
		p.EnterOuterAlt(localctx, 2)
		{
			p.SetState(29)
			p.Dec()
		}

	default:
		panic(antlr.NewNoViableAltException(p, nil, nil, nil, nil, nil))
	}

	return localctx
}

// IAddress_stmtContext is an interface to support dynamic dispatch.
type IAddress_stmtContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsAddress_stmtContext differentiates from other interfaces.
	IsAddress_stmtContext()
}

type Address_stmtContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyAddress_stmtContext() *Address_stmtContext {
	var p = new(Address_stmtContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_address_stmt
	return p
}

func (*Address_stmtContext) IsAddress_stmtContext() {}

func NewAddress_stmtContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *Address_stmtContext {
	var p = new(Address_stmtContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_address_stmt

	return p
}

func (s *Address_stmtContext) GetParser() antlr.Parser { return s.parser }

func (s *Address_stmtContext) ADDRESS_KWD() antlr.TerminalNode {
	return s.GetToken(fassParserADDRESS_KWD, 0)
}

func (s *Address_stmtContext) Address() IAddressContext {
	var t = s.GetTypedRuleContext(reflect.TypeOf((*IAddressContext)(nil)).Elem(), 0)

	if t == nil {
		return nil
	}

	return t.(IAddressContext)
}

func (s *Address_stmtContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *Address_stmtContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

func (s *Address_stmtContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterAddress_stmt(s)
	}
}

func (s *Address_stmtContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitAddress_stmt(s)
	}
}

func (p *fassParser) Address_stmt() (localctx IAddress_stmtContext) {
	localctx = NewAddress_stmtContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 6, fassParserRULE_address_stmt)

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	p.EnterOuterAlt(localctx, 1)
	{
		p.SetState(32)
		p.Match(fassParserADDRESS_KWD)
	}
	{
		p.SetState(33)
		p.Address()
	}

	return localctx
}

// IHexContext is an interface to support dynamic dispatch.
type IHexContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsHexContext differentiates from other interfaces.
	IsHexContext()
}

type HexContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyHexContext() *HexContext {
	var p = new(HexContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_hex
	return p
}

func (*HexContext) IsHexContext() {}

func NewHexContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *HexContext {
	var p = new(HexContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_hex

	return p
}

func (s *HexContext) GetParser() antlr.Parser { return s.parser }

func (s *HexContext) HEX() antlr.TerminalNode {
	return s.GetToken(fassParserHEX, 0)
}

func (s *HexContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *HexContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

func (s *HexContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterHex(s)
	}
}

func (s *HexContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitHex(s)
	}
}

func (p *fassParser) Hex() (localctx IHexContext) {
	localctx = NewHexContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 8, fassParserRULE_hex)

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	p.EnterOuterAlt(localctx, 1)
	{
		p.SetState(35)
		p.Match(fassParserHEX)
	}

	return localctx
}

// IDecContext is an interface to support dynamic dispatch.
type IDecContext interface {
	antlr.ParserRuleContext

	// GetParser returns the parser.
	GetParser() antlr.Parser

	// IsDecContext differentiates from other interfaces.
	IsDecContext()
}

type DecContext struct {
	*antlr.BaseParserRuleContext
	parser antlr.Parser
}

func NewEmptyDecContext() *DecContext {
	var p = new(DecContext)
	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(nil, -1)
	p.RuleIndex = fassParserRULE_dec
	return p
}

func (*DecContext) IsDecContext() {}

func NewDecContext(parser antlr.Parser, parent antlr.ParserRuleContext, invokingState int) *DecContext {
	var p = new(DecContext)

	p.BaseParserRuleContext = antlr.NewBaseParserRuleContext(parent, invokingState)

	p.parser = parser
	p.RuleIndex = fassParserRULE_dec

	return p
}

func (s *DecContext) GetParser() antlr.Parser { return s.parser }

func (s *DecContext) DEC() antlr.TerminalNode {
	return s.GetToken(fassParserDEC, 0)
}

func (s *DecContext) GetRuleContext() antlr.RuleContext {
	return s
}

func (s *DecContext) ToStringTree(ruleNames []string, recog antlr.Recognizer) string {
	return antlr.TreesStringTree(s, ruleNames, recog)
}

func (s *DecContext) EnterRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.EnterDec(s)
	}
}

func (s *DecContext) ExitRule(listener antlr.ParseTreeListener) {
	if listenerT, ok := listener.(fassListener); ok {
		listenerT.ExitDec(s)
	}
}

func (p *fassParser) Dec() (localctx IDecContext) {
	localctx = NewDecContext(p, p.GetParserRuleContext(), p.GetState())
	p.EnterRule(localctx, 10, fassParserRULE_dec)

	defer func() {
		p.ExitRule()
	}()

	defer func() {
		if err := recover(); err != nil {
			if v, ok := err.(antlr.RecognitionException); ok {
				localctx.SetException(v)
				p.GetErrorHandler().ReportError(p, v)
				p.GetErrorHandler().Recover(p, v)
			} else {
				panic(err)
			}
		}
	}()

	p.EnterOuterAlt(localctx, 1)
	{
		p.SetState(37)
		p.Match(fassParserDEC)
	}

	return localctx
}
