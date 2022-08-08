# fass: Friendly Assembler
A more human-readable assembler for the 6502 processor.  
  
The spirit of `fass` is to be as similar as 6502 assembly as possible, but more readable.  
In that sense, all fass statements should:
* Be very explicit and obvious about what machine language instruction they produce
* One fass statement equals to exactly one ML instruction (1:1 relationship)
	* A statement that violates this rule has to make it very explicit, E.G. `label = A = 1` translates to `LDA #1` + `STA label` to avoid having pairs of _load and storage_ statements everywhere.  
* Be deterministic and non ambiguous. Every statement produces always the same output and doesn't depend on anything other than the statement itself.
* Whenever possible, there should be only one way of expressing something.
* Be as obvious and explicit as possible to clearly convey its meaning, but not overly verbose.
