// Generated from /Users/petruza/Source/Drean64/fass/src/fass.g4 by ANTLR 4.9.1
// jshint ignore: start
import antlr4 from 'antlr4';
import fassListener from './fassListener.js';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003?\u0157\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0004\u001c\t\u001c\u0004\u001d\t\u001d\u0004\u001e\t\u001e",
    "\u0004\u001f\t\u001f\u0004 \t \u0004!\t!\u0004\"\t\"\u0004#\t#\u0004",
    "$\t$\u0004%\t%\u0004&\t&\u0004\'\t\'\u0004(\t(\u0004)\t)\u0004*\t*\u0004",
    "+\t+\u0003\u0002\u0005\u0002X\n\u0002\u0003\u0002\u0007\u0002[\n\u0002",
    "\f\u0002\u000e\u0002^\u000b\u0002\u0003\u0002\u0005\u0002a\n\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0005\u0003x\n\u0003\u0005\u0003z\n\u0003",
    "\u0003\u0004\u0003\u0004\u0005\u0004~\n\u0004\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007",
    "\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0005\b\u008d\n\b\u0003",
    "\b\u0003\b\u0005\b\u0091\n\b\u0003\b\u0003\b\u0005\b\u0095\n\b\u0005",
    "\b\u0097\n\b\u0003\t\u0003\t\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n",
    "\u0003\n\u0005\n\u00a1\n\n\u0006\n\u00a3\n\n\r\n\u000e\n\u00a4\u0003",
    "\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0003\u000b\u0005\u000b\u00ac",
    "\n\u000b\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003\f\u0003",
    "\f\u0003\f\u0003\f\u0005\f\u00b8\n\f\u0003\r\u0003\r\u0005\r\u00bc\n",
    "\r\u0003\u000e\u0003\u000e\u0003\u000e\u0003\u000f\u0003\u000f\u0003",
    "\u000f\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003",
    "\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0003\u0010\u0005\u0010\u00e0",
    "\n\u0010\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011\u0003\u0011",
    "\u0003\u0011\u0003\u0011\u0003\u0011\u0005\u0011\u00f0\n\u0011\u0003",
    "\u0012\u0003\u0012\u0005\u0012\u00f4\n\u0012\u0003\u0012\u0003\u0012",
    "\u0003\u0013\u0003\u0013\u0003\u0013\u0003\u0013\u0005\u0013\u00fc\n",
    "\u0013\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0003\u0014\u0005",
    "\u0014\u0103\n\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0003\u0015",
    "\u0003\u0015\u0003\u0016\u0003\u0016\u0003\u0016\u0003\u0017\u0003\u0017",
    "\u0003\u0017\u0003\u0017\u0003\u0017\u0005\u0017\u0112\n\u0017\u0003",
    "\u0018\u0003\u0018\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003",
    "\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001b\u0003\u001c\u0003",
    "\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003\u001c\u0003",
    "\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0003\u001d\u0003",
    "\u001d\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001e\u0003\u001f\u0003",
    "\u001f\u0005\u001f\u0133\n\u001f\u0003 \u0003 \u0003!\u0003!\u0003!",
    "\u0003!\u0003!\u0003!\u0003!\u0003!\u0003!\u0003!\u0005!\u0141\n!\u0003",
    "\"\u0003\"\u0003#\u0003#\u0003$\u0003$\u0003%\u0003%\u0003&\u0003&\u0003",
    "\'\u0003\'\u0003(\u0003(\u0003)\u0003)\u0003*\u0003*\u0003+\u0003+\u0003",
    "+\u0002\u0002,\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016",
    "\u0018\u001a\u001c\u001e \"$&(*,.02468:<>@BDFHJLNPRT\u0002\u000b\u0003",
    "\u0002/0\u0003\u000212\u0003\u000267\u0003\u0002\u0006\u0007\u0003\u0002",
    "\b\u000b\u0003\u0002(*\u0003\u00029;\u0003\u00029<\u0003\u0002:;\u0002",
    "\u0168\u0002\\\u0003\u0002\u0002\u0002\u0004y\u0003\u0002\u0002\u0002",
    "\u0006}\u0003\u0002\u0002\u0002\b\u007f\u0003\u0002\u0002\u0002\n\u0082",
    "\u0003\u0002\u0002\u0002\f\u0086\u0003\u0002\u0002\u0002\u000e\u0096",
    "\u0003\u0002\u0002\u0002\u0010\u0098\u0003\u0002\u0002\u0002\u0012\u009d",
    "\u0003\u0002\u0002\u0002\u0014\u00ab\u0003\u0002\u0002\u0002\u0016\u00b7",
    "\u0003\u0002\u0002\u0002\u0018\u00bb\u0003\u0002\u0002\u0002\u001a\u00bd",
    "\u0003\u0002\u0002\u0002\u001c\u00c0\u0003\u0002\u0002\u0002\u001e\u00df",
    "\u0003\u0002\u0002\u0002 \u00ef\u0003\u0002\u0002\u0002\"\u00f3\u0003",
    "\u0002\u0002\u0002$\u00f7\u0003\u0002\u0002\u0002&\u00fd\u0003\u0002",
    "\u0002\u0002(\u0104\u0003\u0002\u0002\u0002*\u0109\u0003\u0002\u0002",
    "\u0002,\u0111\u0003\u0002\u0002\u0002.\u0113\u0003\u0002\u0002\u0002",
    "0\u0115\u0003\u0002\u0002\u00022\u0117\u0003\u0002\u0002\u00024\u0119",
    "\u0003\u0002\u0002\u00026\u011e\u0003\u0002\u0002\u00028\u0125\u0003",
    "\u0002\u0002\u0002:\u012c\u0003\u0002\u0002\u0002<\u0132\u0003\u0002",
    "\u0002\u0002>\u0134\u0003\u0002\u0002\u0002@\u0140\u0003\u0002\u0002",
    "\u0002B\u0142\u0003\u0002\u0002\u0002D\u0144\u0003\u0002\u0002\u0002",
    "F\u0146\u0003\u0002\u0002\u0002H\u0148\u0003\u0002\u0002\u0002J\u014a",
    "\u0003\u0002\u0002\u0002L\u014c\u0003\u0002\u0002\u0002N\u014e\u0003",
    "\u0002\u0002\u0002P\u0150\u0003\u0002\u0002\u0002R\u0152\u0003\u0002",
    "\u0002\u0002T\u0154\u0003\u0002\u0002\u0002VX\u0005\u0004\u0003\u0002",
    "WV\u0003\u0002\u0002\u0002WX\u0003\u0002\u0002\u0002XY\u0003\u0002\u0002",
    "\u0002Y[\u0007?\u0002\u0002ZW\u0003\u0002\u0002\u0002[^\u0003\u0002",
    "\u0002\u0002\\Z\u0003\u0002\u0002\u0002\\]\u0003\u0002\u0002\u0002]",
    "`\u0003\u0002\u0002\u0002^\\\u0003\u0002\u0002\u0002_a\u0005\u0004\u0003",
    "\u0002`_\u0003\u0002\u0002\u0002`a\u0003\u0002\u0002\u0002ab\u0003\u0002",
    "\u0002\u0002bc\u0007\u0002\u0002\u0003c\u0003\u0003\u0002\u0002\u0002",
    "dz\u0005\b\u0005\u0002ez\u0005\n\u0006\u0002fz\u0005\f\u0007\u0002g",
    "z\u0005\u0010\t\u0002hz\u0005\u0012\n\u0002iz\u0005\u000e\b\u0002jz",
    "\u0005\u0014\u000b\u0002kz\u0005\u0016\f\u0002lz\u0005\u001a\u000e\u0002",
    "mz\u0005\"\u0012\u0002nz\u0005$\u0013\u0002oz\u0005&\u0014\u0002pz\u0005",
    "(\u0015\u0002qz\u0005\u001c\u000f\u0002rz\u0005\u0018\r\u0002sz\u0005",
    "\u001e\u0010\u0002tz\u0005 \u0011\u0002uw\u0005*\u0016\u0002vx\u0005",
    "\u0004\u0003\u0002wv\u0003\u0002\u0002\u0002wx\u0003\u0002\u0002\u0002",
    "xz\u0003\u0002\u0002\u0002yd\u0003\u0002\u0002\u0002ye\u0003\u0002\u0002",
    "\u0002yf\u0003\u0002\u0002\u0002yg\u0003\u0002\u0002\u0002yh\u0003\u0002",
    "\u0002\u0002yi\u0003\u0002\u0002\u0002yj\u0003\u0002\u0002\u0002yk\u0003",
    "\u0002\u0002\u0002yl\u0003\u0002\u0002\u0002ym\u0003\u0002\u0002\u0002",
    "yn\u0003\u0002\u0002\u0002yo\u0003\u0002\u0002\u0002yp\u0003\u0002\u0002",
    "\u0002yq\u0003\u0002\u0002\u0002yr\u0003\u0002\u0002\u0002ys\u0003\u0002",
    "\u0002\u0002yt\u0003\u0002\u0002\u0002yu\u0003\u0002\u0002\u0002z\u0005",
    "\u0003\u0002\u0002\u0002{~\u0005B\"\u0002|~\u0005D#\u0002}{\u0003\u0002",
    "\u0002\u0002}|\u0003\u0002\u0002\u0002~\u0007\u0003\u0002\u0002\u0002",
    "\u007f\u0080\u0007\u001c\u0002\u0002\u0080\u0081\u0005\u0006\u0004\u0002",
    "\u0081\t\u0003\u0002\u0002\u0002\u0082\u0083\u0007=\u0002\u0002\u0083",
    "\u0084\u0007\u0003\u0002\u0002\u0084\u0085\u0005\u0006\u0004\u0002\u0085",
    "\u000b\u0003\u0002\u0002\u0002\u0086\u0087\u0007\u001d\u0002\u0002\u0087",
    "\u0088\u0007\u001e\u0002\u0002\u0088\r\u0003\u0002\u0002\u0002\u0089",
    "\u0097\u0007\u001a\u0002\u0002\u008a\u008c\u0007\u0019\u0002\u0002\u008b",
    "\u008d\u0005<\u001f\u0002\u008c\u008b\u0003\u0002\u0002\u0002\u008c",
    "\u008d\u0003\u0002\u0002\u0002\u008d\u0097\u0003\u0002\u0002\u0002\u008e",
    "\u0090\u0007-\u0002\u0002\u008f\u0091\u0005<\u001f\u0002\u0090\u008f",
    "\u0003\u0002\u0002\u0002\u0090\u0091\u0003\u0002\u0002\u0002\u0091\u0097",
    "\u0003\u0002\u0002\u0002\u0092\u0094\u0007.\u0002\u0002\u0093\u0095",
    "\u0005<\u001f\u0002\u0094\u0093\u0003\u0002\u0002\u0002\u0094\u0095",
    "\u0003\u0002\u0002\u0002\u0095\u0097\u0003\u0002\u0002\u0002\u0096\u0089",
    "\u0003\u0002\u0002\u0002\u0096\u008a\u0003\u0002\u0002\u0002\u0096\u008e",
    "\u0003\u0002\u0002\u0002\u0096\u0092\u0003\u0002\u0002\u0002\u0097\u000f",
    "\u0003\u0002\u0002\u0002\u0098\u0099\u0007 \u0002\u0002\u0099\u009a",
    "\u0007=\u0002\u0002\u009a\u009b\u0007\u0004\u0002\u0002\u009b\u009c",
    "\u0005<\u001f\u0002\u009c\u0011\u0003\u0002\u0002\u0002\u009d\u00a2",
    "\u0007\u001f\u0002\u0002\u009e\u00a0\u0005<\u001f\u0002\u009f\u00a1",
    "\u0007\u0005\u0002\u0002\u00a0\u009f\u0003\u0002\u0002\u0002\u00a0\u00a1",
    "\u0003\u0002\u0002\u0002\u00a1\u00a3\u0003\u0002\u0002\u0002\u00a2\u009e",
    "\u0003\u0002\u0002\u0002\u00a3\u00a4\u0003\u0002\u0002\u0002\u00a4\u00a2",
    "\u0003\u0002\u0002\u0002\u00a4\u00a5\u0003\u0002\u0002\u0002\u00a5\u0013",
    "\u0003\u0002\u0002\u0002\u00a6\u00a7\t\u0002\u0002\u0002\u00a7\u00a8",
    "\u0007\u0004\u0002\u0002\u00a8\u00ac\u0007\u0016\u0002\u0002\u00a9\u00aa",
    "\t\u0003\u0002\u0002\u00aa\u00ac\t\u0004\u0002\u0002\u00ab\u00a6\u0003",
    "\u0002\u0002\u0002\u00ab\u00a9\u0003\u0002\u0002\u0002\u00ac\u0015\u0003",
    "\u0002\u0002\u0002\u00ad\u00ae\u00079\u0002\u0002\u00ae\u00af\u0007",
    "\u0004\u0002\u0002\u00af\u00b8\u0007&\u0002\u0002\u00b0\u00b1\u0007",
    "%\u0002\u0002\u00b1\u00b8\u00079\u0002\u0002\u00b2\u00b3\u0007\'\u0002",
    "\u0002\u00b3\u00b4\u0007\u0004\u0002\u0002\u00b4\u00b8\u0007&\u0002",
    "\u0002\u00b5\u00b6\u0007%\u0002\u0002\u00b6\u00b8\u0007\'\u0002\u0002",
    "\u00b7\u00ad\u0003\u0002\u0002\u0002\u00b7\u00b0\u0003\u0002\u0002\u0002",
    "\u00b7\u00b2\u0003\u0002\u0002\u0002\u00b7\u00b5\u0003\u0002\u0002\u0002",
    "\u00b8\u0017\u0003\u0002\u0002\u0002\u00b9\u00bc\u0007#\u0002\u0002",
    "\u00ba\u00bc\u0007$\u0002\u0002\u00bb\u00b9\u0003\u0002\u0002\u0002",
    "\u00bb\u00ba\u0003\u0002\u0002\u0002\u00bc\u0019\u0003\u0002\u0002\u0002",
    "\u00bd\u00be\u0007!\u0002\u0002\u00be\u00bf\u0005,\u0017\u0002\u00bf",
    "\u001b\u0003\u0002\u0002\u0002\u00c0\u00c1\u0007\"\u0002\u0002\u00c1",
    "\u00c2\u0005,\u0017\u0002\u00c2\u001d\u0003\u0002\u0002\u0002\u00c3",
    "\u00c4\u0005.\u0018\u0002\u00c4\u00c5\u0007\u0004\u0002\u0002\u00c5",
    "\u00c6\u0005@!\u0002\u00c6\u00e0\u0003\u0002\u0002\u0002\u00c7\u00c8",
    "\u00050\u0019\u0002\u00c8\u00c9\u0007\u0004\u0002\u0002\u00c9\u00ca",
    "\u00050\u0019\u0002\u00ca\u00e0\u0003\u0002\u0002\u0002\u00cb\u00cc",
    "\u0005.\u0018\u0002\u00cc\u00cd\u0007\u0004\u0002\u0002\u00cd\u00ce",
    "\u0005,\u0017\u0002\u00ce\u00e0\u0003\u0002\u0002\u0002\u00cf\u00d0",
    "\u0005,\u0017\u0002\u00d0\u00d1\u0007\u0004\u0002\u0002\u00d1\u00d2",
    "\u0005.\u0018\u0002\u00d2\u00e0\u0003\u0002\u0002\u0002\u00d3\u00d4",
    "\u0005,\u0017\u0002\u00d4\u00d5\u0007\u0004\u0002\u0002\u00d5\u00d6",
    "\u0005.\u0018\u0002\u00d6\u00d7\u0007\u0004\u0002\u0002\u00d7\u00d8",
    "\u0005@!\u0002\u00d8\u00e0\u0003\u0002\u0002\u0002\u00d9\u00da\u0005",
    ",\u0017\u0002\u00da\u00db\u0007\u0004\u0002\u0002\u00db\u00dc\u0005",
    ".\u0018\u0002\u00dc\u00dd\u0007\u0004\u0002\u0002\u00dd\u00de\u0005",
    ",\u0017\u0002\u00de\u00e0\u0003\u0002\u0002\u0002\u00df\u00c3\u0003",
    "\u0002\u0002\u0002\u00df\u00c7\u0003\u0002\u0002\u0002\u00df\u00cb\u0003",
    "\u0002\u0002\u0002\u00df\u00cf\u0003\u0002\u0002\u0002\u00df\u00d3\u0003",
    "\u0002\u0002\u0002\u00df\u00d9\u0003\u0002\u0002\u0002\u00e0\u001f\u0003",
    "\u0002\u0002\u0002\u00e1\u00e2\u00079\u0002\u0002\u00e2\u00e3\t\u0005",
    "\u0002\u0002\u00e3\u00f0\u0005@!\u0002\u00e4\u00e5\u00079\u0002\u0002",
    "\u00e5\u00e6\t\u0005\u0002\u0002\u00e6\u00f0\u0005,\u0017\u0002\u00e7",
    "\u00e8\u0005.\u0018\u0002\u00e8\u00e9\t\u0005\u0002\u0002\u00e9\u00ea",
    "\u0005@!\u0002\u00ea\u00f0\u0003\u0002\u0002\u0002\u00eb\u00ec\u0005",
    ",\u0017\u0002\u00ec\u00ed\t\u0005\u0002\u0002\u00ed\u00ee\u0005@!\u0002",
    "\u00ee\u00f0\u0003\u0002\u0002\u0002\u00ef\u00e1\u0003\u0002\u0002\u0002",
    "\u00ef\u00e4\u0003\u0002\u0002\u0002\u00ef\u00e7\u0003\u0002\u0002\u0002",
    "\u00ef\u00eb\u0003\u0002\u0002\u0002\u00f0!\u0003\u0002\u0002\u0002",
    "\u00f1\u00f4\u00079\u0002\u0002\u00f2\u00f4\u0005,\u0017\u0002\u00f3",
    "\u00f1\u0003\u0002\u0002\u0002\u00f3\u00f2\u0003\u0002\u0002\u0002\u00f4",
    "\u00f5\u0003\u0002\u0002\u0002\u00f5\u00f6\t\u0006\u0002\u0002\u00f6",
    "#\u0003\u0002\u0002\u0002\u00f7\u00f8\u00079\u0002\u0002\u00f8\u00fb",
    "\t\u0007\u0002\u0002\u00f9\u00fc\u0005@!\u0002\u00fa\u00fc\u0005,\u0017",
    "\u0002\u00fb\u00f9\u0003\u0002\u0002\u0002\u00fb\u00fa\u0003\u0002\u0002",
    "\u0002\u00fc%\u0003\u0002\u0002\u0002\u00fd\u00fe\u0007,\u0002\u0002",
    "\u00fe\u00ff\u00079\u0002\u0002\u00ff\u0102\u0007\u0005\u0002\u0002",
    "\u0100\u0103\u0005,\u0017\u0002\u0101\u0103\u0005@!\u0002\u0102\u0100",
    "\u0003\u0002\u0002\u0002\u0102\u0101\u0003\u0002\u0002\u0002\u0103\'",
    "\u0003\u0002\u0002\u0002\u0104\u0105\u0007+\u0002\u0002\u0105\u0106",
    "\u00079\u0002\u0002\u0106\u0107\u0007\u0005\u0002\u0002\u0107\u0108",
    "\u0005,\u0017\u0002\u0108)\u0003\u0002\u0002\u0002\u0109\u010a\u0007",
    "=\u0002\u0002\u010a\u010b\u0007\f\u0002\u0002\u010b+\u0003\u0002\u0002",
    "\u0002\u010c\u0112\u00052\u001a\u0002\u010d\u0112\u00054\u001b\u0002",
    "\u010e\u0112\u00056\u001c\u0002\u010f\u0112\u00058\u001d\u0002\u0110",
    "\u0112\u0005:\u001e\u0002\u0111\u010c\u0003\u0002\u0002\u0002\u0111",
    "\u010d\u0003\u0002\u0002\u0002\u0111\u010e\u0003\u0002\u0002\u0002\u0111",
    "\u010f\u0003\u0002\u0002\u0002\u0111\u0110\u0003\u0002\u0002\u0002\u0112",
    "-\u0003\u0002\u0002\u0002\u0113\u0114\t\b\u0002\u0002\u0114/\u0003\u0002",
    "\u0002\u0002\u0115\u0116\t\t\u0002\u0002\u01161\u0003\u0002\u0002\u0002",
    "\u0117\u0118\u0007=\u0002\u0002\u01183\u0003\u0002\u0002\u0002\u0119",
    "\u011a\u0007=\u0002\u0002\u011a\u011b\u0007\r\u0002\u0002\u011b\u011c",
    "\t\n\u0002\u0002\u011c\u011d\u0007\u000e\u0002\u0002\u011d5\u0003\u0002",
    "\u0002\u0002\u011e\u011f\u0007\u000f\u0002\u0002\u011f\u0120\u0007=",
    "\u0002\u0002\u0120\u0121\u0007\r\u0002\u0002\u0121\u0122\u0007:\u0002",
    "\u0002\u0122\u0123\u0007\u000e\u0002\u0002\u0123\u0124\u0007\u0010\u0002",
    "\u0002\u01247\u0003\u0002\u0002\u0002\u0125\u0126\u0007\u000f\u0002",
    "\u0002\u0126\u0127\u0007=\u0002\u0002\u0127\u0128\u0007\u0010\u0002",
    "\u0002\u0128\u0129\u0007\r\u0002\u0002\u0129\u012a\u0007;\u0002\u0002",
    "\u012a\u012b\u0007\u000e\u0002\u0002\u012b9\u0003\u0002\u0002\u0002",
    "\u012c\u012d\u0007\u000f\u0002\u0002\u012d\u012e\u0007=\u0002\u0002",
    "\u012e\u012f\u0007\u0010\u0002\u0002\u012f;\u0003\u0002\u0002\u0002",
    "\u0130\u0133\u0005@!\u0002\u0131\u0133\u0005> \u0002\u0132\u0130\u0003",
    "\u0002\u0002\u0002\u0132\u0131\u0003\u0002\u0002\u0002\u0133=\u0003",
    "\u0002\u0002\u0002\u0134\u0135\u0007=\u0002\u0002\u0135?\u0003\u0002",
    "\u0002\u0002\u0136\u0141\u0005B\"\u0002\u0137\u0141\u0005H%\u0002\u0138",
    "\u0141\u0005D#\u0002\u0139\u0141\u0005J&\u0002\u013a\u0141\u0005F$\u0002",
    "\u013b\u0141\u0005L\'\u0002\u013c\u0141\u0005T+\u0002\u013d\u0141\u0005",
    "R*\u0002\u013e\u0141\u0005N(\u0002\u013f\u0141\u0005P)\u0002\u0140\u0136",
    "\u0003\u0002\u0002\u0002\u0140\u0137\u0003\u0002\u0002\u0002\u0140\u0138",
    "\u0003\u0002\u0002\u0002\u0140\u0139\u0003\u0002\u0002\u0002\u0140\u013a",
    "\u0003\u0002\u0002\u0002\u0140\u013b\u0003\u0002\u0002\u0002\u0140\u013c",
    "\u0003\u0002\u0002\u0002\u0140\u013d\u0003\u0002\u0002\u0002\u0140\u013e",
    "\u0003\u0002\u0002\u0002\u0140\u013f\u0003\u0002\u0002\u0002\u0141A",
    "\u0003\u0002\u0002\u0002\u0142\u0143\u0007\u0012\u0002\u0002\u0143C",
    "\u0003\u0002\u0002\u0002\u0144\u0145\u0007\u0016\u0002\u0002\u0145E",
    "\u0003\u0002\u0002\u0002\u0146\u0147\u0007\u0014\u0002\u0002\u0147G",
    "\u0003\u0002\u0002\u0002\u0148\u0149\u0007\u0013\u0002\u0002\u0149I",
    "\u0003\u0002\u0002\u0002\u014a\u014b\u0007\u0017\u0002\u0002\u014bK",
    "\u0003\u0002\u0002\u0002\u014c\u014d\u0007\u0015\u0002\u0002\u014dM",
    "\u0003\u0002\u0002\u0002\u014e\u014f\u0007\u0019\u0002\u0002\u014fO",
    "\u0003\u0002\u0002\u0002\u0150\u0151\u0007\u001a\u0002\u0002\u0151Q",
    "\u0003\u0002\u0002\u0002\u0152\u0153\u0007\u001b\u0002\u0002\u0153S",
    "\u0003\u0002\u0002\u0002\u0154\u0155\u0007\u0018\u0002\u0002\u0155U",
    "\u0003\u0002\u0002\u0002\u0019W\\`wy}\u008c\u0090\u0094\u0096\u00a0",
    "\u00a4\u00ab\u00b7\u00bb\u00df\u00ef\u00f3\u00fb\u0102\u0111\u0132\u0140"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class fassParser extends antlr4.Parser {

    static grammarFileName = "fass.g4";
    static literalNames = [ null, "'at'", "'='", "','", "'+='", "'-='", 
                            "'<<'", "'>>'", "'<-'", "'->'", "':'", "'['", 
                            "']'", "'('", "')'", "'L'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, null, null, null, null, null, null, "LITEND", 
                             "HEX_BIGEND", "HEX_LITEND", "BIN_BIGEND", "BIN_LITEND", 
                             "DEC_BIGEND", "DEC_LITEND", "NEGATIVE_NUMBER", 
                             "BRK", "NOP", "STRING", "ADDRESS_KWD", "FILLER_KWD", 
                             "DEFAULT_KWD", "DATA_KWD", "CONST_KWD", "GOTO_KWD", 
                             "GOSUB_KWD", "RETURN_KWD", "RETINT_KWD", "PUSH_KWD", 
                             "PULL_KWD", "FLAGS_KWD", "AND_KWD", "OR_KWD", 
                             "XOR_KWD", "BITTEST_KWD", "COMPARE_KWD", "NOP3", 
                             "NOP4", "CARRY", "OVERFLOW", "INTERRUPT", "DECIMAL_MODE", 
                             "ZERO", "POSITIVE", "NEGATIVE", "ON_KWD", "OFF_KWD", 
                             "NOT_KWD", "A", "X", "Y", "STACK", "IDENTIFIER", 
                             "WHITESPACE", "EOL" ];
    static ruleNames = [ "program", "statement", "address", "address_stmt", 
                         "remote_label_stmt", "filler_stmt", "nop_brk_stmt", 
                         "const_stmt", "data_stmt", "flag_set_stmt", "stack_stmt", 
                         "return_stmt", "goto_stmt", "gosub_stmt", "assign_stmt", 
                         "arithmetic_stmt", "bit_shift_stmt", "logic_stmt", 
                         "compare_stmt", "bittest_stmt", "label", "reference", 
                         "register", "reg_axys", "name", "indexed", "indir_x", 
                         "indir_y", "indirect", "value", "constant", "literal", 
                         "hex_bigend", "dec_bigend", "bin_bigend", "hex_litend", 
                         "dec_litend", "bin_litend", "brk_literal", "nop_literal", 
                         "string", "negative_number" ];

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
	        this.state = 90;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,1,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 85;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	                if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.T__12) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD))) !== 0) || ((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (fassParser.GOSUB_KWD - 32)) | (1 << (fassParser.RETURN_KWD - 32)) | (1 << (fassParser.RETINT_KWD - 32)) | (1 << (fassParser.PUSH_KWD - 32)) | (1 << (fassParser.FLAGS_KWD - 32)) | (1 << (fassParser.BITTEST_KWD - 32)) | (1 << (fassParser.COMPARE_KWD - 32)) | (1 << (fassParser.NOP3 - 32)) | (1 << (fassParser.NOP4 - 32)) | (1 << (fassParser.CARRY - 32)) | (1 << (fassParser.OVERFLOW - 32)) | (1 << (fassParser.INTERRUPT - 32)) | (1 << (fassParser.DECIMAL_MODE - 32)) | (1 << (fassParser.A - 32)) | (1 << (fassParser.X - 32)) | (1 << (fassParser.Y - 32)) | (1 << (fassParser.STACK - 32)) | (1 << (fassParser.IDENTIFIER - 32)))) !== 0)) {
	                    this.state = 84;
	                    this.statement();
	                }

	                this.state = 87;
	                this.match(fassParser.EOL); 
	            }
	            this.state = 92;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,1,this._ctx);
	        }

	        this.state = 94;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.T__12) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD))) !== 0) || ((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (fassParser.GOSUB_KWD - 32)) | (1 << (fassParser.RETURN_KWD - 32)) | (1 << (fassParser.RETINT_KWD - 32)) | (1 << (fassParser.PUSH_KWD - 32)) | (1 << (fassParser.FLAGS_KWD - 32)) | (1 << (fassParser.BITTEST_KWD - 32)) | (1 << (fassParser.COMPARE_KWD - 32)) | (1 << (fassParser.NOP3 - 32)) | (1 << (fassParser.NOP4 - 32)) | (1 << (fassParser.CARRY - 32)) | (1 << (fassParser.OVERFLOW - 32)) | (1 << (fassParser.INTERRUPT - 32)) | (1 << (fassParser.DECIMAL_MODE - 32)) | (1 << (fassParser.A - 32)) | (1 << (fassParser.X - 32)) | (1 << (fassParser.Y - 32)) | (1 << (fassParser.STACK - 32)) | (1 << (fassParser.IDENTIFIER - 32)))) !== 0)) {
	            this.state = 93;
	            this.statement();
	        }

	        this.state = 96;
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



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, fassParser.RULE_statement);
	    var _la = 0; // Token type
	    try {
	        this.state = 119;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 98;
	            this.address_stmt();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 99;
	            this.remote_label_stmt();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 100;
	            this.filler_stmt();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 101;
	            this.const_stmt();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 102;
	            this.data_stmt();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 103;
	            this.nop_brk_stmt();
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 104;
	            this.flag_set_stmt();
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 105;
	            this.stack_stmt();
	            break;

	        case 9:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 106;
	            this.goto_stmt();
	            break;

	        case 10:
	            this.enterOuterAlt(localctx, 10);
	            this.state = 107;
	            this.bit_shift_stmt();
	            break;

	        case 11:
	            this.enterOuterAlt(localctx, 11);
	            this.state = 108;
	            this.logic_stmt();
	            break;

	        case 12:
	            this.enterOuterAlt(localctx, 12);
	            this.state = 109;
	            this.compare_stmt();
	            break;

	        case 13:
	            this.enterOuterAlt(localctx, 13);
	            this.state = 110;
	            this.bittest_stmt();
	            break;

	        case 14:
	            this.enterOuterAlt(localctx, 14);
	            this.state = 111;
	            this.gosub_stmt();
	            break;

	        case 15:
	            this.enterOuterAlt(localctx, 15);
	            this.state = 112;
	            this.return_stmt();
	            break;

	        case 16:
	            this.enterOuterAlt(localctx, 16);
	            this.state = 113;
	            this.assign_stmt();
	            break;

	        case 17:
	            this.enterOuterAlt(localctx, 17);
	            this.state = 114;
	            this.arithmetic_stmt();
	            break;

	        case 18:
	            this.enterOuterAlt(localctx, 18);
	            this.state = 115;
	            this.label();
	            this.state = 117;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.T__12) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.ADDRESS_KWD) | (1 << fassParser.FILLER_KWD) | (1 << fassParser.DATA_KWD) | (1 << fassParser.CONST_KWD) | (1 << fassParser.GOTO_KWD))) !== 0) || ((((_la - 32)) & ~0x1f) == 0 && ((1 << (_la - 32)) & ((1 << (fassParser.GOSUB_KWD - 32)) | (1 << (fassParser.RETURN_KWD - 32)) | (1 << (fassParser.RETINT_KWD - 32)) | (1 << (fassParser.PUSH_KWD - 32)) | (1 << (fassParser.FLAGS_KWD - 32)) | (1 << (fassParser.BITTEST_KWD - 32)) | (1 << (fassParser.COMPARE_KWD - 32)) | (1 << (fassParser.NOP3 - 32)) | (1 << (fassParser.NOP4 - 32)) | (1 << (fassParser.CARRY - 32)) | (1 << (fassParser.OVERFLOW - 32)) | (1 << (fassParser.INTERRUPT - 32)) | (1 << (fassParser.DECIMAL_MODE - 32)) | (1 << (fassParser.A - 32)) | (1 << (fassParser.X - 32)) | (1 << (fassParser.Y - 32)) | (1 << (fassParser.STACK - 32)) | (1 << (fassParser.IDENTIFIER - 32)))) !== 0)) {
	                this.state = 116;
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
	    this.enterRule(localctx, 4, fassParser.RULE_address);
	    try {
	        this.state = 123;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEX_BIGEND:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 121;
	            this.hex_bigend();
	            break;
	        case fassParser.DEC_BIGEND:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 122;
	            this.dec_bigend();
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
	    this.enterRule(localctx, 6, fassParser.RULE_address_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 125;
	        this.match(fassParser.ADDRESS_KWD);
	        this.state = 126;
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
	    this.enterRule(localctx, 8, fassParser.RULE_remote_label_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 128;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 129;
	        this.match(fassParser.T__0);
	        this.state = 130;
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
	    this.enterRule(localctx, 10, fassParser.RULE_filler_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 132;
	        this.match(fassParser.FILLER_KWD);
	        this.state = 133;
	        this.match(fassParser.DEFAULT_KWD);
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



	nop_brk_stmt() {
	    let localctx = new Nop_brk_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, fassParser.RULE_nop_brk_stmt);
	    var _la = 0; // Token type
	    try {
	        this.state = 148;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.NOP:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 135;
	            localctx.mnemonic = this.match(fassParser.NOP);
	            break;
	        case fassParser.BRK:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 136;
	            localctx.mnemonic = this.match(fassParser.BRK);
	            this.state = 138;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.HEX_BIGEND) | (1 << fassParser.HEX_LITEND) | (1 << fassParser.BIN_BIGEND) | (1 << fassParser.BIN_LITEND) | (1 << fassParser.DEC_BIGEND) | (1 << fassParser.DEC_LITEND) | (1 << fassParser.NEGATIVE_NUMBER) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.STRING))) !== 0) || _la===fassParser.IDENTIFIER) {
	                this.state = 137;
	                this.value();
	            }

	            break;
	        case fassParser.NOP3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 140;
	            localctx.mnemonic = this.match(fassParser.NOP3);
	            this.state = 142;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.HEX_BIGEND) | (1 << fassParser.HEX_LITEND) | (1 << fassParser.BIN_BIGEND) | (1 << fassParser.BIN_LITEND) | (1 << fassParser.DEC_BIGEND) | (1 << fassParser.DEC_LITEND) | (1 << fassParser.NEGATIVE_NUMBER) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.STRING))) !== 0) || _la===fassParser.IDENTIFIER) {
	                this.state = 141;
	                this.value();
	            }

	            break;
	        case fassParser.NOP4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 144;
	            localctx.mnemonic = this.match(fassParser.NOP4);
	            this.state = 146;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.HEX_BIGEND) | (1 << fassParser.HEX_LITEND) | (1 << fassParser.BIN_BIGEND) | (1 << fassParser.BIN_LITEND) | (1 << fassParser.DEC_BIGEND) | (1 << fassParser.DEC_LITEND) | (1 << fassParser.NEGATIVE_NUMBER) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.STRING))) !== 0) || _la===fassParser.IDENTIFIER) {
	                this.state = 145;
	                this.value();
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



	const_stmt() {
	    let localctx = new Const_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, fassParser.RULE_const_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 150;
	        this.match(fassParser.CONST_KWD);
	        this.state = 151;
	        localctx.lhs = this.match(fassParser.IDENTIFIER);
	        this.state = 152;
	        this.match(fassParser.T__1);
	        this.state = 153;
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
	        this.state = 155;
	        this.match(fassParser.DATA_KWD);
	        this.state = 160; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 156;
	            localctx._value = this.value();
	            localctx.datas.push(localctx._value);
	            this.state = 158;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===fassParser.T__2) {
	                this.state = 157;
	                this.match(fassParser.T__2);
	            }

	            this.state = 162; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.HEX_BIGEND) | (1 << fassParser.HEX_LITEND) | (1 << fassParser.BIN_BIGEND) | (1 << fassParser.BIN_LITEND) | (1 << fassParser.DEC_BIGEND) | (1 << fassParser.DEC_LITEND) | (1 << fassParser.NEGATIVE_NUMBER) | (1 << fassParser.BRK) | (1 << fassParser.NOP) | (1 << fassParser.STRING))) !== 0) || _la===fassParser.IDENTIFIER);
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
	        this.state = 169;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.CARRY:
	        case fassParser.OVERFLOW:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 164;
	            localctx.flag = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.CARRY || _la===fassParser.OVERFLOW)) {
	                localctx.flag = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 165;
	            this.match(fassParser.T__1);
	            this.state = 166;
	            localctx.operand = this.match(fassParser.DEC_BIGEND);
	            break;
	        case fassParser.INTERRUPT:
	        case fassParser.DECIMAL_MODE:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 167;
	            localctx.flag = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.INTERRUPT || _la===fassParser.DECIMAL_MODE)) {
	                localctx.flag = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 168;
	            localctx.operand = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.ON_KWD || _la===fassParser.OFF_KWD)) {
	                localctx.operand = this._errHandler.recoverInline(this);
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
	        this.state = 181;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 171;
	            localctx.reg = this.match(fassParser.A);
	            this.state = 172;
	            this.match(fassParser.T__1);
	            this.state = 173;
	            localctx.op = this.match(fassParser.PULL_KWD);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 174;
	            localctx.op = this.match(fassParser.PUSH_KWD);
	            this.state = 175;
	            localctx.reg = this.match(fassParser.A);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 176;
	            localctx.reg = this.match(fassParser.FLAGS_KWD);
	            this.state = 177;
	            this.match(fassParser.T__1);
	            this.state = 178;
	            localctx.op = this.match(fassParser.PULL_KWD);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 179;
	            localctx.op = this.match(fassParser.PUSH_KWD);
	            this.state = 180;
	            localctx.reg = this.match(fassParser.FLAGS_KWD);
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



	return_stmt() {
	    let localctx = new Return_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, fassParser.RULE_return_stmt);
	    try {
	        this.state = 185;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.RETURN_KWD:
	            localctx = new ReturnContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 183;
	            this.match(fassParser.RETURN_KWD);
	            break;
	        case fassParser.RETINT_KWD:
	            localctx = new RetintContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 184;
	            this.match(fassParser.RETINT_KWD);
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



	goto_stmt() {
	    let localctx = new Goto_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, fassParser.RULE_goto_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 187;
	        this.match(fassParser.GOTO_KWD);
	        this.state = 188;
	        localctx.ref = this.reference();
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



	gosub_stmt() {
	    let localctx = new Gosub_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, fassParser.RULE_gosub_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 190;
	        this.match(fassParser.GOSUB_KWD);
	        this.state = 191;
	        localctx.ref = this.reference();
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



	assign_stmt() {
	    let localctx = new Assign_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, fassParser.RULE_assign_stmt);
	    try {
	        this.state = 221;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,15,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new Assign_reg_litContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 193;
	            localctx.reg = this.register();
	            this.state = 194;
	            this.match(fassParser.T__1);
	            this.state = 195;
	            localctx.lit = this.literal();
	            break;

	        case 2:
	            localctx = new Assign_reg_regContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 197;
	            localctx.reg1 = this.reg_axys();
	            this.state = 198;
	            this.match(fassParser.T__1);
	            this.state = 199;
	            localctx.reg2 = this.reg_axys();
	            break;

	        case 3:
	            localctx = new Assign_reg_refContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 201;
	            localctx.reg = this.register();
	            this.state = 202;
	            this.match(fassParser.T__1);
	            this.state = 203;
	            localctx.ref = this.reference();
	            break;

	        case 4:
	            localctx = new Assign_ref_regContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 205;
	            localctx.ref = this.reference();
	            this.state = 206;
	            this.match(fassParser.T__1);
	            this.state = 207;
	            localctx.reg = this.register();
	            break;

	        case 5:
	            localctx = new Assign_ref_reg_litContext(this, localctx);
	            this.enterOuterAlt(localctx, 5);
	            this.state = 209;
	            localctx.ref = this.reference();
	            this.state = 210;
	            this.match(fassParser.T__1);
	            this.state = 211;
	            localctx.reg = this.register();
	            this.state = 212;
	            this.match(fassParser.T__1);
	            this.state = 213;
	            localctx.lit = this.literal();
	            break;

	        case 6:
	            localctx = new Assign_ref_reg_refContext(this, localctx);
	            this.enterOuterAlt(localctx, 6);
	            this.state = 215;
	            localctx.ref1 = this.reference();
	            this.state = 216;
	            this.match(fassParser.T__1);
	            this.state = 217;
	            localctx.reg = this.register();
	            this.state = 218;
	            this.match(fassParser.T__1);
	            this.state = 219;
	            localctx.ref2 = this.reference();
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



	arithmetic_stmt() {
	    let localctx = new Arithmetic_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, fassParser.RULE_arithmetic_stmt);
	    var _la = 0; // Token type
	    try {
	        this.state = 237;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,16,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new Arithmetic_a_litContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 223;
	            this.match(fassParser.A);
	            this.state = 224;
	            localctx.op = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.T__3 || _la===fassParser.T__4)) {
	                localctx.op = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 225;
	            localctx.lit = this.literal();
	            break;

	        case 2:
	            localctx = new Arithmetic_a_refContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 226;
	            this.match(fassParser.A);
	            this.state = 227;
	            localctx.op = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.T__3 || _la===fassParser.T__4)) {
	                localctx.op = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 228;
	            localctx.ref = this.reference();
	            break;

	        case 3:
	            localctx = new Arithmetic_reg_incContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 229;
	            localctx.reg = this.register();
	            this.state = 230;
	            localctx.op = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.T__3 || _la===fassParser.T__4)) {
	                localctx.op = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 231;
	            localctx.lit = this.literal();
	            break;

	        case 4:
	            localctx = new Arithmetic_ref_litContext(this, localctx);
	            this.enterOuterAlt(localctx, 4);
	            this.state = 233;
	            localctx.ref = this.reference();
	            this.state = 234;
	            localctx.op = this._input.LT(1);
	            _la = this._input.LA(1);
	            if(!(_la===fassParser.T__3 || _la===fassParser.T__4)) {
	                localctx.op = this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 235;
	            localctx.lit = this.literal();
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



	bit_shift_stmt() {
	    let localctx = new Bit_shift_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, fassParser.RULE_bit_shift_stmt);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 241;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.A:
	            this.state = 239;
	            this.match(fassParser.A);
	            break;
	        case fassParser.T__12:
	        case fassParser.IDENTIFIER:
	            this.state = 240;
	            this.reference();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 243;
	        localctx.op = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << fassParser.T__5) | (1 << fassParser.T__6) | (1 << fassParser.T__7) | (1 << fassParser.T__8))) !== 0))) {
	            localctx.op = this._errHandler.recoverInline(this);
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



	logic_stmt() {
	    let localctx = new Logic_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, fassParser.RULE_logic_stmt);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 245;
	        this.match(fassParser.A);
	        this.state = 246;
	        localctx.op = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 38)) & ~0x1f) == 0 && ((1 << (_la - 38)) & ((1 << (fassParser.AND_KWD - 38)) | (1 << (fassParser.OR_KWD - 38)) | (1 << (fassParser.XOR_KWD - 38)))) !== 0))) {
	            localctx.op = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 249;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEX_BIGEND:
	        case fassParser.HEX_LITEND:
	        case fassParser.BIN_BIGEND:
	        case fassParser.BIN_LITEND:
	        case fassParser.DEC_BIGEND:
	        case fassParser.DEC_LITEND:
	        case fassParser.NEGATIVE_NUMBER:
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.STRING:
	            this.state = 247;
	            this.literal();
	            break;
	        case fassParser.T__12:
	        case fassParser.IDENTIFIER:
	            this.state = 248;
	            this.reference();
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



	compare_stmt() {
	    let localctx = new Compare_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, fassParser.RULE_compare_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 251;
	        this.match(fassParser.COMPARE_KWD);
	        this.state = 252;
	        this.match(fassParser.A);
	        this.state = 253;
	        this.match(fassParser.T__2);
	        this.state = 256;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.T__12:
	        case fassParser.IDENTIFIER:
	            this.state = 254;
	            this.reference();
	            break;
	        case fassParser.HEX_BIGEND:
	        case fassParser.HEX_LITEND:
	        case fassParser.BIN_BIGEND:
	        case fassParser.BIN_LITEND:
	        case fassParser.DEC_BIGEND:
	        case fassParser.DEC_LITEND:
	        case fassParser.NEGATIVE_NUMBER:
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.STRING:
	            this.state = 255;
	            this.literal();
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



	bittest_stmt() {
	    let localctx = new Bittest_stmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, fassParser.RULE_bittest_stmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 258;
	        this.match(fassParser.BITTEST_KWD);
	        this.state = 259;
	        this.match(fassParser.A);
	        this.state = 260;
	        this.match(fassParser.T__2);
	        this.state = 261;
	        localctx.ref = this.reference();
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
	    this.enterRule(localctx, 40, fassParser.RULE_label);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 263;
	        this.match(fassParser.IDENTIFIER);
	        this.state = 264;
	        this.match(fassParser.T__9);
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
	    this.enterRule(localctx, 42, fassParser.RULE_reference);
	    try {
	        this.state = 271;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,20,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 266;
	            this.name();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 267;
	            this.indexed();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 268;
	            this.indir_x();
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 269;
	            this.indir_y();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 270;
	            this.indirect();
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



	register() {
	    let localctx = new RegisterContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, fassParser.RULE_register);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 273;
	        localctx.reg_name = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 55)) & ~0x1f) == 0 && ((1 << (_la - 55)) & ((1 << (fassParser.A - 55)) | (1 << (fassParser.X - 55)) | (1 << (fassParser.Y - 55)))) !== 0))) {
	            localctx.reg_name = this._errHandler.recoverInline(this);
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



	reg_axys() {
	    let localctx = new Reg_axysContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, fassParser.RULE_reg_axys);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 275;
	        localctx.reg_name = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(((((_la - 55)) & ~0x1f) == 0 && ((1 << (_la - 55)) & ((1 << (fassParser.A - 55)) | (1 << (fassParser.X - 55)) | (1 << (fassParser.Y - 55)) | (1 << (fassParser.STACK - 55)))) !== 0))) {
	            localctx.reg_name = this._errHandler.recoverInline(this);
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



	name() {
	    let localctx = new NameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, fassParser.RULE_name);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 277;
	        localctx.lbl = this.match(fassParser.IDENTIFIER);
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



	indexed() {
	    let localctx = new IndexedContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, fassParser.RULE_indexed);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 279;
	        localctx.lbl = this.match(fassParser.IDENTIFIER);
	        this.state = 280;
	        this.match(fassParser.T__10);
	        this.state = 281;
	        localctx.reg = this._input.LT(1);
	        _la = this._input.LA(1);
	        if(!(_la===fassParser.X || _la===fassParser.Y)) {
	            localctx.reg = this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	        this.state = 282;
	        this.match(fassParser.T__11);
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



	indir_x() {
	    let localctx = new Indir_xContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 52, fassParser.RULE_indir_x);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 284;
	        this.match(fassParser.T__12);
	        this.state = 285;
	        localctx.lbl = this.match(fassParser.IDENTIFIER);
	        this.state = 286;
	        this.match(fassParser.T__10);
	        this.state = 287;
	        localctx.reg = this.match(fassParser.X);
	        this.state = 288;
	        this.match(fassParser.T__11);
	        this.state = 289;
	        this.match(fassParser.T__13);
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



	indir_y() {
	    let localctx = new Indir_yContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 54, fassParser.RULE_indir_y);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 291;
	        this.match(fassParser.T__12);
	        this.state = 292;
	        localctx.lbl = this.match(fassParser.IDENTIFIER);
	        this.state = 293;
	        this.match(fassParser.T__13);
	        this.state = 294;
	        this.match(fassParser.T__10);
	        this.state = 295;
	        localctx.reg = this.match(fassParser.Y);
	        this.state = 296;
	        this.match(fassParser.T__11);
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
	    this.enterRule(localctx, 56, fassParser.RULE_indirect);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 298;
	        this.match(fassParser.T__12);
	        this.state = 299;
	        localctx.lbl = this.match(fassParser.IDENTIFIER);
	        this.state = 300;
	        this.match(fassParser.T__13);
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
	    this.enterRule(localctx, 58, fassParser.RULE_value);
	    try {
	        this.state = 304;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEX_BIGEND:
	        case fassParser.HEX_LITEND:
	        case fassParser.BIN_BIGEND:
	        case fassParser.BIN_LITEND:
	        case fassParser.DEC_BIGEND:
	        case fassParser.DEC_LITEND:
	        case fassParser.NEGATIVE_NUMBER:
	        case fassParser.BRK:
	        case fassParser.NOP:
	        case fassParser.STRING:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 302;
	            this.literal();
	            break;
	        case fassParser.IDENTIFIER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 303;
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
	    this.enterRule(localctx, 60, fassParser.RULE_constant);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 306;
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
	    this.enterRule(localctx, 62, fassParser.RULE_literal);
	    try {
	        this.state = 318;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case fassParser.HEX_BIGEND:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 308;
	            this.hex_bigend();
	            break;
	        case fassParser.HEX_LITEND:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 309;
	            this.hex_litend();
	            break;
	        case fassParser.DEC_BIGEND:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 310;
	            this.dec_bigend();
	            break;
	        case fassParser.DEC_LITEND:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 311;
	            this.dec_litend();
	            break;
	        case fassParser.BIN_BIGEND:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 312;
	            this.bin_bigend();
	            break;
	        case fassParser.BIN_LITEND:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 313;
	            this.bin_litend();
	            break;
	        case fassParser.NEGATIVE_NUMBER:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 314;
	            this.negative_number();
	            break;
	        case fassParser.STRING:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 315;
	            this.string();
	            break;
	        case fassParser.BRK:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 316;
	            this.brk_literal();
	            break;
	        case fassParser.NOP:
	            this.enterOuterAlt(localctx, 10);
	            this.state = 317;
	            this.nop_literal();
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



	hex_bigend() {
	    let localctx = new Hex_bigendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 64, fassParser.RULE_hex_bigend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 320;
	        this.match(fassParser.HEX_BIGEND);
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



	dec_bigend() {
	    let localctx = new Dec_bigendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 66, fassParser.RULE_dec_bigend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 322;
	        this.match(fassParser.DEC_BIGEND);
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



	bin_bigend() {
	    let localctx = new Bin_bigendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 68, fassParser.RULE_bin_bigend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 324;
	        this.match(fassParser.BIN_BIGEND);
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



	hex_litend() {
	    let localctx = new Hex_litendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 70, fassParser.RULE_hex_litend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 326;
	        this.match(fassParser.HEX_LITEND);
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



	dec_litend() {
	    let localctx = new Dec_litendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 72, fassParser.RULE_dec_litend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 328;
	        this.match(fassParser.DEC_LITEND);
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



	bin_litend() {
	    let localctx = new Bin_litendContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 74, fassParser.RULE_bin_litend);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 330;
	        this.match(fassParser.BIN_LITEND);
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
	    this.enterRule(localctx, 76, fassParser.RULE_brk_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 332;
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
	    this.enterRule(localctx, 78, fassParser.RULE_nop_literal);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 334;
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



	string() {
	    let localctx = new StringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 80, fassParser.RULE_string);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 336;
	        this.match(fassParser.STRING);
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
	    this.enterRule(localctx, 82, fassParser.RULE_negative_number);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 338;
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
fassParser.T__6 = 7;
fassParser.T__7 = 8;
fassParser.T__8 = 9;
fassParser.T__9 = 10;
fassParser.T__10 = 11;
fassParser.T__11 = 12;
fassParser.T__12 = 13;
fassParser.T__13 = 14;
fassParser.LITEND = 15;
fassParser.HEX_BIGEND = 16;
fassParser.HEX_LITEND = 17;
fassParser.BIN_BIGEND = 18;
fassParser.BIN_LITEND = 19;
fassParser.DEC_BIGEND = 20;
fassParser.DEC_LITEND = 21;
fassParser.NEGATIVE_NUMBER = 22;
fassParser.BRK = 23;
fassParser.NOP = 24;
fassParser.STRING = 25;
fassParser.ADDRESS_KWD = 26;
fassParser.FILLER_KWD = 27;
fassParser.DEFAULT_KWD = 28;
fassParser.DATA_KWD = 29;
fassParser.CONST_KWD = 30;
fassParser.GOTO_KWD = 31;
fassParser.GOSUB_KWD = 32;
fassParser.RETURN_KWD = 33;
fassParser.RETINT_KWD = 34;
fassParser.PUSH_KWD = 35;
fassParser.PULL_KWD = 36;
fassParser.FLAGS_KWD = 37;
fassParser.AND_KWD = 38;
fassParser.OR_KWD = 39;
fassParser.XOR_KWD = 40;
fassParser.BITTEST_KWD = 41;
fassParser.COMPARE_KWD = 42;
fassParser.NOP3 = 43;
fassParser.NOP4 = 44;
fassParser.CARRY = 45;
fassParser.OVERFLOW = 46;
fassParser.INTERRUPT = 47;
fassParser.DECIMAL_MODE = 48;
fassParser.ZERO = 49;
fassParser.POSITIVE = 50;
fassParser.NEGATIVE = 51;
fassParser.ON_KWD = 52;
fassParser.OFF_KWD = 53;
fassParser.NOT_KWD = 54;
fassParser.A = 55;
fassParser.X = 56;
fassParser.Y = 57;
fassParser.STACK = 58;
fassParser.IDENTIFIER = 59;
fassParser.WHITESPACE = 60;
fassParser.EOL = 61;

fassParser.RULE_program = 0;
fassParser.RULE_statement = 1;
fassParser.RULE_address = 2;
fassParser.RULE_address_stmt = 3;
fassParser.RULE_remote_label_stmt = 4;
fassParser.RULE_filler_stmt = 5;
fassParser.RULE_nop_brk_stmt = 6;
fassParser.RULE_const_stmt = 7;
fassParser.RULE_data_stmt = 8;
fassParser.RULE_flag_set_stmt = 9;
fassParser.RULE_stack_stmt = 10;
fassParser.RULE_return_stmt = 11;
fassParser.RULE_goto_stmt = 12;
fassParser.RULE_gosub_stmt = 13;
fassParser.RULE_assign_stmt = 14;
fassParser.RULE_arithmetic_stmt = 15;
fassParser.RULE_bit_shift_stmt = 16;
fassParser.RULE_logic_stmt = 17;
fassParser.RULE_compare_stmt = 18;
fassParser.RULE_bittest_stmt = 19;
fassParser.RULE_label = 20;
fassParser.RULE_reference = 21;
fassParser.RULE_register = 22;
fassParser.RULE_reg_axys = 23;
fassParser.RULE_name = 24;
fassParser.RULE_indexed = 25;
fassParser.RULE_indir_x = 26;
fassParser.RULE_indir_y = 27;
fassParser.RULE_indirect = 28;
fassParser.RULE_value = 29;
fassParser.RULE_constant = 30;
fassParser.RULE_literal = 31;
fassParser.RULE_hex_bigend = 32;
fassParser.RULE_dec_bigend = 33;
fassParser.RULE_bin_bigend = 34;
fassParser.RULE_hex_litend = 35;
fassParser.RULE_dec_litend = 36;
fassParser.RULE_bin_litend = 37;
fassParser.RULE_brk_literal = 38;
fassParser.RULE_nop_literal = 39;
fassParser.RULE_string = 40;
fassParser.RULE_negative_number = 41;

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

	nop_brk_stmt() {
	    return this.getTypedRuleContext(Nop_brk_stmtContext,0);
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

	bit_shift_stmt() {
	    return this.getTypedRuleContext(Bit_shift_stmtContext,0);
	};

	logic_stmt() {
	    return this.getTypedRuleContext(Logic_stmtContext,0);
	};

	compare_stmt() {
	    return this.getTypedRuleContext(Compare_stmtContext,0);
	};

	bittest_stmt() {
	    return this.getTypedRuleContext(Bittest_stmtContext,0);
	};

	gosub_stmt() {
	    return this.getTypedRuleContext(Gosub_stmtContext,0);
	};

	return_stmt() {
	    return this.getTypedRuleContext(Return_stmtContext,0);
	};

	assign_stmt() {
	    return this.getTypedRuleContext(Assign_stmtContext,0);
	};

	arithmetic_stmt() {
	    return this.getTypedRuleContext(Arithmetic_stmtContext,0);
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

	hex_bigend() {
	    return this.getTypedRuleContext(Hex_bigendContext,0);
	};

	dec_bigend() {
	    return this.getTypedRuleContext(Dec_bigendContext,0);
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



class Nop_brk_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_nop_brk_stmt;
        this.mnemonic = null; // Token
    }

	NOP() {
	    return this.getToken(fassParser.NOP, 0);
	};

	BRK() {
	    return this.getToken(fassParser.BRK, 0);
	};

	value() {
	    return this.getTypedRuleContext(ValueContext,0);
	};

	NOP3() {
	    return this.getToken(fassParser.NOP3, 0);
	};

	NOP4() {
	    return this.getToken(fassParser.NOP4, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterNop_brk_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitNop_brk_stmt(this);
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
        this.lhs = null; // Token
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
        this.flag = null; // Token
        this.operand = null; // Token
    }

	DEC_BIGEND() {
	    return this.getToken(fassParser.DEC_BIGEND, 0);
	};

	OVERFLOW() {
	    return this.getToken(fassParser.OVERFLOW, 0);
	};

	CARRY() {
	    return this.getToken(fassParser.CARRY, 0);
	};

	INTERRUPT() {
	    return this.getToken(fassParser.INTERRUPT, 0);
	};

	DECIMAL_MODE() {
	    return this.getToken(fassParser.DECIMAL_MODE, 0);
	};

	ON_KWD() {
	    return this.getToken(fassParser.ON_KWD, 0);
	};

	OFF_KWD() {
	    return this.getToken(fassParser.OFF_KWD, 0);
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
        this.reg = null; // Token
        this.op = null; // Token
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



class Return_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_return_stmt;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class RetintContext extends Return_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	RETINT_KWD() {
	    return this.getToken(fassParser.RETINT_KWD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterRetint(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitRetint(this);
		}
	}


}

fassParser.RetintContext = RetintContext;

class ReturnContext extends Return_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	RETURN_KWD() {
	    return this.getToken(fassParser.RETURN_KWD, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterReturn(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitReturn(this);
		}
	}


}

fassParser.ReturnContext = ReturnContext;

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
        this.ref = null; // ReferenceContext
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



class Gosub_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_gosub_stmt;
        this.ref = null; // ReferenceContext
    }

	GOSUB_KWD() {
	    return this.getToken(fassParser.GOSUB_KWD, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterGosub_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitGosub_stmt(this);
		}
	}


}



class Assign_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_assign_stmt;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Assign_ref_reg_refContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.ref1 = null; // ReferenceContext;
        this.reg = null; // RegisterContext;
        this.ref2 = null; // ReferenceContext;
        super.copyFrom(ctx);
    }

	reference = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ReferenceContext);
	    } else {
	        return this.getTypedRuleContext(ReferenceContext,i);
	    }
	};

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_ref_reg_ref(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_ref_reg_ref(this);
		}
	}


}

fassParser.Assign_ref_reg_refContext = Assign_ref_reg_refContext;

class Assign_reg_regContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.reg1 = null; // Reg_axysContext;
        this.reg2 = null; // Reg_axysContext;
        super.copyFrom(ctx);
    }

	reg_axys = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(Reg_axysContext);
	    } else {
	        return this.getTypedRuleContext(Reg_axysContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_reg_reg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_reg_reg(this);
		}
	}


}

fassParser.Assign_reg_regContext = Assign_reg_regContext;

class Assign_reg_refContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.reg = null; // RegisterContext;
        this.ref = null; // ReferenceContext;
        super.copyFrom(ctx);
    }

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_reg_ref(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_reg_ref(this);
		}
	}


}

