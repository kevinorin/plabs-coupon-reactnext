# Components

Component directories should follow a modular pattern, and export all appropriate sub-components. A component module should bundle/group related components together (ie. `Coupon` components) and expose the public component API.

```
- coupon/
  - index.ts
  - CouponCard/
    - index.tsx
  - CouponPreview/
    - index.tsx
    - index.styles.ts
```

> Component "modules" should follow TypeScript naming conventions, while all sub-components should use `PascalCase`.
