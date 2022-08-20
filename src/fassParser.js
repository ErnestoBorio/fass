// Generated from /Users/petruza/Source/Drean64/fass/src/fass.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import fassListener from './fassListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003/\u0083\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0003\u0002\u0005\u0002,\n\u0002\u0003",
    "\u0002\u0007\u0002/\n\u0002\f\u0002\u000e\u00022\u000b\u0002\u0003\u0002",
    "\u0005\u00025\n\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0005\u0004C\n\u0004\u0005\u0004E\n\u0004\u0003",
    "\u0005\u0003\u0005\u0005\u0005I\n\u0005\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0005\bV\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\n\u0003\n\u0003\n\u0005\n`\n\n\u0006\nb\n\n\r\n\u000e\nc\u0003",
    "\u000b\u0003\u000b\u0005\u000bh\n\u000b\u0003\f\u0003\f\u0003\r\u0003",
    "\r\u0003\r\u0003\r\u0003\r\u0005\rq\n\r\u0003\u000e\u0003\u000e\u0003",
    "\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0014\u0003\u0014\u0003",
    "\u0015\u0003\u0015\u0003\u0015\u0002\u0002\u0016\u0002\u0004\u0006\b",
    "\n\f\u000e\u0010\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(\u0002",
    "\u0003\u0003\u0002\u000b\r\u0002\u0080\u00020\u0003\u0002\u0002\u0002",
    "\u00048\u0003\u0002\u0002\u0002\u0006D\u0003\u0002\u0002\u0002\bH\u0003",
    "\u0002\u0002\u0002\nJ\u0003\u0002\u0002\u0002\fM\u0003\u0002\u0002\u0002",
    "\u000eU\u0003\u0002\u0002\u0002\u0010W\u0003\u0002\u0002\u0002\u0012",
    "\\\u0003\u0002\u0002\u0002\u0014g\u0003\u0002\u0002\u0002\u0016i\u0003",
    "\u0002\u0002\u0002\u0018p\u0003\u0002\u0002\u0002\u001ar\u0003\u0002",
    "\u0002\u0002\u001ct\u0003\u0002\u0002\u0002\u001ev\u0003\u0002\u0002",
    "\u0002 x\u0003\u0002\u0002\u0002\"z\u0003\u0002\u0002\u0002$|\u0003",
    "\u0002\u0002\u0002&~\u0003\u0002\u0002\u0002(\u0080\u0003\u0002\u0002",
    "\u0002*,\u0005\u0006\u0004\u0002+*\u0003\u0002\u0002\u0002+,\u0003\u0002",
    "\u0002\u0002,-\u0003\u0002\u0002\u0002-/\u0007/\u0002\u0002.+\u0003",
    "\u0002\u0002\u0002/2\u0003\u0002\u0002\u00020.\u0003\u0002\u0002\u0002",
    "01\u0003\u0002\u0002\u000214\u0003\u0002\u0002\u000220\u0003\u0002\u0002",
    "\u000235\u0005\u0006\u0004\u000243\u0003\u0002\u0002\u000245\u0003\u0002",
    "\u0002\u000256\u0003\u0002\u0002\u000267\u0007\u0002\u0002\u00037\u0003",
    "\u0003\u0002\u0002\u000289\u0007-\u0002\u00029:\u0007\u0003\u0002\u0002",
    ":\u0005\u0003\u0002\u0002\u0002;E\u0005\n\u0006\u0002<E\u0005\f\u0007",
    "\u0002=E\u0005\u000e\b\u0002>E\u0005\u0010\t\u0002?E\u0005\u0012\n\u0002",
    "@B\u0005\u0004\u0003\u0002AC\u0005\u0006\u0004\u0002BA\u0003\u0002\u0002",
    "\u0002BC\u0003\u0002\u0002\u0002CE\u0003\u0002\u0002\u0002D;\u0003\u0002",
    "\u0002\u0002D<\u0003\u0002\u0002\u0002D=\u0003\u0002\u0002\u0002D>\u0003",
    "\u0002\u0002\u0002D?\u0003\u0002\u0002\u0002D@\u0003\u0002\u0002\u0002",
    "E\u0007\u0003\u0002\u0002\u0002FI\u0005\u001e\u0010\u0002GI\u0005\u001c",
    "\u000f\u0002HF\u0003\u0002\u0002\u0002HG\u0003\u0002\u0002\u0002I\t",
    "\u0003\u0002\u0002\u0002JK\u0007\u000e\u0002\u0002KL\u0005\b\u0005\u0002",
    "L\u000b\u0003\u0002\u0002\u0002MN\u0007-\u0002\u0002NO\u0007\u0004\u0002",
    "\u0002OP\u0005\b\u0005\u0002P\r\u0003\u0002\u0002\u0002QR\u0007\u000f",
    "\u0002\u0002RV\u0005\u0014\u000b\u0002ST\u0007\u000f\u0002\u0002TV\u0007",
    "\u0010\u0002\u0002UQ\u0003\u0002\u0002\u0002US\u0003\u0002\u0002\u0002",
    "V\u000f\u0003\u0002\u0002\u0002WX\u0007\u0012\u0002\u0002XY\u0007-\u0002",
    "\u0002YZ\u0007\u0005\u0002\u0002Z[\u0005\u0014\u000b\u0002[\u0011\u0003",
    "\u0002\u0002\u0002\\a\u0007\u0011\u0002\u0002]_\u0005\u0014\u000b\u0002",
    "^`\u0007\u0006\u0002\u0002_^\u0003\u0002\u0002\u0002_`\u0003\u0002\u0002",
    "\u0002`b\u0003\u0002\u0002\u0002a]\u0003\u0002\u0002\u0002bc\u0003\u0002",
    "\u0002\u0002ca\u0003\u0002\u0002\u0002cd\u0003\u0002\u0002\u0002d\u0013",
    "\u0003\u0002\u0002\u0002eh\u0005\u0018\r\u0002fh\u0005\u0016\f\u0002",
    "ge\u0003\u0002\u0002\u0002gf\u0003\u0002\u0002\u0002h\u0015\u0003\u0002",
    "\u0002\u0002ij\u0007-\u0002\u0002j\u0017\u0003\u0002\u0002\u0002kq\u0005",
    "\u001c\u000f\u0002lq\u0005\u001e\u0010\u0002mq\u0005 \u0011\u0002nq",
    "\u0005(\u0015\u0002oq\u0005\u001a\u000e\u0002pk\u0003\u0002\u0002\u0002",
    "pl\u0003\u0002\u0002\u0002pm\u0003\u0002\u0002\u0002pn\u0003\u0002\u0002",
    "\u0002po\u0003\u0002\u0002\u0002q\u0019\u0003\u0002\u0002\u0002rs\t",
    "\u0002\u0002\u0002s\u001b\u0003\u0002\u0002\u0002tu\u0007\u0007\u0002",
    "\u0002u\u001d\u0003\u0002\u0002\u0002vw\u0007\t\u0002\u0002w\u001f\u0003",
    "\u0002\u0002\u0002xy\u0007\b\u0002\u0002y!\u0003\u0002\u0002\u0002z",
    "{\u0007\u000b\u0002\u0002{#\u0003\u0002\u0002\u0002|}\u0007\f\u0002",
    "\u0002}%\u0003\u0002\u0002\u0002~\u007f\u0007\r\u0002\u0002\u007f\'",
    "\u0003\u0002\u0002\u0002\u0080\u0081\u0007\n\u0002\u0002\u0081)\u0003",
    "\u0002\u0002\u0002\r+04BDHU_cgp"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class fassParser extends antlr4.Parser {

    static grammarFileName = "fass.g4";
    static literalNames = [ null, "':'", "'at'", "'='", "','" ];
    static symbolicNames = [ null, null, null, null, null, "HEXADECIMAL", 
                             "BINARY", "DECIMAL", "NEGATIVE_NUMBER", "BRK", 
                             "NOP", "NOP3", "ADDRESS_KWD", "FILLER_KWD", 
                             "DEFAULT_KWD", "DATA_KWD", "CONST_KWD", "GOTO_KWD", 
                             "GOSUB_KWD", "RETURN_KWD", "RETINT_KWD", "PUSH_KWD", 
                             "PULL_KWD", "FLAGS_KWD", "AND_KWD", "OR_KWD", 
                             "XOR_KWD", "BITTEST_KWD", "COMPARE_KWD", "CARRY", 
                             "OVERFLOW", "INTERRUPT", "DECIMAL_MODE", "ZERO", 
                             "POSITIVE", "NEGATIVE", "ON_KWD", "OFF_KWD", 
                             "NOT_KWD", "A", "X", "Y", "STACK", "IDENTIFIER", 
                             "WHITESPACE", "EOL" ];
    static ruleNames = [ "program", "label", "statement", "address", "address_stmt", 
                         "remote_label_stmt", "filler_stmt", "const_stmt", 
                         "data_stmt", "value", "constant", "literal", "opcode_literal", 
                         "hexadecimal", "decimal", "binary", "brk_literal", 
                         "nop_literal", "nop3_literal", "negative_number" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = fassParser.ruleNames;
        this.literalNames = fassParser.literalNames;
        this.symbolicNames = fassParser.symbolicNames;
    }

    get atn() {
        return atn;
    }



	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, fassParser.RULE_program);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 46;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 41;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if(((((_la - 12)) & ~0x1f) == 0 && ((1 << (_la - 12)) & ((1 << (fassParser.ADDRESS_KWD - 12)) | (1 << (fassParser.FILLER_KWD - 12)) | (1 << (fassParser.DATA_KWD - 12)) | (1 << (fassParser.CONST_KWD - 12)) | (1 << (fassParser.IDENTIFIER - 12)))) !== 0)) {
	                    this.state = 40;
	                    this.statement();
	                }

	                this.state = 43;
	                this.match(fassParser.EOL); 
	            }
	            this.state = 48;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
	        }

	        this.state = 50;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(((((_la - 12)) & ~0x1f) == 0 && ((1 << (_la - 12)) & ((1 << (fassParser.ADDRESS_KWD - 12)) | (1 << (fassParser.FILLER_KWD - 12)) | (1 << (fassParser.DATA_KWD - 12)) | (1 << (fassParser.CONST_KWD - 12)) | (1 << (fassParser.IDENTIFIER - 12)))) !== 0)) {
	            this.state = 49;
	            this.statement();
	        }

	        this.state = 52;
	        this.match(fassParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	label() {
	    let localctx = new LabelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, fassParser.RULE_label);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 54;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 55;
	        this.match(fassParser.T__0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, fassParser.RULE_statement);
	    var _la = 0; // Token type
	    try {
	        this.state = 66;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 57;
	            this.address_stmt();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 58;
	            this.remote_label_stmt();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 59;
	            this.filler_stmt();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 60;
	            this.const_stmt();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 61;
	            this.data_stmt();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 62;
	            this.label();
	            this.state = 64;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(((((_la - 12)) & ~0x1f) == 0 && ((1 << (_la - 12)) & ((1 << (fassParser.ADDRESS_KWD - 12)) | (1 << (fassParser.FILLER_KWD - 12)) | (1 << (fassParser.DATA_KWD - 12)) | (1 << (fassParser.CONST_KWD - 12)) | (1 << (fassParser.IDENTIFIER - 12)))) !== 0)) {
	                this.state = 63;
	                this.statement();
	            }

	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	address() {
	    let localctx = new AddressContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, fassParser.RULE_address);
	    try {
	        this.state = 70;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.DECIMAL:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 68;
	            this.decimal();
	            break;
	        case fassParser.HEXADECIMAL:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 69;
	            this.hexadecimal();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	address_stmt() {
	    let localctx = new Address_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, fassParser.RULE_address_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 72;
	        this.match(fassParser.ADDRESS_KWD);
	        this.state = 73;
	        this.address();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	remote_label_stmt() {
	    let localctx = new Remote_label_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, fassParser.RULE_remote_label_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 75;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 76;
	        this.match(fassParser.T__1);
	        this.state = 77;
	        this.address();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	filler_stmt() {
	    let localctx = new Filler_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, fassParser.RULE_filler_stmt);
	    try {
	        this.state = 83;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 79;
	            this.match(fassParser.FILLER_KWD);
	            this.state = 80;
	            this.value();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 81;
	            this.match(fassParser.FILLER_KWD);
	            this.state = 82;
	            this.match(fassParser.DEFAULT_KWD);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	const_stmt() {
	    let localctx = new Const_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, fassParser.RULE_const_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 85;
	        this.match(fassParser.CONST_KWD);
	        this.state = 86;
	        localctx.const_name = this.match(fassParser.IDENTIFIER);
	        this.state = 87;
	        this.match(fassParser.T__2);
	        this.state = 88;
	        this.value();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	data_stmt() {
	    let localctx = new Data_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, fassParser.RULE_data_stmt);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this.match(fassParser.DATA_KWD);
	        this.state = 95; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 91;
	            localctx._value = this.value();
	            localctx.datas.push(localctx._value);
	            this.state = 93;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===fassParser.T__3) {
	                this.state = 92;
	                this.match(fassParser.T__3);
	            }

	            this.state = 97; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.HEXADECIMAL) | (1 << fassParser.BINARY) | (1 << fassParser.DECIMAL) | (1 << fassParser.NEGATIVE_NUMBER) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.NOP3))) !== 0) || _la===fassParser.IDENTIFIER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	value() {
	    let localctx = new ValueContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, fassParser.RULE_value);
	    try {
	        this.state = 101;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEXADECIMAL:
	        case fassParser.BINARY:
	        case fassParser.DECIMAL:
	        case fassParser.NEGATIVE_NUMBER:
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.NOP3:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 99;
	            this.literal();
	            break;
	        case fassParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 100;
	            this.constant();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	constant() {
	    let localctx = new ConstantContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, fassParser.RULE_constant);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 103;
	        this.match(fassParser.IDENTIFIER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	literal() {
	    let localctx = new LiteralContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, fassParser.RULE_literal);
	    try {
	        this.state = 110;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEXADECIMAL:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 105;
	            this.hexadecimal();
	            break;
	        case fassParser.DECIMAL:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 106;
	            this.decimal();
	            break;
	        case fassParser.BINARY:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 107;
	            this.binary();
	            break;
	        case fassParser.NEGATIVE_NUMBER:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 108;
	            this.negative_number();
	            break;
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.NOP3:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 109;
	            this.opcode_literal();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	opcode_literal() {
	    let localctx = new Opcode_literalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, fassParser.RULE_opcode_literal);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 112;
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.NOP3))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	hexadecimal() {
	    let localctx = new HexadecimalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, fassParser.RULE_hexadecimal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 114;
	        this.match(fassParser.HEXADECIMAL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	decimal() {
	    let localctx = new DecimalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, fassParser.RULE_decimal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 116;
	        this.match(fassParser.DECIMAL);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	binary() {
	    let localctx = new BinaryContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, fassParser.RULE_binary);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 118;
	        this.match(fassParser.BINARY);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	brk_literal() {
	    let localctx = new Brk_literalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, fassParser.RULE_brk_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 120;
	        this.match(fassParser.BRK);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nop_literal() {
	    let localctx = new Nop_literalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, fassParser.RULE_nop_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 122;
	        this.match(fassParser.NOP);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	nop3_literal() {
	    let localctx = new Nop3_literalContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, fassParser.RULE_nop3_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 124;
	        this.match(fassParser.NOP3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	negative_number() {
	    let localctx = new Negative_numberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, fassParser.RULE_negative_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 126;
	        this.match(fassParser.NEGATIVE_NUMBER);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

fassParser.EOF = antlr4.Token.EOF;
fassParser.T__0 = 1;
fassParser.T__1 = 2;
fassParser.T__2 = 3;
fassParser.T__3 = 4;
fassParser.HEXADECIMAL = 5;
fassParser.BINARY = 6;
fassParser.DECIMAL = 7;
fassParser.NEGATIVE_NUMBER = 8;
fassParser.BRK = 9;
fassParser.NOP = 10;
fassParser.NOP3 = 11;
fassParser.ADDRESS_KWD = 12;
fassParser.FILLER_KWD = 13;
fassParser.DEFAULT_KWD = 14;
fassParser.DATA_KWD = 15;
fassParser.CONST_KWD = 16;
fassParser.GOTO_KWD = 17;
fassParser.GOSUB_KWD = 18;
fassParser.RETURN_KWD = 19;
fassParser.RETINT_KWD = 20;
fassParser.PUSH_KWD = 21;
fassParser.PULL_KWD = 22;
fassParser.FLAGS_KWD = 23;
fassParser.AND_KWD = 24;
fassParser.OR_KWD = 25;
fassParser.XOR_KWD = 26;
fassParser.BITTEST_KWD = 27;
fassParser.COMPARE_KWD = 28;
fassParser.CARRY = 29;
fassParser.OVERFLOW = 30;
fassParser.INTERRUPT = 31;
fassParser.DECIMAL_MODE = 32;
fassParser.ZERO = 33;
fassParser.POSITIVE = 34;
fassParser.NEGATIVE = 35;
fassParser.ON_KWD = 36;
fassParser.OFF_KWD = 37;
fassParser.NOT_KWD = 38;
fassParser.A = 39;
fassParser.X = 40;
fassParser.Y = 41;
fassParser.STACK = 42;
fassParser.IDENTIFIER = 43;
fassParser.WHITESPACE = 44;
fassParser.EOL = 45;

fassParser.RULE_program = 0;
fassParser.RULE_label = 1;
fassParser.RULE_statement = 2;
fassParser.RULE_address = 3;
fassParser.RULE_address_stmt = 4;
fassParser.RULE_remote_label_stmt = 5;
fassParser.RULE_filler_stmt = 6;
fassParser.RULE_const_stmt = 7;
fassParser.RULE_data_stmt = 8;
fassParser.RULE_value = 9;
fassParser.RULE_constant = 10;
fassParser.RULE_literal = 11;
fassParser.RULE_opcode_literal = 12;
fassParser.RULE_hexadecimal = 13;
fassParser.RULE_decimal = 14;
fassParser.RULE_binary = 15;
fassParser.RULE_brk_literal = 16;
fassParser.RULE_nop_literal = 17;
fassParser.RULE_nop3_literal = 18;
fassParser.RULE_negative_number = 19;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_program;
    }

	EOF() {
	    return this.getToken(fassParser.EOF, 0);
	};

	EOL = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(fassParser.EOL);
	    } else {
	        return this.getToken(fassParser.EOL, i);
	    }
	};


	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitProgram(this);
		}
	}


}



class LabelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_label;
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterLabel(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitLabel(this);
		}
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_statement;
    }

	address_stmt() {
	    return this.getTypedRuleContext(Address_stmtContext,0);
	};

	remote_label_stmt() {
	    return this.getTypedRuleContext(Remote_label_stmtContext,0);
	};

	filler_stmt() {
	    return this.getTypedRuleContext(Filler_stmtContext,0);
	};

	const_stmt() {
	    return this.getTypedRuleContext(Const_stmtContext,0);
	};

	data_stmt() {
	    return this.getTypedRuleContext(Data_stmtContext,0);
	};

	label() {
	    return this.getTypedRuleContext(LabelContext,0);
	};

	statement() {
	    return this.getTypedRuleContext(StatementContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitStatement(this);
		}
	}


}



class AddressContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_address;
    }

	decimal() {
	    return this.getTypedRuleContext(DecimalContext,0);
	};

	hexadecimal() {
	    return this.getTypedRuleContext(HexadecimalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAddress(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAddress(this);
		}
	}


}



class Address_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_address_stmt;
    }

	ADDRESS_KWD() {
	    return this.getToken(fassParser.ADDRESS_KWD, 0);
	};

	address() {
	    return this.getTypedRuleContext(AddressContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAddress_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAddress_stmt(this);
		}
	}


}



