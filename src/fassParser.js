// Generated from /Users/petruza/Source/Drean64/fass/src/fass.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import fassListener from './fassListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u00035\u00b2\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0003\u0002\u0005\u00028\n\u0002\u0003\u0002\u0007\u0002;\n",
    "\u0002\f\u0002\u000e\u0002>\u000b\u0002\u0003\u0002\u0005\u0002A\n\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004R\n\u0004\u0005\u0004",
    "T\n\u0004\u0003\u0005\u0003\u0005\u0005\u0005X\n\u0005\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0005\be\n\b\u0003\t\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0003\n\u0003\n\u0003\n\u0005\no\n\n\u0006\nq\n\n\r\n\u000e",
    "\nr\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005",
    "\u000bz\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0003\f\u0005\f\u0086\n\f\u0003\r\u0003\r\u0003\r",
    "\u0003\u000e\u0003\u000e\u0005\u000e\u008d\n\u000e\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0011\u0003",
    "\u0011\u0005\u0011\u0097\n\u0011\u0003\u0012\u0003\u0012\u0003\u0013",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00a0\n",
    "\u0013\u0003\u0014\u0003\u0014\u0003\u0015\u0003\u0015\u0003\u0016\u0003",
    "\u0016\u0003\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0003\u0019\u0003",
    "\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b\u0003\u001b\u0002",
    "\u0002\u001c\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016\u0018",
    "\u001a\u001c\u001e \"$&(*,.024\u0002\u0006\u0003\u0002$%\u0003\u0002",
    "&\'\u0003\u0002-.\u0003\u0002\r\u000f\u0002\u00b1\u0002<\u0003\u0002",
    "\u0002\u0002\u0004D\u0003\u0002\u0002\u0002\u0006S\u0003\u0002\u0002",
    "\u0002\bW\u0003\u0002\u0002\u0002\nY\u0003\u0002\u0002\u0002\f\\\u0003",
    "\u0002\u0002\u0002\u000ed\u0003\u0002\u0002\u0002\u0010f\u0003\u0002",
    "\u0002\u0002\u0012k\u0003\u0002\u0002\u0002\u0014y\u0003\u0002\u0002",
    "\u0002\u0016\u0085\u0003\u0002\u0002\u0002\u0018\u0087\u0003\u0002\u0002",
    "\u0002\u001a\u008c\u0003\u0002\u0002\u0002\u001c\u008e\u0003\u0002\u0002",
    "\u0002\u001e\u0090\u0003\u0002\u0002\u0002 \u0096\u0003\u0002\u0002",
    "\u0002\"\u0098\u0003\u0002\u0002\u0002$\u009f\u0003\u0002\u0002\u0002",
    "&\u00a1\u0003\u0002\u0002\u0002(\u00a3\u0003\u0002\u0002\u0002*\u00a5",
    "\u0003\u0002\u0002\u0002,\u00a7\u0003\u0002\u0002\u0002.\u00a9\u0003",
    "\u0002\u0002\u00020\u00ab\u0003\u0002\u0002\u00022\u00ad\u0003\u0002",
    "\u0002\u00024\u00af\u0003\u0002\u0002\u000268\u0005\u0006\u0004\u0002",
    "76\u0003\u0002\u0002\u000278\u0003\u0002\u0002\u000289\u0003\u0002\u0002",
    "\u00029;\u00075\u0002\u0002:7\u0003\u0002\u0002\u0002;>\u0003\u0002",
    "\u0002\u0002<:\u0003\u0002\u0002\u0002<=\u0003\u0002\u0002\u0002=@\u0003",
    "\u0002\u0002\u0002><\u0003\u0002\u0002\u0002?A\u0005\u0006\u0004\u0002",
    "@?\u0003\u0002\u0002\u0002@A\u0003\u0002\u0002\u0002AB\u0003\u0002\u0002",
    "\u0002BC\u0007\u0002\u0002\u0003C\u0003\u0003\u0002\u0002\u0002DE\u0007",
    "3\u0002\u0002EF\u0007\u0003\u0002\u0002F\u0005\u0003\u0002\u0002\u0002",
    "GT\u0005\n\u0006\u0002HT\u0005\f\u0007\u0002IT\u0005\u000e\b\u0002J",
    "T\u0005\u0010\t\u0002KT\u0005\u0012\n\u0002LT\u0005\u0014\u000b\u0002",
    "MT\u0005\u0016\f\u0002NT\u0005\u0018\r\u0002OQ\u0005\u0004\u0003\u0002",
    "PR\u0005\u0006\u0004\u0002QP\u0003\u0002\u0002\u0002QR\u0003\u0002\u0002",
    "\u0002RT\u0003\u0002\u0002\u0002SG\u0003\u0002\u0002\u0002SH\u0003\u0002",
    "\u0002\u0002SI\u0003\u0002\u0002\u0002SJ\u0003\u0002\u0002\u0002SK\u0003",
    "\u0002\u0002\u0002SL\u0003\u0002\u0002\u0002SM\u0003\u0002\u0002\u0002",
    "SN\u0003\u0002\u0002\u0002SO\u0003\u0002\u0002\u0002T\u0007\u0003\u0002",
    "\u0002\u0002UX\u0005*\u0016\u0002VX\u0005(\u0015\u0002WU\u0003\u0002",
    "\u0002\u0002WV\u0003\u0002\u0002\u0002X\t\u0003\u0002\u0002\u0002YZ",
    "\u0007\u0010\u0002\u0002Z[\u0005\b\u0005\u0002[\u000b\u0003\u0002\u0002",
    "\u0002\\]\u00073\u0002\u0002]^\u0007\u0004\u0002\u0002^_\u0005\b\u0005",
    "\u0002_\r\u0003\u0002\u0002\u0002`a\u0007\u0011\u0002\u0002ae\u0005",
    " \u0011\u0002bc\u0007\u0011\u0002\u0002ce\u0007\u0012\u0002\u0002d`",
    "\u0003\u0002\u0002\u0002db\u0003\u0002\u0002\u0002e\u000f\u0003\u0002",
    "\u0002\u0002fg\u0007\u0014\u0002\u0002gh\u00073\u0002\u0002hi\u0007",
    "\u0005\u0002\u0002ij\u0005 \u0011\u0002j\u0011\u0003\u0002\u0002\u0002",
    "kp\u0007\u0013\u0002\u0002ln\u0005 \u0011\u0002mo\u0007\u0006\u0002",
    "\u0002nm\u0003\u0002\u0002\u0002no\u0003\u0002\u0002\u0002oq\u0003\u0002",
    "\u0002\u0002pl\u0003\u0002\u0002\u0002qr\u0003\u0002\u0002\u0002rp\u0003",
    "\u0002\u0002\u0002rs\u0003\u0002\u0002\u0002s\u0013\u0003\u0002\u0002",
    "\u0002tu\t\u0002\u0002\u0002uv\u0007\u0005\u0002\u0002vz\u0005*\u0016",
    "\u0002wx\t\u0003\u0002\u0002xz\t\u0004\u0002\u0002yt\u0003\u0002\u0002",
    "\u0002yw\u0003\u0002\u0002\u0002z\u0015\u0003\u0002\u0002\u0002{|\u0007",
    "/\u0002\u0002|}\u0007\u0005\u0002\u0002}\u0086\u0007\u001d\u0002\u0002",
    "~\u007f\u0007\u001c\u0002\u0002\u007f\u0086\u0007/\u0002\u0002\u0080",
    "\u0081\u0007\u001e\u0002\u0002\u0081\u0082\u0007\u0005\u0002\u0002\u0082",
    "\u0086\u0007\u001d\u0002\u0002\u0083\u0084\u0007\u001c\u0002\u0002\u0084",
    "\u0086\u0007\u001e\u0002\u0002\u0085{\u0003\u0002\u0002\u0002\u0085",
    "~\u0003\u0002\u0002\u0002\u0085\u0080\u0003\u0002\u0002\u0002\u0085",
    "\u0083\u0003\u0002\u0002\u0002\u0086\u0017\u0003\u0002\u0002\u0002\u0087",
    "\u0088\u0007\u0018\u0002\u0002\u0088\u0089\u0005\u001a\u000e\u0002\u0089",
    "\u0019\u0003\u0002\u0002\u0002\u008a\u008d\u0005\u001c\u000f\u0002\u008b",
    "\u008d\u0005\u001e\u0010\u0002\u008c\u008a\u0003\u0002\u0002\u0002\u008c",
    "\u008b\u0003\u0002\u0002\u0002\u008d\u001b\u0003\u0002\u0002\u0002\u008e",
    "\u008f\u00073\u0002\u0002\u008f\u001d\u0003\u0002\u0002\u0002\u0090",
    "\u0091\u0007\u0007\u0002\u0002\u0091\u0092\u00073\u0002\u0002\u0092",
    "\u0093\u0007\b\u0002\u0002\u0093\u001f\u0003\u0002\u0002\u0002\u0094",
    "\u0097\u0005$\u0013\u0002\u0095\u0097\u0005\"\u0012\u0002\u0096\u0094",
    "\u0003\u0002\u0002\u0002\u0096\u0095\u0003\u0002\u0002\u0002\u0097!",
    "\u0003\u0002\u0002\u0002\u0098\u0099\u00073\u0002\u0002\u0099#\u0003",
    "\u0002\u0002\u0002\u009a\u00a0\u0005(\u0015\u0002\u009b\u00a0\u0005",
    "*\u0016\u0002\u009c\u00a0\u0005,\u0017\u0002\u009d\u00a0\u00054\u001b",
    "\u0002\u009e\u00a0\u0005&\u0014\u0002\u009f\u009a\u0003\u0002\u0002",
    "\u0002\u009f\u009b\u0003\u0002\u0002\u0002\u009f\u009c\u0003\u0002\u0002",
    "\u0002\u009f\u009d\u0003\u0002\u0002\u0002\u009f\u009e\u0003\u0002\u0002",
    "\u0002\u00a0%\u0003\u0002\u0002\u0002\u00a1\u00a2\t\u0005\u0002\u0002",
    "\u00a2\'\u0003\u0002\u0002\u0002\u00a3\u00a4\u0007\t\u0002\u0002\u00a4",
    ")\u0003\u0002\u0002\u0002\u00a5\u00a6\u0007\u000b\u0002\u0002\u00a6",
    "+\u0003\u0002\u0002\u0002\u00a7\u00a8\u0007\n\u0002\u0002\u00a8-\u0003",
    "\u0002\u0002\u0002\u00a9\u00aa\u0007\r\u0002\u0002\u00aa/\u0003\u0002",
    "\u0002\u0002\u00ab\u00ac\u0007\u000e\u0002\u0002\u00ac1\u0003\u0002",
    "\u0002\u0002\u00ad\u00ae\u0007\u000f\u0002\u0002\u00ae3\u0003\u0002",
    "\u0002\u0002\u00af\u00b0\u0007\f\u0002\u0002\u00b05\u0003\u0002\u0002",
    "\u0002\u00107<@QSWdnry\u0085\u008c\u0096\u009f"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class fassParser extends antlr4.Parser {

    static grammarFileName = "fass.g4";
    static literalNames = [ null, "':'", "'at'", "'='", "','", "'('", "')'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, "HEXADECIMAL", 
                             "BINARY", "DECIMAL", "NEGATIVE_NUMBER", "BRK", 
                             "NOP", "NOP3", "ADDRESS_KWD", "FILLER_KWD", 
                             "DEFAULT_KWD", "DATA_KWD", "CONST_KWD", "IF_KWD", 
                             "THEN_KWD", "ELSE_KWD", "GOTO_KWD", "GOSUB_KWD", 
                             "RETURN_KWD", "RETINT_KWD", "PUSH_KWD", "PULL_KWD", 
                             "FLAGS_KWD", "AND_KWD", "OR_KWD", "XOR_KWD", 
                             "BITTEST_KWD", "COMPARE_KWD", "CARRY", "OVERFLOW", 
                             "INTERRUPT", "DECIMAL_MODE", "NOT", "ZERO", 
                             "POSITIVE", "NEGATIVE", "EQUAL", "ON", "OFF", 
                             "A", "X", "Y", "STACK", "IDENTIFIER", "WHITESPACE", 
                             "EOL" ];
    static ruleNames = [ "program", "label", "statement", "address", "address_stmt", 
                         "remote_label_stmt", "filler_stmt", "const_stmt", 
                         "data_stmt", "flag_set_stmt", "stack_stmt", "goto_stmt", 
                         "reference", "direct", "indirect", "value", "constant", 
                         "literal", "opcode_literal", "hexadecimal", "decimal", 
                         "binary", "brk_literal", "nop_literal", "nop3_literal", 
                         "negative_number" ];

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
	        this.state = 58;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 53;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD) | (1 << fassParser.PUSH_KWD) | (1 << fassParser.FLAGS_KWD))) !== 0) || ((((_la - 34)) & ~0x1f) == 0 && ((1 << (_la - 34)) & ((1 << (fassParser.CARRY - 34)) | (1 << (fassParser.OVERFLOW - 34)) | (1 << (fassParser.INTERRUPT - 34)) | (1 << (fassParser.DECIMAL_MODE - 34)) | (1 << (fassParser.A - 34)) | (1 << (fassParser.IDENTIFIER - 34)))) !== 0)) {
	                    this.state = 52;
	                    this.statement();
	                }

	                this.state = 55;
	                this.match(fassParser.EOL); 
	            }
	            this.state = 60;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
	        }

	        this.state = 62;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD) | (1 << fassParser.PUSH_KWD) | (1 << fassParser.FLAGS_KWD))) !== 0) || ((((_la - 34)) & ~0x1f) == 0 && ((1 << (_la - 34)) & ((1 << (fassParser.CARRY - 34)) | (1 << (fassParser.OVERFLOW - 34)) | (1 << (fassParser.INTERRUPT - 34)) | (1 << (fassParser.DECIMAL_MODE - 34)) | (1 << (fassParser.A - 34)) | (1 << (fassParser.IDENTIFIER - 34)))) !== 0)) {
	            this.state = 61;
	            this.statement();
	        }

	        this.state = 64;
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
	        this.state = 66;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 67;
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
	        this.state = 81;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 69;
	            this.address_stmt();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 70;
	            this.remote_label_stmt();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 71;
	            this.filler_stmt();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 72;
	            this.const_stmt();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 73;
	            this.data_stmt();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 74;
	            this.flag_set_stmt();
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 75;
	            this.stack_stmt();
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 76;
	            this.goto_stmt();
	            break;

	        case 9:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 77;
	            this.label();
	            this.state = 79;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD) | (1 << fassParser.PUSH_KWD) | (1 << fassParser.FLAGS_KWD))) !== 0) || ((((_la - 34)) & ~0x1f) == 0 && ((1 << (_la - 34)) & ((1 << (fassParser.CARRY - 34)) | (1 << (fassParser.OVERFLOW - 34)) | (1 << (fassParser.INTERRUPT - 34)) | (1 << (fassParser.DECIMAL_MODE - 34)) | (1 << (fassParser.A - 34)) | (1 << (fassParser.IDENTIFIER - 34)))) !== 0)) {
	                this.state = 78;
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
	        this.state = 85;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.DECIMAL:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 83;
	            this.decimal();
	            break;
	        case fassParser.HEXADECIMAL:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 84;
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
	        this.state = 87;
	        this.match(fassParser.ADDRESS_KWD);
	        this.state = 88;
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
	        this.state = 90;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 91;
	        this.match(fassParser.T__1);
	        this.state = 92;
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
	        this.state = 98;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 94;
	            this.match(fassParser.FILLER_KWD);
	            this.state = 95;
	            this.value();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 96;
	            this.match(fassParser.FILLER_KWD);
	            this.state = 97;
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
	        this.state = 100;
	        this.match(fassParser.CONST_KWD);
	        this.state = 101;
	        localctx.const_name = this.match(fassParser.IDENTIFIER);
	        this.state = 102;
	        this.match(fassParser.T__2);
	        this.state = 103;
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
	        this.state = 105;
	        this.match(fassParser.DATA_KWD);
	        this.state = 110; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 106;
	            localctx._value = this.value();
	            localctx.datas.push(localctx._value);
	            this.state = 108;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===fassParser.T__3) {
	                this.state = 107;
	                this.match(fassParser.T__3);
	            }

	            this.state = 112; 
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



	flag_set_stmt() {
	    let localctx = new Flag_set_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, fassParser.RULE_flag_set_stmt);
	    var _la = 0; // Token type
	    try {
	        this.state = 119;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.CARRY:
	        case fassParser.OVERFLOW:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 114;
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.CARRY || _la===fassParser.OVERFLOW)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 115;
	            this.match(fassParser.T__2);
	            this.state = 116;
	            localctx.one_zero = this.decimal();
	            break;
	        case fassParser.INTERRUPT:
	        case fassParser.DECIMAL_MODE:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 117;
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.INTERRUPT || _la===fassParser.DECIMAL_MODE)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 118;
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.ON || _la===fassParser.OFF)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
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



	stack_stmt() {
	    let localctx = new Stack_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, fassParser.RULE_stack_stmt);
	    try {
	        this.state = 131;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 121;
	            this.match(fassParser.A);
	            this.state = 122;
	            this.match(fassParser.T__2);
	            this.state = 123;
	            this.match(fassParser.PULL_KWD);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 124;
	            this.match(fassParser.PUSH_KWD);
	            this.state = 125;
	            this.match(fassParser.A);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 126;
	            this.match(fassParser.FLAGS_KWD);
	            this.state = 127;
	            this.match(fassParser.T__2);
	            this.state = 128;
	            this.match(fassParser.PULL_KWD);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 129;
	            this.match(fassParser.PUSH_KWD);
	            this.state = 130;
	            this.match(fassParser.FLAGS_KWD);
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



	goto_stmt() {
	    let localctx = new Goto_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, fassParser.RULE_goto_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 133;
	        this.match(fassParser.GOTO_KWD);
	        this.state = 134;
	        this.reference();
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



	reference() {
	    let localctx = new ReferenceContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, fassParser.RULE_reference);
	    try {
	        this.state = 138;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 136;
	            this.direct();
	            break;
	        case fassParser.T__4:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 137;
	            this.indirect();
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



	direct() {
	    let localctx = new DirectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, fassParser.RULE_direct);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 140;
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



	indirect() {
	    let localctx = new IndirectContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, fassParser.RULE_indirect);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 142;
	        this.match(fassParser.T__4);
	        this.state = 143;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 144;
	        this.match(fassParser.T__5);
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
	    this.enterRule(localctx, 30, fassParser.RULE_value);
	    try {
	        this.state = 148;
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
	            this.state = 146;
	            this.literal();
	            break;
	        case fassParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 147;
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
	    this.enterRule(localctx, 32, fassParser.RULE_constant);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 150;
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
	    this.enterRule(localctx, 34, fassParser.RULE_literal);
	    try {
	        this.state = 157;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEXADECIMAL:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 152;
	            this.hexadecimal();
	            break;
	        case fassParser.DECIMAL:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 153;
	            this.decimal();
	            break;
	        case fassParser.BINARY:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 154;
	            this.binary();
	            break;
	        case fassParser.NEGATIVE_NUMBER:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 155;
	            this.negative_number();
	            break;
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.NOP3:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 156;
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
	    this.enterRule(localctx, 36, fassParser.RULE_opcode_literal);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 159;
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
	    this.enterRule(localctx, 38, fassParser.RULE_hexadecimal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 161;
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
	    this.enterRule(localctx, 40, fassParser.RULE_decimal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 163;
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
	    this.enterRule(localctx, 42, fassParser.RULE_binary);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 165;
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
	    this.enterRule(localctx, 44, fassParser.RULE_brk_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 167;
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
	    this.enterRule(localctx, 46, fassParser.RULE_nop_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 169;
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
	    this.enterRule(localctx, 48, fassParser.RULE_nop3_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 171;
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
	    this.enterRule(localctx, 50, fassParser.RULE_negative_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 173;
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
fassParser.T__4 = 5;
fassParser.T__5 = 6;
fassParser.HEXADECIMAL = 7;
fassParser.BINARY = 8;
fassParser.DECIMAL = 9;
fassParser.NEGATIVE_NUMBER = 10;
fassParser.BRK = 11;
fassParser.NOP = 12;
fassParser.NOP3 = 13;
fassParser.ADDRESS_KWD = 14;
fassParser.FILLER_KWD = 15;
fassParser.DEFAULT_KWD = 16;
fassParser.DATA_KWD = 17;
fassParser.CONST_KWD = 18;
fassParser.IF_KWD = 19;
fassParser.THEN_KWD = 20;
fassParser.ELSE_KWD = 21;
fassParser.GOTO_KWD = 22;
fassParser.GOSUB_KWD = 23;
fassParser.RETURN_KWD = 24;
fassParser.RETINT_KWD = 25;
fassParser.PUSH_KWD = 26;
fassParser.PULL_KWD = 27;
fassParser.FLAGS_KWD = 28;
fassParser.AND_KWD = 29;
fassParser.OR_KWD = 30;
fassParser.XOR_KWD = 31;
fassParser.BITTEST_KWD = 32;
fassParser.COMPARE_KWD = 33;
fassParser.CARRY = 34;
fassParser.OVERFLOW = 35;
fassParser.INTERRUPT = 36;
fassParser.DECIMAL_MODE = 37;
fassParser.NOT = 38;
fassParser.ZERO = 39;
fassParser.POSITIVE = 40;
fassParser.NEGATIVE = 41;
fassParser.EQUAL = 42;
fassParser.ON = 43;
fassParser.OFF = 44;
fassParser.A = 45;
fassParser.X = 46;
fassParser.Y = 47;
fassParser.STACK = 48;
fassParser.IDENTIFIER = 49;
fassParser.WHITESPACE = 50;
fassParser.EOL = 51;

fassParser.RULE_program = 0;
fassParser.RULE_label = 1;
fassParser.RULE_statement = 2;
fassParser.RULE_address = 3;
fassParser.RULE_address_stmt = 4;
fassParser.RULE_remote_label_stmt = 5;
fassParser.RULE_filler_stmt = 6;
fassParser.RULE_const_stmt = 7;
fassParser.RULE_data_stmt = 8;
fassParser.RULE_flag_set_stmt = 9;
fassParser.RULE_stack_stmt = 10;
fassParser.RULE_goto_stmt = 11;
fassParser.RULE_reference = 12;
fassParser.RULE_direct = 13;
fassParser.RULE_indirect = 14;
fassParser.RULE_value = 15;
fassParser.RULE_constant = 16;
fassParser.RULE_literal = 17;
fassParser.RULE_opcode_literal = 18;
fassParser.RULE_hexadecimal = 19;
fassParser.RULE_decimal = 20;
fassParser.RULE_binary = 21;
fassParser.RULE_brk_literal = 22;
fassParser.RULE_nop_literal = 23;
fassParser.RULE_nop3_literal = 24;
fassParser.RULE_negative_number = 25;

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

	flag_set_stmt() {
	    return this.getTypedRuleContext(Flag_set_stmtContext,0);
	};

	stack_stmt() {
	    return this.getTypedRuleContext(Stack_stmtContext,0);
	};

	goto_stmt() {
	    return this.getTypedRuleContext(Goto_stmtContext,0);
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



class Flag_set_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_flag_set_stmt;
        this.one_zero = null; // DecimalContext
    }

	CARRY() {
	    return this.getToken(fassParser.CARRY, 0);
	};

	OVERFLOW() {
	    return this.getToken(fassParser.OVERFLOW, 0);
	};

	decimal() {
	    return this.getTypedRuleContext(DecimalContext,0);
	};

	INTERRUPT() {
	    return this.getToken(fassParser.INTERRUPT, 0);
	};

	DECIMAL_MODE() {
	    return this.getToken(fassParser.DECIMAL_MODE, 0);
	};

	ON() {
	    return this.getToken(fassParser.ON, 0);
	};

	OFF() {
	    return this.getToken(fassParser.OFF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterFlag_set_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitFlag_set_stmt(this);
		}
	}


}



class Stack_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_stack_stmt;
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	PULL_KWD() {
	    return this.getToken(fassParser.PULL_KWD, 0);
	};

	PUSH_KWD() {
	    return this.getToken(fassParser.PUSH_KWD, 0);
	};

	FLAGS_KWD() {
	    return this.getToken(fassParser.FLAGS_KWD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterStack_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitStack_stmt(this);
		}
	}


}



class Goto_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_goto_stmt;
    }

	GOTO_KWD() {
	    return this.getToken(fassParser.GOTO_KWD, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterGoto_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitGoto_stmt(this);
		}
	}


}



class ReferenceContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_reference;
    }

	direct() {
	    return this.getTypedRuleContext(DirectContext,0);
	};

	indirect() {
	    return this.getTypedRuleContext(IndirectContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterReference(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitReference(this);
		}
	}


}



class DirectContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_direct;
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterDirect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitDirect(this);
		}
	}


}



class IndirectContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_indirect;
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterIndirect(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitIndirect(this);
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
fassParser.Flag_set_stmtContext = Flag_set_stmtContext; 
fassParser.Stack_stmtContext = Stack_stmtContext; 
fassParser.Goto_stmtContext = Goto_stmtContext; 
fassParser.ReferenceContext = ReferenceContext; 
fassParser.DirectContext = DirectContext; 
fassParser.IndirectContext = IndirectContext; 
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