fassParser.Assign_reg_refContext = Assign_reg_refContext;

class Assign_ref_regContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.ref = null; // ReferenceContext;
        this.reg = null; // RegisterContext;
        super.copyFrom(ctx);
    }

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_ref_reg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_ref_reg(this);
		}
	}


}

fassParser.Assign_ref_regContext = Assign_ref_regContext;

class Assign_reg_litContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.reg = null; // RegisterContext;
        this.lit = null; // LiteralContext;
        super.copyFrom(ctx);
    }

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_reg_lit(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_reg_lit(this);
		}
	}


}

fassParser.Assign_reg_litContext = Assign_reg_litContext;

class Assign_ref_reg_litContext extends Assign_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.ref = null; // ReferenceContext;
        this.reg = null; // RegisterContext;
        this.lit = null; // LiteralContext;
        super.copyFrom(ctx);
    }

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterAssign_ref_reg_lit(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitAssign_ref_reg_lit(this);
		}
	}


}

fassParser.Assign_ref_reg_litContext = Assign_ref_reg_litContext;

class Arithmetic_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_arithmetic_stmt;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class Arithmetic_ref_litContext extends Arithmetic_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.ref = null; // ReferenceContext;
        this.op = null; // Token;
        this.lit = null; // LiteralContext;
        super.copyFrom(ctx);
    }

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterArithmetic_ref_lit(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitArithmetic_ref_lit(this);
		}
	}


}

