// Suggestion data for the editor's autocomplete (VS Code style).
// item: [label, kind, detail]   kinds: keyword | function | type | macro | member | header | directive

const C_KEYWORDS =
  "auto break case char const continue default do double else enum extern float for goto if inline int long register restrict return short signed sizeof static struct switch typedef union unsigned void volatile while".split(
    " "
  );
const CPP_KEYWORDS =
  "alignas auto bool break case catch char class const constexpr continue decltype default delete do double else enum explicit extern false final float for friend if inline int long mutable namespace new noexcept nullptr operator override private protected public return short signed sizeof static static_cast struct switch template this throw true try typedef typename union unsigned using virtual void volatile while".split(
    " "
  );

const C_LIB = [
  // stdio.h
  ["printf", "function", "int printf(const char *format, ...)"],
  ["scanf", "function", "int scanf(const char *format, ...)"],
  ["sprintf", "function", "int sprintf(char *str, const char *format, ...)"],
  [
    "snprintf",
    "function",
    "int snprintf(char *str, size_t n, const char *format, ...)",
  ],
  [
    "sscanf",
    "function",
    "int sscanf(const char *str, const char *format, ...)",
  ],
  ["fprintf", "function", "int fprintf(FILE *stream, const char *format, ...)"],
  ["fscanf", "function", "int fscanf(FILE *stream, const char *format, ...)"],
  ["puts", "function", "int puts(const char *s)"],
  ["putchar", "function", "int putchar(int c)"],
  ["getchar", "function", "int getchar(void)"],
  ["fgets", "function", "char *fgets(char *s, int size, FILE *stream)"],
  ["fputs", "function", "int fputs(const char *s, FILE *stream)"],
  ["fflush", "function", "int fflush(FILE *stream)"],
  ["stdin", "macro", "FILE *stdin"],
  ["stdout", "macro", "FILE *stdout"],
  ["stderr", "macro", "FILE *stderr"],
  ["FILE", "type", "stdio.h"],
  ["EOF", "macro", "end of file (-1)"],
  ["NULL", "macro", "null pointer"],
  // stdlib.h
  ["malloc", "function", "void *malloc(size_t size)"],
  ["calloc", "function", "void *calloc(size_t n, size_t size)"],
  ["realloc", "function", "void *realloc(void *ptr, size_t size)"],
  ["free", "function", "void free(void *ptr)"],
  ["exit", "function", "void exit(int status)"],
  ["abort", "function", "void abort(void)"],
  ["abs", "function", "int abs(int x)"],
  ["labs", "function", "long labs(long x)"],
  ["atoi", "function", "int atoi(const char *s)"],
  ["atol", "function", "long atol(const char *s)"],
  ["atof", "function", "double atof(const char *s)"],
  ["strtol", "function", "long strtol(const char *s, char **end, int base)"],
  ["rand", "function", "int rand(void)"],
  ["srand", "function", "void srand(unsigned seed)"],
  [
    "qsort",
    "function",
    "void qsort(void *base, size_t n, size_t size, int (*cmp)(const void *, const void *))",
  ],
  [
    "bsearch",
    "function",
    "void *bsearch(const void *key, const void *base, size_t n, size_t size, cmp)",
  ],
  ["RAND_MAX", "macro", "stdlib.h"],
  ["EXIT_SUCCESS", "macro", "0"],
  ["EXIT_FAILURE", "macro", "1"],
  ["size_t", "type", "unsigned size type"],
  // string.h
  ["strlen", "function", "size_t strlen(const char *s)"],
  ["strcpy", "function", "char *strcpy(char *dest, const char *src)"],
  [
    "strncpy",
    "function",
    "char *strncpy(char *dest, const char *src, size_t n)",
  ],
  ["strcat", "function", "char *strcat(char *dest, const char *src)"],
  [
    "strncat",
    "function",
    "char *strncat(char *dest, const char *src, size_t n)",
  ],
  ["strcmp", "function", "int strcmp(const char *a, const char *b)"],
  [
    "strncmp",
    "function",
    "int strncmp(const char *a, const char *b, size_t n)",
  ],
  ["strchr", "function", "char *strchr(const char *s, int c)"],
  ["strrchr", "function", "char *strrchr(const char *s, int c)"],
  [
    "strstr",
    "function",
    "char *strstr(const char *haystack, const char *needle)",
  ],
  ["strtok", "function", "char *strtok(char *s, const char *delim)"],
  ["strdup", "function", "char *strdup(const char *s)"],
  ["memset", "function", "void *memset(void *s, int c, size_t n)"],
  ["memcpy", "function", "void *memcpy(void *dest, const void *src, size_t n)"],
  [
    "memmove",
    "function",
    "void *memmove(void *dest, const void *src, size_t n)",
  ],
  ["memcmp", "function", "int memcmp(const void *a, const void *b, size_t n)"],
  // math.h
  ["sqrt", "function", "double sqrt(double x)"],
  ["pow", "function", "double pow(double x, double y)"],
  ["fabs", "function", "double fabs(double x)"],
  ["floor", "function", "double floor(double x)"],
  ["ceil", "function", "double ceil(double x)"],
  ["round", "function", "double round(double x)"],
  ["fmod", "function", "double fmod(double x, double y)"],
  ["log", "function", "double log(double x)"],
  ["log2", "function", "double log2(double x)"],
  ["log10", "function", "double log10(double x)"],
  ["exp", "function", "double exp(double x)"],
  ["sin", "function", "double sin(double x)"],
  ["cos", "function", "double cos(double x)"],
  ["tan", "function", "double tan(double x)"],
  ["atan2", "function", "double atan2(double y, double x)"],
  ["M_PI", "macro", "3.14159…"],
  // ctype.h
  ["isalpha", "function", "int isalpha(int c)"],
  ["isdigit", "function", "int isdigit(int c)"],
  ["isalnum", "function", "int isalnum(int c)"],
  ["isupper", "function", "int isupper(int c)"],
  ["islower", "function", "int islower(int c)"],
  ["isspace", "function", "int isspace(int c)"],
  ["toupper", "function", "int toupper(int c)"],
  ["tolower", "function", "int tolower(int c)"],
  // limits / stdint / stdbool / time / assert
  ["INT_MAX", "macro", "limits.h"],
  ["INT_MIN", "macro", "limits.h"],
  ["LONG_MAX", "macro", "limits.h"],
  ["LLONG_MAX", "macro", "limits.h"],
  ["LLONG_MIN", "macro", "limits.h"],
  ["UINT_MAX", "macro", "limits.h"],
  ["CHAR_BIT", "macro", "limits.h"],
  ["int8_t", "type", "stdint.h"],
  ["int16_t", "type", "stdint.h"],
  ["int32_t", "type", "stdint.h"],
  ["int64_t", "type", "stdint.h"],
  ["uint8_t", "type", "stdint.h"],
  ["uint16_t", "type", "stdint.h"],
  ["uint32_t", "type", "stdint.h"],
  ["uint64_t", "type", "stdint.h"],
  ["bool", "type", "stdbool.h"],
  ["true", "macro", "stdbool.h"],
  ["false", "macro", "stdbool.h"],
  ["time", "function", "time_t time(time_t *t)"],
  ["clock", "function", "clock_t clock(void)"],
  ["CLOCKS_PER_SEC", "macro", "time.h"],
  ["assert", "macro", "void assert(expression)"],
];

