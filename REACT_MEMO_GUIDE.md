# React.memo, useMemo & useCallback Guide

A practical guide to memoization in React, with examples from this Pokedex project.

---

## What Is Memoization?

Memoization means **caching a result** so it doesn't need to be recalculated if the inputs haven't changed. In React, this prevents unnecessary re-renders and recalculations.

---

## The Three Memoization Tools

| Tool | Where It Goes | What It Does |
|------|---------------|-------------|
| `React.memo()` | Wraps a **child component** | Skips re-render if props haven't changed |
| `useMemo()` | Inside a **parent component** | Caches an object/array reference between renders |
| `useCallback()` | Inside a **parent component** | Caches a function reference between renders |

---

## React.memo

### What It Does

Wraps a component to skip re-rendering when its props are the same.

```tsx
import { memo } from "react";

function PokemonStats({ stats }: { stats: Stat[] }) {
  return (
    <div>
      {stats.map((stat) => (
        <p>{stat.stat.name}: {stat.base_stat}</p>
      ))}
    </div>
  );
}

export default memo(PokemonStats);
```

### How It Compares Props

`React.memo` uses **shallow comparison**:

```tsx
// Primitives — compared by VALUE
"hello" === "hello"  // true ✓
42 === 42            // true ✓
true === true        // true ✓

// Objects/Arrays — compared by REFERENCE (memory address)
{ name: "Pikachu" } === { name: "Pikachu" }  // false ✗ (different objects)
[1, 2, 3] === [1, 2, 3]                      // false ✗ (different arrays)

const obj = { name: "Pikachu" };
obj === obj  // true ✓ (same reference)
```

### When React.memo Works Alone

With **primitive props** only (string, number, boolean):

```tsx
// These are compared by value — memo works fine without useMemo
<PokemonIndividualSpec specTitle="Weight" specData={42} />
```

### When React.memo Needs Help

With **object, array, or function props**:

```tsx
// Every render creates a new array reference
// memo sees different reference → re-renders anyway (useless!)
<PokemonStats stats={data?.stats} />

// With useMemo, same reference is preserved
const memoizedStats = useMemo(() => data?.stats, [data?.stats]);
<PokemonStats stats={memoizedStats} />  // memo works now ✓
```

---

## useMemo

### What It Does

Caches a **computed value** (object, array, or expensive calculation) between renders.

```tsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation(input);
}, [input]); // Only recalculates when `input` changes
```

### Use Case 1: Preserve References for React.memo

```tsx
// Parent component
function PokemonPage() {
  const { data } = useQuery({...});

  // Preserves the same reference between renders
  const memoizedStats = useMemo(() => data?.stats, [data?.stats]);
  const memoizedAbilities = useMemo(() => data?.abilities, [data?.abilities]);
  const memoizedTypes = useMemo(() => data?.types, [data?.types]);

  return (
    <>
      <PokemonStats stats={memoizedStats} />         {/* memo works ✓ */}
      <PokemonTypeAbility listItems={memoizedTypes} /> {/* memo works ✓ */}
    </>
  );
}
```

### Use Case 2: Expensive Calculations

```tsx
// Only recalculates when allPokemons or search changes
const filteredPokemons = useMemo(() => {
  return allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );
}, [allPokemons, search]);
```

### Dependency Array

```tsx
useMemo(() => {
  return someComputation(a, b);
}, [a, b]);
//  ^^^^^ — Only recomputes when a or b changes
```

| Dependency Array | Behavior |
|-----------------|----------|
| `[a, b]` | Recomputes when `a` or `b` changes |
| `[]` | Computes once, never again |
| (omitted) | Recomputes every render (defeats the purpose) |

---

## useCallback

### What It Does

Caches a **function** between renders. It's essentially `useMemo` for functions.

```tsx
// Without useCallback — new function every render
const handleClick = () => { doSomething(); };

// With useCallback — same function reference between renders
const handleClick = useCallback(() => {
  doSomething();
}, [/* dependencies */]);
```

### These Are Equivalent

