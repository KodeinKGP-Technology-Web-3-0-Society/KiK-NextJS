// Starter programs for the compiler page. Each has sample input so "Run" works straight away.

export const STANDARDS = {
  c: [
    { value: "gnu17", label: "C17" },
    { value: "gnu11", label: "C11" },
    { value: "gnu99", label: "C99" },
  ],
  cpp: [
    { value: "c++20", label: "C++20" },
    { value: "c++17", label: "C++17" },
    { value: "c++14", label: "C++14" },
    { value: "c++11", label: "C++11" },
  ],
};

export const TEMPLATES = {
  c: [
    {
      id: "hello",
      name: "Hello, World",
      stdin: "",
      code: `#include <stdio.h>

int main(void) {
    printf("Hello, KodeinKGP!\\n");
    return 0;
}
`,
    },
    {
      id: "input",
      name: "Read input: sum and max",
      stdin: "5\n12 7 31 4 19\n",
      code: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);

    int sum = 0, max = 0;
    for (int i = 0; i < n; i++) {
        int x;
        scanf("%d", &x);
        sum += x;
        if (i == 0 || x > max) max = x;
    }
    printf("sum = %d, max = %d\\n", sum, max);
    return 0;
}
`,
    },
    {
      id: "sort",
      name: "Quick sort",
      stdin: "8\n38 27 43 3 9 82 10 1\n",
      code: `#include <stdio.h>

void swap(int *a, int *b) { int t = *a; *a = *b; *b = t; }

int partition(int a[], int lo, int hi) {
    int pivot = a[hi], i = lo - 1;
    for (int j = lo; j < hi; j++)
        if (a[j] <= pivot) swap(&a[++i], &a[j]);
    swap(&a[i + 1], &a[hi]);
    return i + 1;
}

void quick_sort(int a[], int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(a, lo, hi);
    quick_sort(a, lo, p - 1);
    quick_sort(a, p + 1, hi);
}

int main(void) {
    int n, a[1000];
    scanf("%d", &n);
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    quick_sort(a, 0, n - 1);
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}
`,
    },
    {
      id: "linkedlist",
      name: "Linked list: insert and reverse",
      stdin: "",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node *next;
} Node;

Node *push_front(Node *head, int val) {
    Node *n = malloc(sizeof(Node));
    n->val = val;
    n->next = head;
    return n;
}

Node *reverse(Node *head) {
    Node *prev = NULL;
    while (head) {
        Node *next = head->next;
        head->next = prev;
        prev = head;
        head = next;
    }
    return prev;
}

void print_list(Node *head) {
    for (; head; head = head->next) printf("%d -> ", head->val);
    printf("NULL\\n");
}

int main(void) {
    Node *head = NULL;
    for (int i = 1; i <= 5; i++) head = push_front(head, i * 10);
    print_list(head);
    head = reverse(head);
    print_list(head);
    return 0;
}
`,
    },
    {
      id: "bst",
      name: "Binary search tree",
      stdin: "7\n50 30 70 20 40 60 80\n",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    struct Node *left, *right;
} Node;

Node *insert(Node *root, int key) {
    if (!root) {
        Node *n = calloc(1, sizeof(Node));
        n->key = key;
        return n;
    }
    if (key < root->key) root->left = insert(root->left, key);
    else root->right = insert(root->right, key);
    return root;
}

void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d ", root->key);
    inorder(root->right);
}

int height(Node *root) {
    if (!root) return 0;
    int l = height(root->left), r = height(root->right);
    return 1 + (l > r ? l : r);
}

int main(void) {
    int n;
    Node *root = NULL;
    scanf("%d", &n);
    while (n--) {
        int x;
        scanf("%d", &x);
        root = insert(root, x);
    }
    printf("inorder: ");
    inorder(root);
    printf("\\nheight: %d\\n", height(root));
    return 0;
}
`,
    },
    {
      id: "bfs",
      name: "Graph: BFS shortest path",
      stdin: "6 7\n0 1\n0 2\n1 3\n2 3\n3 4\n4 5\n2 5\n0\n",
      code: `#include <stdio.h>

#define MAXN 1000

int adj[MAXN][MAXN], deg[MAXN];

int main(void) {
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        adj[u][deg[u]++] = v;
        adj[v][deg[v]++] = u;
    }
    int src;
    scanf("%d", &src);

    int dist[MAXN], queue[MAXN], head = 0, tail = 0;
    for (int i = 0; i < n; i++) dist[i] = -1;
    dist[src] = 0;
    queue[tail++] = src;
    while (head < tail) {
        int u = queue[head++];
        for (int k = 0; k < deg[u]; k++) {
            int v = adj[u][k];
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                queue[tail++] = v;
            }
        }
    }
    for (int i = 0; i < n; i++) printf("dist[%d] = %d\\n", i, dist[i]);
    return 0;
}
`,
    },
    {
      id: "dp",
      name: "DP: longest common subsequence",
      stdin: "AGGTAB\nGXTXAYB\n",
      code: `#include <stdio.h>
#include <string.h>

int dp[1001][1001];

int max(int a, int b) { return a > b ? a : b; }

