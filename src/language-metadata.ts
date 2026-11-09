/*
 * Built-in language metadata: badge colour + optional abbreviation
 *
 * Recovered from the released esbuild bundle so the source stays byte-for-byte
 * faithful to the behaviour of the plugin that was already installed.
 */

export interface LanguageMetadata {
	color: string;
	abbr?: string;
}

export const LANGUAGE_METADATA: Record<string, LanguageMetadata> = {
  "abap": {
    "color": "blue"
  },
  "actionscript": {
    "color": "orange",
    "abbr": "AS"
  },
  "ada": {
    "color": "blue"
  },
  "agda": {
    "color": "purple"
  },
  "apache": {
    "color": "red",
    "abbr": "AP"
  },
  "apex": {
    "color": "blue"
  },
  "apl": {
    "color": "green"
  },
  "applescript": {
    "color": "purple",
    "abbr": "AS"
  },
  "arduino": {
    "color": "cyan",
    "abbr": "AR"
  },
  "asciidoc": {
    "color": "blue",
    "abbr": "AD"
  },
  "asm": {
    "color": "slate",
    "abbr": "ASM"
  },
  "aspectj": {
    "color": "green"
  },
  "autohotkey": {
    "color": "green",
    "abbr": "AHK"
  },
  "autoit": {
    "color": "blue"
  },
  "awk": {
    "color": "green"
  },
  "bash": {
    "color": "green",
    "abbr": "SH"
  },
  "basic": {
    "color": "blue"
  },
  "batch": {
    "color": "green",
    "abbr": "BAT"
  },
  "bison": {
    "color": "orange"
  },
  "brainfuck": {
    "color": "red",
    "abbr": "BF"
  },
  "c": {
    "color": "blue",
    "abbr": "C"
  },
  "clojure": {
    "color": "green",
    "abbr": "CLJ"
  },
  "cobol": {
    "color": "blue"
  },
  "coffeescript": {
    "color": "brown",
    "abbr": "CS"
  },
  "coldfusion": {
    "color": "blue",
    "abbr": "CF"
  },
  "cpp": {
    "color": "blue",
    "abbr": "C++"
  },
  "crystal": {
    "color": "slate",
    "abbr": "CR"
  },
  "csharp": {
    "color": "purple",
    "abbr": "C#"
  },
  "css": {
    "color": "blue",
    "abbr": "CSS"
  },
  "cuda": {
    "color": "green"
  },
  "d": {
    "color": "red",
    "abbr": "D"
  },
  "dart": {
    "color": "cyan",
    "abbr": "DT"
  },
  "delphi": {
    "color": "red",
    "abbr": "DL"
  },
  "diff": {
    "color": "slate"
  },
  "django": {
    "color": "green",
    "abbr": "DJ"
  },
  "dockerfile": {
    "color": "blue",
    "abbr": "DF"
  },
  "elixir": {
    "color": "purple",
    "abbr": "EX"
  },
  "elm": {
    "color": "blue",
    "abbr": "EL"
  },
  "erlang": {
    "color": "red",
    "abbr": "ER"
  },
  "fortran": {
    "color": "purple",
    "abbr": "FT"
  },
  "fsharp": {
    "color": "cyan",
    "abbr": "F#"
  },
  "gherkin": {
    "color": "green"
  },
  "glsl": {
    "color": "green"
  },
  "go": {
    "color": "cyan",
    "abbr": "GO"
  },
  "graphql": {
    "color": "pink",
    "abbr": "GQL"
  },
  "groovy": {
    "color": "green",
    "abbr": "GY"
  },
  "hack": {
    "color": "yellow"
  },
  "haml": {
    "color": "red"
  },
  "handlebars": {
    "color": "orange",
    "abbr": "HB"
  },
  "haskell": {
    "color": "purple",
    "abbr": "HS"
  },
  "haxe": {
    "color": "orange",
    "abbr": "HX"
  },
  "hcl": {
    "color": "purple"
  },
  "hlsl": {
    "color": "green"
  },
  "html": {
    "color": "orange",
    "abbr": "HTML"
  },
  "idris": {
    "color": "red"
  },
  "ini": {
    "color": "slate"
  },
  "java": {
    "color": "orange",
    "abbr": "JV"
  },
  "javascript": {
    "color": "yellow",
    "abbr": "JS"
  },
  "jinja": {
    "color": "red"
  },
  "json": {
    "color": "blue",
    "abbr": "JSON"
  },
  "json5": {
    "color": "blue"
  },
  "jsonc": {
    "color": "blue"
  },
  "jsx": {
    "color": "cyan",
    "abbr": "JSX"
  },
  "julia": {
    "color": "purple",
    "abbr": "JL"
  },
  "kotlin": {
    "color": "purple",
    "abbr": "KT"
  },
  "latex": {
    "color": "green",
    "abbr": "TEX"
  },
  "less": {
    "color": "blue"
  },
  "lisp": {
    "color": "red",
    "abbr": "LP"
  },
  "livescript": {
    "color": "blue"
  },
  "llvm": {
    "color": "blue"
  },
  "lua": {
    "color": "blue",
    "abbr": "LUA"
  },
  "makefile": {
    "color": "red",
    "abbr": "MK"
  },
  "markdown": {
    "color": "blue",
    "abbr": "MD"
  },
  "matlab": {
    "color": "orange",
    "abbr": "ML"
  },
  "mermaid": {
    "color": "pink",
    "abbr": "MM"
  },
  "nginx": {
    "color": "green"
  },
  "nim": {
    "color": "yellow",
    "abbr": "NM"
  },
  "nix": {
    "color": "blue"
  },
  "objectivec": {
    "color": "blue",
    "abbr": "OC"
  },
  "ocaml": {
    "color": "orange",
    "abbr": "ML"
  },
  "pascal": {
    "color": "blue",
    "abbr": "PS"
  },
  "perl": {
    "color": "purple",
    "abbr": "PL"
  },
  "php": {
    "color": "purple",
    "abbr": "PHP"
  },
  "plaintext": {
    "color": "slate",
    "abbr": "TXT"
  },
  "plsql": {
    "color": "red"
  },
  "postgresql": {
    "color": "blue",
    "abbr": "PG"
  },
  "powershell": {
    "color": "cyan",
    "abbr": "PS"
  },
  "processing": {
    "color": "blue"
  },
  "prolog": {
    "color": "red"
  },
  "protobuf": {
    "color": "blue",
    "abbr": "PB"
  },
  "puppet": {
    "color": "orange"
  },
  "python": {
    "color": "blue",
    "abbr": "PY"
  },
  "qml": {
    "color": "green"
  },
  "r": {
    "color": "blue",
    "abbr": "R"
  },
  "racket": {
    "color": "red"
  },
  "razor": {
    "color": "purple"
  },
  "reason": {
    "color": "orange"
  },
  "regex": {
    "color": "yellow",
    "abbr": "RE"
  },
  "ruby": {
    "color": "red",
    "abbr": "RB"
  },
  "rust": {
    "color": "orange",
    "abbr": "RS"
  },
  "sass": {
    "color": "pink",
    "abbr": "SC"
  },
  "scala": {
    "color": "red",
    "abbr": "SC"
  },
  "scheme": {
    "color": "red"
  },
  "scss": {
    "color": "pink",
    "abbr": "SC"
  },
  "shell": {
    "color": "green",
    "abbr": "SH"
  },
  "solidity": {
    "color": "slate",
    "abbr": "SOL"
  },
  "sql": {
    "color": "orange",
    "abbr": "SQL"
  },
  "stylus": {
    "color": "green"
  },
  "svelte": {
    "color": "orange",
    "abbr": "SV"
  },
  "swift": {
    "color": "orange",
    "abbr": "SW"
  },
  "tcl": {
    "color": "blue"
  },
  "terraform": {
    "color": "purple",
    "abbr": "TF"
  },
  "tex": {
    "color": "green"
  },
  "toml": {
    "color": "slate"
  },
  "tsx": {
    "color": "cyan",
    "abbr": "TSX"
  },
  "twig": {
    "color": "green"
  },
  "typescript": {
    "color": "blue",
    "abbr": "TS"
  },
  "vbnet": {
    "color": "purple",
    "abbr": "VB"
  },
  "verilog": {
    "color": "red"
  },
  "vhdl": {
    "color": "blue"
  },
  "vim": {
    "color": "green"
  },
  "vue": {
    "color": "green",
    "abbr": "VUE"
  },
  "wasm": {
    "color": "purple"
  },
  "xml": {
    "color": "orange",
    "abbr": "XML"
  },
  "xsl": {
    "color": "orange"
  },
  "yaml": {
    "color": "red",
    "abbr": "YML"
  },
  "zig": {
    "color": "orange",
    "abbr": "ZG"
  },
  "abc": {
    "color": "blue"
  },
  "al": {
    "color": "blue"
  },
  "alloy": {
    "color": "blue"
  },
  "angelscript": {
    "color": "green"
  },
  "antlr": {
    "color": "orange"
  },
  "apacheconf": {
    "color": "red"
  },
  "apexcode": {
    "color": "blue"
  },
  "apl2": {
    "color": "green"
  },
  "apple": {
    "color": "slate"
  },
  "arff": {
    "color": "blue"
  },
  "asciidoctor": {
    "color": "blue"
  },
  "asp": {
    "color": "blue"
  },
  "aspnet": {
    "color": "purple"
  },
  "asymptote": {
    "color": "red"
  },
  "ats": {
    "color": "red"
  },
  "autoconf": {
    "color": "green"
  },
  "automake": {
    "color": "green"
  },
  "avro": {
    "color": "blue"
  },
  "awk2": {
    "color": "green"
  },
  "axapta": {
    "color": "blue"
  },
  "b3d": {
    "color": "blue"
  },
  "backusnaur": {
    "color": "blue"
  },
  "bal": {
    "color": "green"
  },
  "bbcode": {
    "color": "blue"
  },
  "bdf": {
    "color": "slate"
  },
  "bibtex": {
    "color": "green"
  },
  "bicep": {
    "color": "blue"
  },
  "bind": {
    "color": "red"
  },
  "bitbake": {
    "color": "blue"
  },
  "bnf": {
    "color": "blue"
  },
  "boo": {
    "color": "green"
  },
  "bpel": {
    "color": "blue"
  },
  "brs": {
    "color": "blue"
  },
  "c3": {
    "color": "blue"
  },
  "caddyfile": {
    "color": "blue"
  },
  "cadl": {
    "color": "blue"
  },
  "cairo": {
    "color": "orange"
  },
  "cameligo": {
    "color": "blue"
  },
  "capnproto": {
    "color": "blue"
  },
  "ceylon": {
    "color": "yellow"
  },
  "cfml": {
    "color": "blue"
  },
  "cgi": {
    "color": "green"
  },
  "cisco": {
    "color": "blue"
  },
  "clean": {
    "color": "blue"
  },
  "clojurescript": {
    "color": "green"
  },
  "cmake": {
    "color": "blue"
  },
  "cobolfree": {
    "color": "blue"
  },
  "coffeescript2": {
    "color": "brown"
  },
  "commonlisp": {
    "color": "red"
  },
  "componentpascal": {
    "color": "blue"
  },
  "coq": {
    "color": "red"
  },
  "crmsh": {
    "color": "blue"
  },
  "crystal2": {
    "color": "slate"
  },
  "csp": {
    "color": "blue"
  },
  "css2": {
    "color": "blue"
  },
  "csv": {
    "color": "green"
  },
  "cypher": {
    "color": "green"
  },
  "d2": {
    "color": "red"
  },
  "dafny": {
    "color": "blue"
  },
  "dart2": {
    "color": "cyan"
  },
  "dataweave": {
    "color": "blue"
  },
  "dax": {
    "color": "blue"
  },
  "debiancontrol": {
    "color": "red"
  },
  "denizenscript": {
    "color": "blue"
  },
  "dhall": {
    "color": "blue"
  },
  "digdag": {
    "color": "blue"
  },
  "django2": {
    "color": "green"
  },
  "dns": {
    "color": "blue"
  },
  "docker": {
    "color": "blue"
  },
  "dot": {
    "color": "blue"
  },
  "doxygen": {
    "color": "blue"
  },
  "dtd": {
    "color": "blue"
  },
  "dylan": {
    "color": "blue"
  },
  "ebnf": {
    "color": "blue"
  },
  "ecl": {
    "color": "blue"
  },
  "ecss": {
    "color": "blue"
  },
  "eiffel": {
    "color": "blue"
  },
  "ejs": {
    "color": "yellow"
  },
  "elisp": {
    "color": "purple"
  },
  "elixir2": {
    "color": "purple"
  },
  "elm2": {
    "color": "blue"
  },
  "erb": {
    "color": "red"
  },
  "erlang2": {
    "color": "red"
  },
  "excel": {
    "color": "green"
  },
  "factor": {
    "color": "green"
  },
  "fancy": {
    "color": "pink"
  },
  "fantom": {
    "color": "blue"
  },
  "faust": {
    "color": "orange"
  },
  "fennel": {
    "color": "green"
  },
  "fish": {
    "color": "green"
  },
  "flat": {
    "color": "blue"
  },
  "forth": {
    "color": "red"
  },
  "fortranfixed": {
    "color": "purple"
  },
  "freemarker": {
    "color": "blue"
  },
  "fsharp2": {
    "color": "cyan"
  },
  "gams": {
    "color": "blue"
  },
  "gauss": {
    "color": "blue"
  },
  "gcode": {
    "color": "orange"
  },
  "gdscript": {
    "color": "blue"
  },
  "gedcom": {
    "color": "blue"
  },
  "gemfile": {
    "color": "red"
  },
  "gherkin2": {
    "color": "green"
  },
  "glimmer": {
    "color": "orange"
  },
  "glsl2": {
    "color": "green"
  },
  "gml": {
    "color": "green"
  },
  "gnuplot": {
    "color": "red"
  },
  "go2": {
    "color": "cyan"
  },
  "golo": {
    "color": "orange"
  },
  "gradle": {
    "color": "blue"
  },
  "graphql2": {
    "color": "pink"
  },
  "groovy2": {
    "color": "green"
  },
  "haml2": {
    "color": "red"
  },
  "handlebars2": {
    "color": "orange"
  },
  "haskell2": {
    "color": "purple"
  },
  "haxe2": {
    "color": "orange"
  },
  "hcl2": {
    "color": "purple"
  },
  "hlsl2": {
    "color": "green"
  },
  "http": {
    "color": "blue"
  },
  "hy": {
    "color": "blue"
  },
  "hylo": {
    "color": "blue"
  },
  "icl": {
    "color": "blue"
  },
  "icon": {
    "color": "blue"
  },
  "idl": {
    "color": "blue"
  },
  "idris2": {
    "color": "red"
  },
  "igor": {
    "color": "blue"
  },
  "inform7": {
    "color": "blue"
  },
  "ini2": {
    "color": "slate"
  },
  "io": {
    "color": "blue"
  },
  "ioke": {
    "color": "blue"
  },
  "irb": {
    "color": "red"
  },
  "irc": {
    "color": "blue"
  },
  "isbl": {
    "color": "blue"
  },
  "j": {
    "color": "blue"
  },
  "jade": {
    "color": "green"
  },
  "java2": {
    "color": "orange"
  },
  "javascript2": {
    "color": "yellow"
  },
  "jbosscli": {
    "color": "red"
  },
  "jcl": {
    "color": "blue"
  },
  "jinja2": {
    "color": "red"
  },
  "json2": {
    "color": "blue"
  },
  "jsp": {
    "color": "orange"
  },
  "julia2": {
    "color": "purple"
  },
  "k": {
    "color": "blue"
  },
  "kconfig": {
    "color": "blue"
  },
  "kivy": {
    "color": "green"
  },
  "kotlin2": {
    "color": "purple"
  },
  "lasso": {
    "color": "blue"
  },
  "latte": {
    "color": "blue"
  },
  "lean": {
    "color": "red"
  },
  "less2": {
    "color": "blue"
  },
  "lfe": {
    "color": "purple"
  },
  "lilypond": {
    "color": "green"
  },
  "limbo": {
    "color": "blue"
  },
  "liquid": {
    "color": "green"
  },
  "lisp2": {
    "color": "red"
  },
  "livescript2": {
    "color": "blue"
  },
  "llvm2": {
    "color": "blue"
  },
  "log": {
    "color": "slate"
  },
  "logtalk": {
    "color": "blue"
  },
  "lsl": {
    "color": "blue"
  },
  "lua2": {
    "color": "blue"
  },
  "m3": {
    "color": "blue"
  },
  "m4": {
    "color": "blue"
  },
  "makefile2": {
    "color": "red"
  },
  "markdown2": {
    "color": "blue"
  },
  "mathematica": {
    "color": "orange"
  },
  "matlab2": {
    "color": "orange"
  },
  "maxima": {
    "color": "blue"
  },
  "mel": {
    "color": "blue"
  },
  "mercury": {
    "color": "blue"
  },
  "meson": {
    "color": "green"
  },
  "metal": {
    "color": "orange"
  },
  "minizinc": {
    "color": "blue"
  },
  "mlir": {
    "color": "purple"
  },
  "mojolicious": {
    "color": "red"
  },
  "monkey": {
    "color": "blue"
  },
  "moonscript": {
    "color": "blue"
  },
  "motoko": {
    "color": "purple"
  },
  "n1ql": {
    "color": "blue"
  },
  "nasm": {
    "color": "blue"
  },
  "nestedtext": {
    "color": "green"
  },
  "newlisp": {
    "color": "red"
  },
  "nginx2": {
    "color": "green"
  },
  "nim2": {
    "color": "yellow"
  },
  "nix2": {
    "color": "blue"
  },
  "nsis": {
    "color": "blue"
  },
  "objectivec2": {
    "color": "blue"
  },
  "ocaml2": {
    "color": "orange"
  },
  "odin": {
    "color": "blue"
  },
  "ooc": {
    "color": "blue"
  },
  "opa": {
    "color": "blue"
  },
  "opencl": {
    "color": "blue"
  },
  "openedge": {
    "color": "blue"
  },
  "openscad": {
    "color": "orange"
  },
  "org": {
    "color": "green"
  },
  "oz": {
    "color": "blue"
  },
  "paraigmparaiso": {
    "color": "blue"
  },
  "parser3": {
    "color": "blue"
  },
  "pascal2": {
    "color": "blue"
  },
  "pcre": {
    "color": "green"
  },
  "perl2": {
    "color": "purple"
  },
  "pf": {
    "color": "blue"
  },
  "pgsql": {
    "color": "blue"
  },
  "php2": {
    "color": "purple"
  },
  "phpdoc": {
    "color": "purple"
  },
  "plaintext2": {
    "color": "slate"
  },
  "pony": {
    "color": "red"
  },
  "postcss": {
    "color": "blue"
  },
  "powershell2": {
    "color": "cyan"
  },
  "processing2": {
    "color": "blue"
  },
  "profile": {
    "color": "blue"
  },
  "prolog2": {
    "color": "red"
  },
  "prometheus": {
    "color": "orange"
  },
  "properties": {
    "color": "blue"
  },
  "protobuf2": {
    "color": "blue"
  },
  "puppet2": {
    "color": "orange"
  },
  "purebasic": {
    "color": "blue"
  },
  "purescript": {
    "color": "slate"
  },
  "python2": {
    "color": "blue"
  },
  "q": {
    "color": "blue"
  },
  "qsharp": {
    "color": "purple"
  },
  "r2": {
    "color": "blue"
  },
  "racket2": {
    "color": "red"
  },
  "reason2": {
    "color": "orange"
  },
  "regex2": {
    "color": "yellow"
  },
  "renpy": {
    "color": "pink"
  },
  "rest": {
    "color": "blue"
  },
  "rib": {
    "color": "blue"
  },
  "roboconf": {
    "color": "blue"
  },
  "robot": {
    "color": "blue"
  },
  "rpgle": {
    "color": "blue"
  },
  "ruby2": {
    "color": "red"
  },
  "rust2": {
    "color": "orange"
  },
  "sas": {
    "color": "blue"
  },
  "sass2": {
    "color": "pink"
  },
  "scala2": {
    "color": "red"
  },
  "scheme2": {
    "color": "red"
  },
  "scilab": {
    "color": "blue"
  },
  "scss2": {
    "color": "pink"
  },
  "shell2": {
    "color": "green"
  },
  "smali": {
    "color": "blue"
  },
  "smalltalk": {
    "color": "blue"
  },
  "sml": {
    "color": "blue"
  },
  "sqf": {
    "color": "blue"
  },
  "sql2": {
    "color": "orange"
  },
  "stan": {
    "color": "red"
  },
  "stata": {
    "color": "blue"
  },
  "step21": {
    "color": "blue"
  },
  "stylus2": {
    "color": "green"
  },
  "subunit": {
    "color": "blue"
  },
  "swift2": {
    "color": "orange"
  },
  "taggerscript": {
    "color": "blue"
  },
  "tcl2": {
    "color": "blue"
  },
  "terraform2": {
    "color": "purple"
  },
  "tex2": {
    "color": "green"
  },
  "thrift": {
    "color": "blue"
  },
  "toml2": {
    "color": "slate"
  },
  "tsql": {
    "color": "blue"
  },
  "twig2": {
    "color": "green"
  },
  "typescript2": {
    "color": "blue"
  },
  "vala": {
    "color": "blue"
  },
  "vbnet2": {
    "color": "purple"
  },
  "vbscript": {
    "color": "blue"
  },
  "verilog2": {
    "color": "red"
  },
  "vhdl2": {
    "color": "blue"
  },
  "vim2": {
    "color": "green"
  },
  "vue2": {
    "color": "green"
  },
  "wasm2": {
    "color": "purple"
  },
  "webidl": {
    "color": "blue"
  },
  "wgsl": {
    "color": "blue"
  },
  "wiki": {
    "color": "blue"
  },
  "wolfram": {
    "color": "orange"
  },
  "wren": {
    "color": "blue"
  },
  "x86asm": {
    "color": "blue"
  },
  "xbasic": {
    "color": "blue"
  },
  "xml2": {
    "color": "orange"
  },
  "xojo": {
    "color": "purple"
  },
  "xquery": {
    "color": "blue"
  },
  "xsl2": {
    "color": "orange"
  },
  "yaml2": {
    "color": "red"
  },
  "yang": {
    "color": "blue"
  },
  "zephir": {
    "color": "blue"
  },
  "zig2": {
    "color": "orange"
  },
  "zil": {
    "color": "blue"
  }
};