fassParser.Arithmetic_ref_litContext = Arithmetic_ref_litContext;

class Arithmetic_a_litContext extends Arithmetic_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        this.lit = null; // LiteralContext;
        super.copyFrom(ctx);
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterArithmetic_a_lit(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitArithmetic_a_lit(this);
		}
	}


}

fassParser.Arithmetic_a_litContext = Arithmetic_a_litContext;

class Arithmetic_reg_incContext extends Arithmetic_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.reg = null; // RegisterContext;
        this.op = null; // Token;
        this.lit = null; // LiteralContext;
        super.copyFrom(ctx);
    }

	register() {
	    return this.getTypedRuleContext(RegisterContext,0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterArithmetic_reg_inc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitArithmetic_reg_inc(this);
		}
	}


}

fassParser.Arithmetic_reg_incContext = Arithmetic_reg_incContext;

class Arithmetic_a_refContext extends Arithmetic_stmtContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null; // Token;
        this.ref = null; // ReferenceContext;
        super.copyFrom(ctx);
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterArithmetic_a_ref(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitArithmetic_a_ref(this);
		}
	}


}

fassParser.Arithmetic_a_refContext = Arithmetic_a_refContext;

class Bit_shift_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_bit_shift_stmt;
        this.op = null; // Token
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBit_shift_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBit_shift_stmt(this);
		}
	}


}



