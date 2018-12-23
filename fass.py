
import sys
from antlr4 import *
from fassLexer import fassLexer
from fassParser import fassParser
from fassListener import fassListener
from pprint import pprint

def main(argv):
	input = FileStream(argv[1])
	# lexer = fassLexer(input)
	# stream = CommonTokenStream(lexer)
	# parser = fassParser(stream)
	# tree = parser.program()
	
	# fass = fassCompiler()
	# walker = ParseTreeWalker()
	# walker.walk(fass, tree)
	
	tree = fassParser( 
		CommonTokenStream(
			fassLexer(input))).program()

	ParseTreeWalker().walk(
		fassCompiler(), tree )

class fassCompiler(fassListener) :

	def enterProgram(self, ctx:fassParser.ProgramContext):
		pass

	def exitProgram(self, ctx:fassParser.ProgramContext):
		pass

	def enterStatement(self, ctx:fassParser.StatementContext):
		pass

	def enterLine_statement(self, ctx:fassParser.Line_statementContext):
		pass

	def enterAddress_statement(self, ctx:fassParser.Address_statementContext):
		pass


if __name__ == '__main__':
	main(sys.argv)