import { Role, InterviewQuestion, QuestionDifficulty, QuestionType } from '@/types/skills';

export const interviewQuestions: Record<string, InterviewQuestion[]> = {
  "frontend": [
    {
      id: "fe-react-1",
      role: "frontend",
      skill: "React",
      type: QuestionType.Technical,
      difficulty: QuestionDifficulty.Intermediate,
      question: "Explain the concept of React Hooks and how they differ from class components. Provide an example of useState and useEffect implementation.",
      code: `// Example implementation
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // What should go here?
  }, [userId]);

  return (
    // Component JSX
  );
}`,
      options: [
        `async function fetchUser() {
  setLoading(true);
  try {
    const data = await api.getUser(userId);
    setUser(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}
fetchUser();`,
        `setLoading(true);
api.getUser(userId).then(data => {
  setUser(data);
  setLoading(false);
});`,
        `const data = api.getUser(userId);
setUser(data);
setLoading(false);`,
        `useEffect(() => {
  setLoading(true);
  api.getUser(userId);
  setLoading(false);
}, []);`
      ],
      correctAnswer: 0,
      explanation: "The first option is the most correct implementation as it:\n1. Uses async/await for clean asynchronous code\n2. Properly handles errors\n3. Ensures loading state is always updated\n4. Follows React best practices for data fetching in useEffect",
      source: "Meta Technical Interview",
      timeLimit: 180,
      relatedSkills: ["JavaScript", "Async Programming", "Error Handling"]
    },
    {
      id: "fe-perf-1",
      role: "frontend",
      skill: "Performance",
      type: QuestionType.Scenario,
      difficulty: QuestionDifficulty.Advanced,
      question: "You're working on a React application that's experiencing performance issues. Users report slow rendering and laggy interactions. Given this code snippet, identify the performance bottleneck and propose a solution.",
      code: `function ProductList({ products, onProductSelect }) {
  const sortedProducts = products
    .slice()
    .sort((a, b) => b.price - a.price);
    
  return (
    <div>
      {sortedProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => onProductSelect(product)}
        />
      ))}
    </div>
  );
}`,
      options: [
        "Use useMemo to memoize the sorted products array",
        "Convert ProductList to a class component",
        "Remove the sorting operation entirely",
        "Add a loading state while sorting"
      ],
      correctAnswer: 0,
      explanation: "The performance issue stems from unnecessarily re-sorting the products array on every render. Using useMemo will cache the sorted array and only recompute when the products array changes:\n\n```jsx\nconst sortedProducts = useMemo(\n  () => products.slice().sort((a, b) => b.price - a.price),\n  [products]\n);\n```\n\nThis optimization prevents expensive calculations on every render.",
      source: "Google Frontend Interview",
      timeLimit: 240,
      relatedSkills: ["React Performance", "Optimization", "useMemo"]
    }
  ],
  "backend": [
    {
      id: "be-sys-1",
      role: "backend",
      skill: "System Design",
      type: QuestionType.Scenario,
      difficulty: QuestionDifficulty.Advanced,
      question: "Design a rate limiting system for a REST API that handles 10,000 requests per second. Consider the following requirements:\n\n- Limit requests per user/IP\n- Handle distributed deployment\n- Prevent abuse while allowing burst traffic\n\nWhich implementation would you choose and why?",
      options: [
        "Token Bucket algorithm with Redis for distributed rate limiting",
        "Fixed Window counter with local memory cache",
        "Leaky Bucket algorithm with database storage",
        "Sliding Window with in-memory counters"
      ],
      correctAnswer: 0,
      explanation: "Token Bucket with Redis is ideal because:\n1. Redis provides atomic operations for distributed systems\n2. Token Bucket allows burst traffic while maintaining overall rate\n3. Low latency compared to database solutions\n4. Scales horizontally with multiple API servers\n\nImplementation example:\n```javascript\nclass RateLimiter {\n  constructor(redis, bucketSize, refillRate) {\n    this.redis = redis;\n    this.bucketSize = bucketSize;\n    this.refillRate = refillRate;\n  }\n\n  async tryAcquire(userId) {\n    const key = `ratelimit:${userId}`;\n    const now = Date.now();\n    \n    const [tokens, lastRefill] = await this.redis.hmget(key, 'tokens', 'lastRefill');\n    const newTokens = Math.min(\n      this.bucketSize,\n      tokens + (now - lastRefill) * this.refillRate\n    );\n    \n    if (newTokens >= 1) {\n      await this.redis.hmset(key, {\n        tokens: newTokens - 1,\n        lastRefill: now\n      });\n      return true;\n    }\n    return false;\n  }\n}\n```",
      source: "Amazon System Design Interview",
      timeLimit: 600,
      relatedSkills: ["Distributed Systems", "Redis", "API Design"]
    }
  ],
  "data_analyst": [
    {
      id: "da-sql-1",
      role: "data_analyst",
      skill: "SQL",
      type: QuestionType.Technical,
      difficulty: QuestionDifficulty.Advanced,
      question: "You have a large e-commerce database and need to analyze customer purchasing patterns. Write a SQL query to find the top 5 customers who have made the most purchases in each product category in the last 3 months, including their total spend and average order value.",
      code: `-- Tables:
-- customers (id, name, email)
-- orders (id, customer_id, order_date, total_amount)
-- order_items (order_id, product_id, quantity, price)
-- products (id, name, category)`,
      options: [
        `WITH RankedCustomers AS (
  SELECT 
    c.name,
    p.category,
    COUNT(DISTINCT o.id) as total_orders,
    SUM(o.total_amount) as total_spend,
    AVG(o.total_amount) as avg_order_value,
    RANK() OVER (PARTITION BY p.category ORDER BY COUNT(DISTINCT o.id) DESC) as rank
  FROM customers c
  JOIN orders o ON c.id = o.customer_id
  JOIN order_items oi ON o.id = oi.order_id
  JOIN products p ON oi.product_id = p.id
  WHERE o.order_date >= DATEADD(month, -3, GETDATE())
  GROUP BY c.name, p.category
)
SELECT *
FROM RankedCustomers
WHERE rank <= 5
ORDER BY category, rank;`,
        `SELECT 
  c.name,
  p.category,
  COUNT(o.id) as total_orders,
  SUM(o.total_amount) as total_spend
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY c.name, p.category
ORDER BY total_orders DESC
LIMIT 5;`,
        `SELECT TOP 5
  c.name,
  p.category,
  COUNT(o.id) as total_orders
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
GROUP BY c.name, p.category
ORDER BY total_orders DESC;`,
        `SELECT 
  c.name,
  p.category,
  COUNT(o.id) as total_orders
FROM customers c, orders o, order_items oi, products p
WHERE c.id = o.customer_id
AND o.id = oi.order_id
AND oi.product_id = p.id
GROUP BY c.name, p.category;`
      ],
      correctAnswer: 0,
      explanation: "The correct solution uses:\n1. Window functions (RANK) to rank customers within each category\n2. Common Table Expression (CTE) for better readability\n3. Proper date filtering for last 3 months\n4. Calculates both total spend and average order value\n5. Joins tables correctly\n6. Groups and filters appropriately",
      source: "Snowflake Data Analytics Interview",
      timeLimit: 300,
      relatedSkills: ["Window Functions", "CTEs", "Data Analysis"]
    }
  ]
};

export const getQuestionsForRole = (roleId: string, difficulty?: QuestionDifficulty): InterviewQuestion[] => {
  return interviewQuestions[roleId]?.filter(q => !difficulty || q.difficulty === difficulty) || [];
};

export const getQuestionsBySkill = (roleId: string, skill: string): InterviewQuestion[] => {
  return interviewQuestions[roleId]?.filter(q => q.skill === skill) || [];
};