class Logic_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_logic_stmt;
        this.op = null; // Token
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	AND_KWD() {
	    return this.getToken(fassParser.AND_KWD, 0);
	};

	OR_KWD() {
	    return this.getToken(fassParser.OR_KWD, 0);
	};

	XOR_KWD() {
	    return this.getToken(fassParser.XOR_KWD, 0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterLogic_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitLogic_stmt(this);
		}
	}


}



class Compare_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_compare_stmt;
    }

	COMPARE_KWD() {
	    return this.getToken(fassParser.COMPARE_KWD, 0);
	};

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	literal() {
	    return this.getTypedRuleContext(LiteralContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterCompare_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitCompare_stmt(this);
		}
	}


}



class Bittest_stmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_bittest_stmt;
        this.ref = null; // ReferenceContext
    }

	BITTEST_KWD() {
	    return this.getToken(fassParser.BITTEST_KWD, 0);
	};

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	reference() {
	    return this.getTypedRuleContext(ReferenceContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBittest_stmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBittest_stmt(this);
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

	name() {
	    return this.getTypedRuleContext(NameContext,0);
	};

	indexed() {
	    return this.getTypedRuleContext(IndexedContext,0);
	};

	indir_x() {
	    return this.getTypedRuleContext(Indir_xContext,0);
	};

	indir_y() {
	    return this.getTypedRuleContext(Indir_yContext,0);
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



class RegisterContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_register;
        this.reg_name = null; // Token
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	X() {
	    return this.getToken(fassParser.X, 0);
	};

	Y() {
	    return this.getToken(fassParser.Y, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterRegister(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitRegister(this);
		}
	}


}



class Reg_axysContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_reg_axys;
        this.reg_name = null; // Token
    }

	A() {
	    return this.getToken(fassParser.A, 0);
	};

	X() {
	    return this.getToken(fassParser.X, 0);
	};

	Y() {
	    return this.getToken(fassParser.Y, 0);
	};

	STACK() {
	    return this.getToken(fassParser.STACK, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterReg_axys(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitReg_axys(this);
		}
	}


}



class NameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_name;
        this.lbl = null; // Token
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterName(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitName(this);
		}
	}


}



class IndexedContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_indexed;
        this.lbl = null; // Token
        this.reg = null; // Token
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	X() {
	    return this.getToken(fassParser.X, 0);
	};

	Y() {
	    return this.getToken(fassParser.Y, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterIndexed(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitIndexed(this);
		}
	}


}



class Indir_xContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_indir_x;
        this.lbl = null; // Token
        this.reg = null; // Token
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	X() {
	    return this.getToken(fassParser.X, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterIndir_x(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitIndir_x(this);
		}
	}


}



class Indir_yContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_indir_y;
        this.lbl = null; // Token
        this.reg = null; // Token
    }

	IDENTIFIER() {
	    return this.getToken(fassParser.IDENTIFIER, 0);
	};

	Y() {
	    return this.getToken(fassParser.Y, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterIndir_y(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitIndir_y(this);
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
        this.lbl = null; // Token
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

	hex_bigend() {
	    return this.getTypedRuleContext(Hex_bigendContext,0);
	};

	hex_litend() {
	    return this.getTypedRuleContext(Hex_litendContext,0);
	};

	dec_bigend() {
	    return this.getTypedRuleContext(Dec_bigendContext,0);
	};

	dec_litend() {
	    return this.getTypedRuleContext(Dec_litendContext,0);
	};

	bin_bigend() {
	    return this.getTypedRuleContext(Bin_bigendContext,0);
	};

	bin_litend() {
	    return this.getTypedRuleContext(Bin_litendContext,0);
	};

	negative_number() {
	    return this.getTypedRuleContext(Negative_numberContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	brk_literal() {
	    return this.getTypedRuleContext(Brk_literalContext,0);
	};

	nop_literal() {
	    return this.getTypedRuleContext(Nop_literalContext,0);
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



class Hex_bigendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_hex_bigend;
    }

	HEX_BIGEND() {
	    return this.getToken(fassParser.HEX_BIGEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterHex_bigend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitHex_bigend(this);
		}
	}


}



class Dec_bigendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_dec_bigend;
    }

	DEC_BIGEND() {
	    return this.getToken(fassParser.DEC_BIGEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterDec_bigend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitDec_bigend(this);
		}
	}


}



class Bin_bigendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_bin_bigend;
    }

	BIN_BIGEND() {
	    return this.getToken(fassParser.BIN_BIGEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBin_bigend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBin_bigend(this);
		}
	}


}



