# Advanced React Topics to Practice

A checklist of advanced React concepts to implement in this Pokedex project.

---

## Currently Implemented

- [x] TanStack Router (file-based routing)
- [x] TanStack Query (`useQuery`, `useQueries`)
- [x] TypeScript with React
- [x] Functional components with props
- [x] Type narrowing with union types (`in` operator)

---

## Topics to Practice

### 1. Performance Optimization

| Topic | Description | Where to Apply |
|-------|-------------|----------------|
| `React.memo()` | Prevents re-renders if props haven't changed | Wrap `PokemonImageCard` |
| `useMemo()` | Caches expensive calculations between renders | Filter/sort Pokemon list |
| `useCallback()` | Memoizes functions to prevent child re-renders | Event handlers, query callbacks |
| Code Splitting / `lazy()` | Split bundles by route for faster initial load | Route components |
| Virtualization | Render only visible items in long lists | Pokemon list (`react-window`) |

**Why it matters:** The home page renders 20+ Pokemon cards. Without memoization, every parent re-render causes all cards to re-render unnecessarily.

---

### 2. State Management

| Topic | Description | Use Case |
|-------|-------------|----------|
| Context API | Share state across components without prop drilling | Search/filter state, theme |
| `useReducer` | Manage complex state with actions and reducers | Filter panel with multiple values |
| TanStack Store | Lightweight global state (already in dependencies) | App-wide settings |
| Zustand / Jotai | Simple alternatives to Redux | Global UI state |

**Example use case:** Add a favorites system where users can mark Pokemon as favorites across the app.

---

### 3. Data Fetching Patterns

| Pattern | Description | Implementation |
|---------|-------------|----------------|
| Infinite Scrolling | Load more data as user scrolls | `useInfiniteQuery` from TanStack Query |
| Pagination | Load data in discrete pages | Query with page parameter |
| Prefetching | Preload data before user needs it | Prefetch Pokemon details on hover |
| Optimistic Updates | Update UI immediately, sync with server later | Favorites toggle |
| Mutations | Handle write operations | `useMutation` for favorites |

---

### 4. Error Handling

| Topic | Description | Implementation |
|-------|-------------|----------------|
| Error Boundaries | Catch JavaScript errors in component tree | Class component with `componentDidCatch` |
| Suspense | Declarative loading states | Wrap async components |
| Query Error States | Handle API failures gracefully | Use `isError`, `error` from useQuery |
| Fallback UI | Show meaningful content when errors occur | Error component with retry button |

**Example:**
```tsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

---

### 5. Component Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| Compound Components | Components that work together implicitly | `<Card><Card.Image /><Card.Stats /></Card>` |
| Render Props | Share logic via function as children | Reusable data fetching logic |
| Custom Hooks | Extract and reuse stateful logic | `usePokemonFilter()`, `useFavorites()` |
| Higher-Order Components | Wrap components to add functionality | `withLoading(Component)` |
| Portals | Render outside parent DOM hierarchy | Modals, tooltips, popovers |

**Compound Components Example:**
```tsx
<PokemonCard>
  <PokemonCard.Image />
  <PokemonCard.Stats />
  <PokemonCard.Types />
</PokemonCard>
```

---

### 6. Forms & User Input

| Topic | Description | Use Case |
|-------|-------------|----------|
| Controlled Components | React controls input state | Search input |
| Uncontrolled Components | DOM controls input state | File uploads |
| Form Libraries | React Hook Form, Formik | Complex forms with validation |
| Debouncing | Delay processing until user stops typing | Search-as-you-type |

**Debounce Example:**
```tsx
const [search, setSearch] = useState("");
const debouncedSearch = useDebouncedValue(search, 300);

// Query only runs when user stops typing for 300ms
useQuery({
  queryKey: ["pokemon", "search", debouncedSearch],
  queryFn: () => searchPokemon(debouncedSearch),
});
```

---

### 7. Advanced Hooks

| Hook | Description | Use Case |
|------|-------------|----------|
| `useRef` | Access DOM elements or persist values | Focus input, store previous value |
| `useImperativeHandle` | Customize what ref exposes to parent | Custom component APIs |
| `useLayoutEffect` | Synchronous effect after DOM mutations | Measure elements before paint |
| `useDeferredValue` | Defer non-urgent updates | Keep UI responsive during heavy renders |
| `useTransition` | Mark state updates as non-blocking | Navigation, tab switching |

---

### 8. TypeScript Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| Type Guards | Narrow union types at runtime | `"type" in item` |
| Generic Components | Reusable typed components | `<List<Pokemon> items={...} />` |
| Discriminated Unions | Type-safe state machines | `{ status: "loading" } \| { status: "success", data: T }` |
| Utility Types | Transform existing types | `Partial<T>`, `Pick<T, K>`, `Omit<T, K>` |

---

## Recommended Learning Path

1. **Start with:** `React.memo` + `useCallback` on `PokemonImageCard`
2. **Then:** Add Context API for search/filter feature
3. **Next:** Implement Error Boundaries
4. **Then:** Add pagination or infinite scroll with React Query
5. **Then:** Create custom hooks for reusable logic
6. **Finally:** Compound components for Pokemon cards

---

## Resources

- [React Docs - Performance](https://react.dev/reference/react/memo)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TypeScript Handbook - Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [Patterns.dev - React Patterns](https://www.patterns.dev/react)
