
from sys import argv, stdout
from antlr4 import *
from fassLexer import fassLexer
from fassParser import fassParser
from fassErrorListener import fassErrorListener
from myListener import myListener
from fass import Fass
from petruza.misc import nicehex

def main(argv):
	if len(argv) <= 1:
		print("Usage: py fass.py source_file.fass compiled_file")
		exit()
	
	input = FileStream(argv[1])
	print( input.strdata ) # WIP TODO For debugging only

	lexer = fassLexer( input)
	tokenStream = CommonTokenStream( lexer)
	parser = fassParser(tokenStream)
	parser.addErrorListener( fassErrorListener())
	tree = parser.program()
	fass = Fass()
	listener = myListener(fass)
	ParseTreeWalker().walk( listener, tree )
	
	print( "compiled: ", nicehex( fass.get_output(), '.' )) # WIP TODO Debug only
	
	# WIP TODO: implement argparse
	if len(argv) >= 3:
		out = open(argv[2], "wb")
		out.write(fass.get_output())
		out.close()

if __name__ == '__main__':
	main(argv)