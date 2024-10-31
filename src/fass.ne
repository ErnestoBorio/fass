program -> line:+
line -> ( TAB:+ statement:?):? EOL # final statement without EOL not needed?
statement -> 

EOL -> "\n"
TAB -> "\t"
_ -> " ":*