```tsx
const memoizedFn = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);

// Same as:
const memoizedFn = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Use Case: Passing Functions to Memoized Children

```tsx
// Parent
function App() {
  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // If ChildComponent is wrapped in React.memo,
  // it won't re-render because handleLoadMore has a stable reference
  return <ChildComponent onLoadMore={handleLoadMore} />;
}
```

### Use Case: Stable Dependencies

```tsx
// Used as a dependency in useEffect or custom hooks
const sentinelRef = useIntersectionObserver(handleLoadMore, {
  enabled: hasNextPage,
});
// handleLoadMore is stable → effect doesn't re-run unnecessarily
```

---

## How They Work Together

```
Parent Component
├── useMemo(data)        → Stable object/array reference
├── useCallback(handler) → Stable function reference
│
└── Child Component (wrapped in React.memo)
    ├── Receives stable props
    ├── React.memo does shallow comparison
    └── Same references → SKIP re-render ✓
```

### Complete Example from This Project

```tsx
// Parent: $name.tsx
function PokemonPage() {
  const { data } = useQuery({...});

  // useMemo preserves array references
  const memoizedStats = useMemo(() => data?.stats, [data?.stats]);

  return (
    // React.memo on PokemonStats checks: did stats reference change?
    // With useMemo: same reference → no re-render ✓
    <PokemonStats stats={memoizedStats} />
  );
}

// Child: pokemon-stats.tsx
function PokemonStats({ stats }: { stats: Stat[] }) {
  return (...);
}

export default memo(PokemonStats);  // Won't re-render if stats reference is the same
```

---

## Decision Flowchart

```
Should I use memoization?
│
├── Is the component rendered in a list (many instances)?
│   └── YES → Use React.memo on the component
│
├── Is the component re-rendering too often with same props?
│   └── YES → Use React.memo on the component
│
├── Am I passing objects/arrays to a memoized child?
│   └── YES → Use useMemo in the parent
│
├── Am I passing functions to a memoized child?
│   └── YES → Use useCallback in the parent
│
├── Do I have an expensive calculation?
│   └── YES → Use useMemo to cache the result
│
└── None of the above?
    └── Don't memoize — it adds complexity for no benefit
```

---

## Common Mistakes

### 1. Using React.memo Without Stabilizing Props

```tsx
// ❌ Useless — new array every render
<MemoizedComponent items={data.filter(x => x.active)} />

// ✓ Correct — stable reference
const activeItems = useMemo(() => data.filter(x => x.active), [data]);
<MemoizedComponent items={activeItems} />
```

### 2. Transforming Data Inside useMemo

```tsx
// ❌ Wrong — changes the data shape, breaks types
const stats = useMemo(() => {
  return data?.stats.map(stat => ({ name: stat.stat.name }));
}, [data?.stats]);

// ✓ Correct — preserves original shape
const stats = useMemo(() => data?.stats, [data?.stats]);
```

### 3. Over-Memoizing

```tsx
// ❌ Unnecessary — primitive props don't need useMemo
const title = useMemo(() => "Stats", []);
<PokemonStats title={title} />

// ✓ Just pass the primitive directly
<PokemonStats title="Stats" />
```

### 4. Missing Dependencies

```tsx
// ❌ Stale closure — uses outdated `count` value
const increment = useCallback(() => {
  setCount(count + 1);
}, []); // Missing `count` dependency

// ✓ Either add dependency or use functional update
const increment = useCallback(() => {
  setCount((prev) => prev + 1);
}, []); // No dependency needed with functional update
```

---

## When NOT to Memoize

- Component rarely re-renders
- Component is cheap to render (simple UI, no lists)
- Props are only primitives
- Premature optimization (measure first, optimize second)

**Rule of thumb:** Don't memoize everything. Only memoize when you have a measurable performance issue or when a component is rendered many times (like in a list).

---

## Summary Table

| Scenario | Solution |
|----------|----------|
| Child in a long list | `React.memo` on child |
| Passing array/object to memo'd child | `useMemo` in parent |
| Passing function to memo'd child | `useCallback` in parent |
| Expensive filtering/sorting | `useMemo` for the result |
| Function used as effect dependency | `useCallback` for stable reference |
| Primitive props only | `React.memo` alone is enough |