class Hex_litendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_hex_litend;
    }

	HEX_LITEND() {
	    return this.getToken(fassParser.HEX_LITEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterHex_litend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitHex_litend(this);
		}
	}


}



class Dec_litendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_dec_litend;
    }

	DEC_LITEND() {
	    return this.getToken(fassParser.DEC_LITEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterDec_litend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitDec_litend(this);
		}
	}


}



class Bin_litendContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_bin_litend;
    }

	BIN_LITEND() {
	    return this.getToken(fassParser.BIN_LITEND, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterBin_litend(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitBin_litend(this);
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



class StringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = fassParser.RULE_string;
    }

	STRING() {
	    return this.getToken(fassParser.STRING, 0);
	};

	enterRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.enterString(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof fassListener ) {
	        listener.exitString(this);
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
fassParser.StatementContext = StatementContext; 
fassParser.AddressContext = AddressContext; 
fassParser.Address_stmtContext = Address_stmtContext; 
fassParser.Remote_label_stmtContext = Remote_label_stmtContext; 
fassParser.Filler_stmtContext = Filler_stmtContext; 
fassParser.Nop_brk_stmtContext = Nop_brk_stmtContext; 
fassParser.Const_stmtContext = Const_stmtContext; 
fassParser.Data_stmtContext = Data_stmtContext; 
fassParser.Flag_set_stmtContext = Flag_set_stmtContext; 
fassParser.Stack_stmtContext = Stack_stmtContext; 
fassParser.Return_stmtContext = Return_stmtContext; 
fassParser.Goto_stmtContext = Goto_stmtContext; 
fassParser.Gosub_stmtContext = Gosub_stmtContext; 
fassParser.Assign_stmtContext = Assign_stmtContext; 
fassParser.Arithmetic_stmtContext = Arithmetic_stmtContext; 
fassParser.Bit_shift_stmtContext = Bit_shift_stmtContext; 
fassParser.Logic_stmtContext = Logic_stmtContext; 
fassParser.Compare_stmtContext = Compare_stmtContext; 
fassParser.Bittest_stmtContext = Bittest_stmtContext; 
fassParser.LabelContext = LabelContext; 
fassParser.ReferenceContext = ReferenceContext; 
fassParser.RegisterContext = RegisterContext; 
fassParser.Reg_axysContext = Reg_axysContext; 
fassParser.NameContext = NameContext; 
fassParser.IndexedContext = IndexedContext; 
fassParser.Indir_xContext = Indir_xContext; 
fassParser.Indir_yContext = Indir_yContext; 
fassParser.IndirectContext = IndirectContext; 
fassParser.ValueContext = ValueContext; 
fassParser.ConstantContext = ConstantContext; 
fassParser.LiteralContext = LiteralContext; 
fassParser.Hex_bigendContext = Hex_bigendContext; 
fassParser.Dec_bigendContext = Dec_bigendContext; 
fassParser.Bin_bigendContext = Bin_bigendContext; 
fassParser.Hex_litendContext = Hex_litendContext; 
fassParser.Dec_litendContext = Dec_litendContext; 
fassParser.Bin_litendContext = Bin_litendContext; 
fassParser.Brk_literalContext = Brk_literalContext; 
fassParser.Nop_literalContext = Nop_literalContext; 
fassParser.StringContext = StringContext; 
fassParser.Negative_numberContext = Negative_numberContext; 