class Remote_label_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_remote_label_stmt;
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	address() {
	    return this.getTypedRuleContext(AddressContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterRemote_label_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitRemote_label_stmt(this);
		}
	}


}



class Filler_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_filler_stmt;
    }

	FILLER_KWD() {
	    return this.getToken(fassParser.FILLER_KWD, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	DEFAULT_KWD() {
	    return this.getToken(fassParser.DEFAULT_KWD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterFiller_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitFiller_stmt(this);
		}
	}


}



class Const_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_const_stmt;
        this.const_name = null; // Token
    }

	CONST_KWD() {
	    return this.getToken(fassParser.CONST_KWD, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterConst_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitConst_stmt(this);
		}
	}


}



class Data_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_data_stmt;
        this._value = null; // ValueContext
        this.datas = []; // of ValueContexts
    }

	DATA_KWD() {
	    return this.getToken(fassParser.DATA_KWD, 0);
	};

	value = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ValueContext);
	    } else {
	        return this.getTypedRuleContext(ValueContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterData_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitData_stmt(this);
		}
	}


}



class ValueContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_value;
    }

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	constant() {
	    return this.getTypedRuleContext(ConstantContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterValue(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitValue(this);
		}
	}


}



class ConstantContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_constant;
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterConstant(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitConstant(this);
		}
	}


}



class LiteralContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_literal;
    }

	hexadecimal() {
	    return this.getTypedRuleContext(HexadecimalContext,0);
	};

	decimal() {
	    return this.getTypedRuleContext(DecimalContext,0);
	};

	binary() {
	    return this.getTypedRuleContext(BinaryContext,0);
	};

	negative_number() {
	    return this.getTypedRuleContext(Negative_numberContext,0);
	};

	opcode_literal() {
	    return this.getTypedRuleContext(Opcode_literalContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterLiteral(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitLiteral(this);
		}
	}


}



class Opcode_literalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_opcode_literal;
    }

	BRK() {
	    return this.getToken(fassParser.BRK, 0);
	};

	NOP() {
	    return this.getToken(fassParser.NOP, 0);
	};

	NOP3() {
	    return this.getToken(fassParser.NOP3, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterOpcode_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitOpcode_literal(this);
		}
	}


}



class HexadecimalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_hexadecimal;
    }

	HEXADECIMAL() {
	    return this.getToken(fassParser.HEXADECIMAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterHexadecimal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitHexadecimal(this);
		}
	}


}



class DecimalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_decimal;
    }

	DECIMAL() {
	    return this.getToken(fassParser.DECIMAL, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterDecimal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitDecimal(this);
		}
	}


}



class BinaryContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_binary;
    }

	BINARY() {
	    return this.getToken(fassParser.BINARY, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBinary(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBinary(this);
		}
	}


}



class Brk_literalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_brk_literal;
    }

	BRK() {
	    return this.getToken(fassParser.BRK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBrk_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBrk_literal(this);
		}
	}


}



class Nop_literalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_nop_literal;
    }

	NOP() {
	    return this.getToken(fassParser.NOP, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterNop_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitNop_literal(this);
		}
	}


}



class Nop3_literalContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_nop3_literal;
    }

	NOP3() {
	    return this.getToken(fassParser.NOP3, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterNop3_literal(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitNop3_literal(this);
		}
	}


}



class Negative_numberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_negative_number;
    }

	NEGATIVE_NUMBER() {
	    return this.getToken(fassParser.NEGATIVE_NUMBER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterNegative_number(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitNegative_number(this);
		}
	}


}




fassParser.ProgramContext = ProgramContext; 
fassParser.LabelContext = LabelContext; 
fassParser.StatementContext = StatementContext; 
fassParser.AddressContext = AddressContext; 
fassParser.Address_stmtContext = Address_stmtContext; 
fassParser.Remote_label_stmtContext = Remote_label_stmtContext; 
fassParser.Filler_stmtContext = Filler_stmtContext; 
fassParser.Const_stmtContext = Const_stmtContext; 
fassParser.Data_stmtContext = Data_stmtContext; 
fassParser.ValueContext = ValueContext; 
fassParser.ConstantContext = ConstantContext; 
fassParser.LiteralContext = LiteralContext; 
fassParser.Opcode_literalContext = Opcode_literalContext; 
fassParser.HexadecimalContext = HexadecimalContext; 
fassParser.DecimalContext = DecimalContext; 
fassParser.BinaryContext = BinaryContext; 
fassParser.Brk_literalContext = Brk_literalContext; 
fassParser.Nop_literalContext = Nop_literalContext; 
fassParser.Nop3_literalContext = Nop3_literalContext; 
fassParser.Negative_numberContext = Negative_numberContext; 