int main(void) {
    char a[1001], b[1001];
    scanf("%s %s", a, b);
    int n = strlen(a), m = strlen(b);

    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            dp[i][j] = (a[i - 1] == b[j - 1]) ? dp[i - 1][j - 1] + 1
                                               : max(dp[i - 1][j], dp[i][j - 1]);
    printf("LCS length = %d\\n", dp[n][m]);
    return 0;
}
`,
    },
    {
      id: "stack",
      name: "Stack: balanced brackets",
      stdin: "{[()]}\n",
      code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1001], stack[1001];
    int top = -1;
    scanf("%s", s);

    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == '(' || c == '[' || c == '{') {
            stack[++top] = c;
        } else {
            if (top < 0) { printf("Not balanced\\n"); return 0; }
            char o = stack[top--];
            if ((c == ')' && o != '(') || (c == ']' && o != '[') || (c == '}' && o != '{')) {
                printf("Not balanced\\n");
                return 0;
            }
        }
    }
    printf(top == -1 ? "Balanced\\n" : "Not balanced\\n");
    return 0;
}
`,
    },
  ],

  cpp: [
    {
      id: "hello",
      name: "Hello, World",
      stdin: "",
      code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, KodeinKGP!" << endl;
    return 0;
}
`,
    },
    {
      id: "input",
      name: "Read input: sort a vector",
      stdin: "6\n42 7 19 3 88 25\n",
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v(n);
    for (int &x : v) cin >> x;

    sort(v.begin(), v.end());
    for (int x : v) cout << x << ' ';
    cout << '\\n';
    return 0;
}
`,
    },
    {
      id: "stl",
      name: "STL: map, set and unordered_map",
      stdin: "the quick brown fox jumps over the lazy dog the end\n",
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    stringstream ss(line);

    map<string, int> freq;
    string w;
    while (ss >> w) freq[w]++;

    for (auto &[word, count] : freq)
        cout << word << ": " << count << '\\n';

    set<string> unique;
    for (auto &p : freq) unique.insert(p.first);
    cout << "unique words: " << unique.size() << '\\n';
    return 0;
}
`,
    },
    {
      id: "dijkstra",
      name: "Dijkstra with priority_queue",
      stdin: "5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3\n0\n",
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int>>> g(n);
    while (m--) {
        int u, v, w;
        cin >> u >> v >> w;
        g[u].push_back({v, w});
        g[v].push_back({u, w});
    }
    int src;
    cin >> src;

    const int INF = 1e9;
    vector<int> dist(n, INF);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : g[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    for (int i = 0; i < n; i++) cout << "dist[" << i << "] = " << dist[i] << '\\n';
    return 0;
}
`,
    },
    {
      id: "tree",
      name: "Binary tree traversals",
      stdin: "7\n1 2 3 4 5 6 7\n",
      code: `#include <bits/stdc++.h>
using namespace std;

struct Node {
    int val;
    Node *left = nullptr, *right = nullptr;
    Node(int v) : val(v) {}
};

// build a complete binary tree from level-order values
Node *build(const vector<int> &a, int i) {
    if (i >= (int)a.size()) return nullptr;
    Node *n = new Node(a[i]);
    n->left = build(a, 2 * i + 1);
    n->right = build(a, 2 * i + 2);
    return n;
}

void preorder(Node *r) { if (r) { cout << r->val << ' '; preorder(r->left); preorder(r->right); } }
void inorder(Node *r)  { if (r) { inorder(r->left); cout << r->val << ' '; inorder(r->right); } }

void level_order(Node *r) {
    queue<Node *> q;
    q.push(r);
    while (!q.empty()) {
        Node *n = q.front(); q.pop();
        cout << n->val << ' ';
        if (n->left) q.push(n->left);
        if (n->right) q.push(n->right);
    }
}

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int &x : a) cin >> x;
    Node *root = build(a, 0);

    cout << "preorder:  "; preorder(root);    cout << '\\n';
    cout << "inorder:   "; inorder(root);     cout << '\\n';
    cout << "levelorder: "; level_order(root); cout << '\\n';
    return 0;
}
`,
    },
    {
      id: "knapsack",
      name: "DP: 0/1 knapsack",
      stdin: "4 7\n1 1\n3 4\n4 5\n5 7\n",
      code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, W;
    cin >> n >> W;
    vector<int> wt(n), val(n);
    for (int i = 0; i < n; i++) cin >> wt[i] >> val[i];

    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++)
        for (int w = W; w >= wt[i]; w--)
            dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);

    cout << "max value = " << dp[W] << '\\n';
    return 0;
}
`,
    },
    {
      id: "dsu",
      name: "Union-Find (DSU)",
      stdin: "6 4\n0 1\n2 3\n1 2\n4 5\n",
      code: `#include <bits/stdc++.h>
using namespace std;

struct DSU {
    vector<int> parent, size;
    DSU(int n) : parent(n), size(n, 1) { iota(parent.begin(), parent.end(), 0); }

    int find(int x) { return parent[x] == x ? x : parent[x] = find(parent[x]); }

    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (size[a] < size[b]) swap(a, b);
        parent[b] = a;
        size[a] += size[b];
        return true;
    }
};

int main() {
    int n, m;
    cin >> n >> m;
    DSU dsu(n);
    int components = n;
    while (m--) {
        int a, b;
        cin >> a >> b;
        if (dsu.unite(a, b)) components--;
    }
    cout << "connected components: " << components << '\\n';
    return 0;
}
`,
    },
  ],
};
