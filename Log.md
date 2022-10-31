# Implemented

~~address_stmt~~
~~label~~
~~remote_label_stmt~~  
~~filler_stmt~~  
~~data_stmt~~  
~~const_stmt~~  
~~flag_set_stmt~~  
~~stack_stmt~~  
~~goto_stmt~~  
gosub_stmt  
return_stmt  
bit_shift_stmt  
logic_stmt  
compare_stmt  
bittest_stmt  
assign_stmt  
arithmetic_stmt

# To do

- Add tests for `if else`, `data`
- Add keywords `bit7` & `bit6`?. See [ref](##2022-8-5)
- Integrate with Cpu6502 and make automated VM tests?
- Add testing on commit.

---

## 2022-10-31
Implemented goto (JMP)
For a good test for goto, correct byte filling has to be implemented.

## 2022-10-22

I implemented an `if else` fully functional, even nestable. Great achievement!

## 2022-10-1

Well, I forked a try to use visitors and the Dart language, let's see how this goes.
Update: both seem like a very good idea.

## 2022-8-20

Started implementing automated tests.
Removed the grammar that was unimplemented, now I will add it as I go.

## 2022-8-15

Just found out `const` is failing and don't know when it started failing.
Should add unit tests for regression testing, so by running all tests on every commit I can spot regression errors easily.

## 2022-8-5

Should add the keywords `bit7` & `bit6`.
In assembly you would check for these bits using `BVC`, `BVS`, `BPL` & `BMI`, most likely after `BIT` & `CMP`.
To explicitly state that you aren't really checking for sign or overflow as the mnemonics suggest, you would use `if bit7 = 1`, etc.
That way you explicitly state that you are checking for arbitrary bits.
Of course the rest of the bits (0..5) don't have a corresponding CPU flag, so they must be tested with a more classical approach.

## 2022-4-6

const and data are implemented, although some value types are not implemented yet.  
Will implement all value types as they come up in tests or use cases.
