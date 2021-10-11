from fassLexer import fassLexer
from antlr4.error.ErrorListener import ErrorListener

class fassErrorListener( ErrorListener):
	def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
		for token in fassLexer.ruleNames:
			if hasattr(fassLexer,token) and getattr(fassLexer,token) == offendingSymbol.type:
				print( f"Erroneous token: {token} = {offendingSymbol.text}")
				return