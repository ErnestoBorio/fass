
from sys import argv, stdout
from antlr4 import *
from fassLexer import fassLexer
from fassParser import fassParser
from myParser import myParser

def main(argv):
	if len(argv) <= 1:
		print("Usage: py fass.py source_file.fass binary_file.prg")
		exit()
	
	input = FileStream(argv[1])
	
	lexer = fassLexer( input)
	tokenStream = CommonTokenStream( lexer)
	tree = myParser( tokenStream).program()
	# listener = myListener()
	# ParseTreeWalker().walk( listener, tree )

	# WIP TODO: implement argparse
	if len(argv) >= 3:
		out = open( argv[2], "wb" )
		out.write( tree.get_output() )
		out.close()

if __name__ == '__main__':
	main(argv)