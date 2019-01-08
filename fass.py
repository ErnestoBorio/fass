
import sys
from antlr4 import *
from fassLexer import fassLexer
from fassParser import fassParser
from fassCompiler import fassCompiler
from pprint import pprint

def main(argv):
	input = FileStream(argv[1])
	
	tree = fassParser( 
		CommonTokenStream(
			fassLexer(input))).program()

	ParseTreeWalker().walk(
		fassCompiler(), tree )


if __name__ == '__main__':
	main(sys.argv)