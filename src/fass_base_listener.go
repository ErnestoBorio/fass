// Code generated from /Users/petruza/Source/fass//src/fass.g4 by ANTLR 4.8. DO NOT EDIT.

package parser // fass

import "github.com/antlr/antlr4/runtime/Go/antlr"

// BasefassListener is a complete listener for a parse tree produced by fassParser.
type BasefassListener struct{}

var _ fassListener = &BasefassListener{}

// VisitTerminal is called when a terminal node is visited.
func (s *BasefassListener) VisitTerminal(node antlr.TerminalNode) {}

// VisitErrorNode is called when an error node is visited.
func (s *BasefassListener) VisitErrorNode(node antlr.ErrorNode) {}

// EnterEveryRule is called when any rule is entered.
func (s *BasefassListener) EnterEveryRule(ctx antlr.ParserRuleContext) {}

// ExitEveryRule is called when any rule is exited.
func (s *BasefassListener) ExitEveryRule(ctx antlr.ParserRuleContext) {}

// EnterProgram is called when production program is entered.
func (s *BasefassListener) EnterProgram(ctx *ProgramContext) {}

// ExitProgram is called when production program is exited.
func (s *BasefassListener) ExitProgram(ctx *ProgramContext) {}

// EnterStatement is called when production statement is entered.
func (s *BasefassListener) EnterStatement(ctx *StatementContext) {}

// ExitStatement is called when production statement is exited.
func (s *BasefassListener) ExitStatement(ctx *StatementContext) {}

// EnterAddress_hex is called when production address_hex is entered.
func (s *BasefassListener) EnterAddress_hex(ctx *Address_hexContext) {}

// ExitAddress_hex is called when production address_hex is exited.
func (s *BasefassListener) ExitAddress_hex(ctx *Address_hexContext) {}

// EnterAddress_dec is called when production address_dec is entered.
func (s *BasefassListener) EnterAddress_dec(ctx *Address_decContext) {}

// ExitAddress_dec is called when production address_dec is exited.
func (s *BasefassListener) ExitAddress_dec(ctx *Address_decContext) {}

// EnterAddress_stmt is called when production address_stmt is entered.
func (s *BasefassListener) EnterAddress_stmt(ctx *Address_stmtContext) {}

// ExitAddress_stmt is called when production address_stmt is exited.
func (s *BasefassListener) ExitAddress_stmt(ctx *Address_stmtContext) {}

// EnterHex is called when production hex is entered.
func (s *BasefassListener) EnterHex(ctx *HexContext) {}

// ExitHex is called when production hex is exited.
func (s *BasefassListener) ExitHex(ctx *HexContext) {}

// EnterDec is called when production dec is entered.
func (s *BasefassListener) EnterDec(ctx *DecContext) {}

// ExitDec is called when production dec is exited.
func (s *BasefassListener) ExitDec(ctx *DecContext) {}