const CPP_LIB = [
  ["std", "keyword", "namespace"],
  ["cout", "function", "std::ostream cout"],
  ["cin", "function", "std::istream cin"],
  ["cerr", "function", "std::ostream cerr"],
  ["endl", "function", "std::endl"],
  ["getline", "function", "getline(istream &in, string &s)"],
  ["vector", "type", "std::vector<T>"],
  ["string", "type", "std::string"],
  ["map", "type", "std::map<K, V>"],
  ["unordered_map", "type", "std::unordered_map<K, V>"],
  ["set", "type", "std::set<T>"],
  ["unordered_set", "type", "std::unordered_set<T>"],
  ["multiset", "type", "std::multiset<T>"],
  ["multimap", "type", "std::multimap<K, V>"],
  ["pair", "type", "std::pair<A, B>"],
  ["make_pair", "function", "make_pair(a, b)"],
  ["tuple", "type", "std::tuple<...>"],
  ["array", "type", "std::array<T, N>"],
  ["deque", "type", "std::deque<T>"],
  ["list", "type", "std::list<T>"],
  ["stack", "type", "std::stack<T>"],
  ["queue", "type", "std::queue<T>"],
  ["priority_queue", "type", "std::priority_queue<T>"],
  ["bitset", "type", "std::bitset<N>"],
  ["greater", "type", "std::greater<T>"],
  ["less", "type", "std::less<T>"],
  ["sort", "function", "sort(first, last[, cmp])"],
  ["stable_sort", "function", "stable_sort(first, last[, cmp])"],
  ["reverse", "function", "reverse(first, last)"],
  ["max", "function", "const T &max(const T &a, const T &b)"],
  ["min", "function", "const T &min(const T &a, const T &b)"],
  ["swap", "function", "void swap(T &a, T &b)"],
  ["abs", "function", "abs(x)"],
  ["accumulate", "function", "accumulate(first, last, init)"],
  ["iota", "function", "iota(first, last, value)"],
  ["fill", "function", "fill(first, last, value)"],
  ["lower_bound", "function", "lower_bound(first, last, value)"],
  ["upper_bound", "function", "upper_bound(first, last, value)"],
  ["binary_search", "function", "binary_search(first, last, value)"],
  ["unique", "function", "unique(first, last)"],
  ["next_permutation", "function", "next_permutation(first, last)"],
  ["find", "function", "find(first, last, value)"],
  ["count", "function", "count(first, last, value)"],
  ["max_element", "function", "max_element(first, last)"],
  ["min_element", "function", "min_element(first, last)"],
  ["to_string", "function", "std::string to_string(value)"],
  ["stoi", "function", "int stoi(const string &s)"],
  ["stoll", "function", "long long stoll(const string &s)"],
  ["stod", "function", "double stod(const string &s)"],
  ["sqrt", "function", "double sqrt(double x)"],
  ["pow", "function", "double pow(double x, double y)"],
  ["numeric_limits", "type", "std::numeric_limits<T>"],
  ["stringstream", "type", "std::stringstream"],
  ["ios", "type", "std::ios"],
  ["sync_with_stdio", "function", "ios::sync_with_stdio(bool)"],
  ["nullptr", "keyword", "null pointer literal"],
  ["size_t", "type", "unsigned size type"],
  ["int64_t", "type", "<cstdint>"],
  ["uint64_t", "type", "<cstdint>"],
  ["INT_MAX", "macro", "<climits>"],
  ["INT_MIN", "macro", "<climits>"],
  ["LLONG_MAX", "macro", "<climits>"],
  ["printf", "function", "int printf(const char *format, ...)"],
  ["scanf", "function", "int scanf(const char *format, ...)"],
  ["memset", "function", "void *memset(void *s, int c, size_t n)"],
  ["assert", "macro", "assert(expression)"],
];

const MEMBERS = [
  ["push_back", "member", "append an element"],
  ["pop_back", "member", "remove the last element"],
  ["emplace_back", "member", "construct an element at the end"],
  ["push_front", "member", "insert at the front"],
  ["pop_front", "member", "remove the first element"],
  ["push", "member", "stack / queue / priority_queue"],
  ["pop", "member", "stack / queue / priority_queue"],
  ["top", "member", "stack / priority_queue"],
  ["front", "member", "first element"],
  ["back", "member", "last element"],
  ["size", "member", "number of elements"],
  ["length", "member", "string length"],
  ["empty", "member", "is it empty?"],
  ["clear", "member", "remove all elements"],
  ["begin", "member", "iterator to the start"],
  ["end", "member", "iterator past the end"],
  ["rbegin", "member", "reverse iterator"],
  ["rend", "member", "reverse iterator"],
  ["insert", "member", "insert elements"],
  ["erase", "member", "remove elements"],
  ["find", "member", "look up an element or key"],
  ["count", "member", "count matching elements"],
  ["at", "member", "bounds-checked access"],
  ["resize", "member", "change the size"],
  ["assign", "member", "replace the contents"],
  ["substr", "member", "string::substr(pos, len)"],
  ["c_str", "member", "const char * of a string"],
  ["first", "member", "pair.first"],
  ["second", "member", "pair.second"],
  ["lower_bound", "member", "set / map"],
  ["upper_bound", "member", "set / map"],
  ["swap", "member", "swap with another container"],
];

const HEADERS_C =
  "stdio.h stdlib.h string.h math.h ctype.h limits.h stdbool.h stdint.h time.h assert.h float.h stddef.h inttypes.h errno.h".split(
    " "
  );
const HEADERS_CPP =
  "bits/stdc++.h iostream vector string map set unordered_map unordered_set queue stack deque list algorithm numeric cmath cstdio cstdlib cstring climits cstdint iomanip sstream bitset tuple array functional random chrono memory limits utility cassert cctype ctime optional".split(
    " "
  );

const DIRECTIVES = [
  ["include", "directive", "#include <header>"],
  ["define", "directive", "#define NAME value"],
  ["ifdef", "directive", "#ifdef NAME"],
  ["ifndef", "directive", "#ifndef NAME"],
  ["if", "directive", "#if expression"],
  ["else", "directive", "#else"],
  ["elif", "directive", "#elif expression"],
  ["endif", "directive", "#endif"],
  ["undef", "directive", "#undef NAME"],
  ["pragma", "directive", "#pragma …"],
];

// snippets: trigger -> text; "$0" marks where the caret ends up
const SNIPPETS = {
  c: [
    ["main", "int main(void) {\n    $0\n    return 0;\n}", "main function"],
    ["for", "for (int i = 0; i < n; i++) {\n    $0\n}", "for loop"],
    ["while", "while ($0) {\n    \n}", "while loop"],
    ["dowhile", "do {\n    $0\n} while ();", "do … while loop"],
    ["if", "if ($0) {\n    \n}", "if statement"],
    ["ifelse", "if ($0) {\n    \n} else {\n    \n}", "if … else"],
    [
      "switch",
      "switch ($0) {\n    case 0:\n        break;\n    default:\n        break;\n}",
      "switch statement",
    ],
    ["struct", "typedef struct {\n    $0\n} Name;", "typedef struct"],
    ["func", "int name(int a, int b) {\n    $0\n}", "function"],
  ],
  cpp: [
    ["main", "int main() {\n    $0\n    return 0;\n}", "main function"],
    ["for", "for (int i = 0; i < n; i++) {\n    $0\n}", "for loop"],
    [
      "forr",
      "for (int i = n - 1; i >= 0; i--) {\n    $0\n}",
      "reverse for loop",
    ],
    ["foreach", "for (auto &x : v) {\n    $0\n}", "range-based for"],
    ["while", "while ($0) {\n    \n}", "while loop"],
    ["if", "if ($0) {\n    \n}", "if statement"],
    ["ifelse", "if ($0) {\n    \n} else {\n    \n}", "if … else"],
    [
      "switch",
      "switch ($0) {\n    case 0:\n        break;\n    default:\n        break;\n}",
      "switch statement",
    ],
    ["struct", "struct Name {\n    $0\n};", "struct"],
    ["class", "class Name {\npublic:\n    $0\n};", "class"],
    [
      "fastio",
      "ios::sync_with_stdio(false);\ncin.tie(nullptr);\n$0",
      "fast input/output",
    ],
    ["lambda", "auto f = [&](int x) {\n    $0\n};", "lambda"],
  ],
};

export function buildItems(lang) {
  const kw = (lang === "cpp" ? CPP_KEYWORDS : C_KEYWORDS).map((k) => ({
    label: k,
    kind: "keyword",
    detail: "keyword",
  }));
  const lib = (
    lang === "cpp"
      ? CPP_LIB.concat(C_LIB.filter((x) => !CPP_LIB.some((y) => y[0] === x[0])))
      : C_LIB
  ).map(([label, kind, detail]) => ({ label, kind, detail }));
  const snip = SNIPPETS[lang].map(([label, insert, detail]) => ({
    label,
    kind: "snippet",
    detail,
    insert,
  }));
  const taken = new Set(snip.map((x) => x.label)); // a snippet replaces the plain keyword of the same name
  return {
    symbols: [...snip, ...lib, ...kw.filter((k) => !taken.has(k.label))],
  };
}

export const memberItems = MEMBERS.map(([label, kind, detail]) => ({
  label,
  kind,
  detail,
}));
export const directiveItems = DIRECTIVES.map(([label, kind, detail]) => ({
  label,
  kind,
  detail,
}));
export const headerNames = (lang) => (lang === "cpp" ? HEADERS_CPP : HEADERS_C);
