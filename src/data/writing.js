export const writingArticles = [
  {
    slug: 'building-a-mern-app-from-scratch',
    title: 'Building a Scalable MERN Architecture',
    date: 'Sep 10, 2026',
    readTime: '6 min read',
    description: 'A deep dive into structuring your MongoDB, Express, React, and Node.js applications for scale and maintainability.',
    content: `
# Building a Scalable MERN Architecture

When I first started building full-stack applications with the MERN (MongoDB, Express, React, Node.js) stack, I stuffed all my routes, controllers, and models into a few giant files. 

While that works for a weekend project, it quickly turns into a nightmare when you try to scale. Here is how I structure my applications today for ultimate maintainability.

## 1. The Backend Structure

A scalable Express backend should separate **Routes**, **Controllers**, and **Services**.

\`\`\`javascript
// src/routes/user.routes.js
import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);

export default router;
\`\`\`

By keeping routes clean, we can immediately see the API surface area. The actual business logic lives in the controller.

## 2. Controllers vs Services

Your controller's only job should be extracting data from the Request object and sending a Response. 

\`\`\`javascript
// src/controllers/user.controller.js
import { findUserById } from '../services/user.service.js';

export const getUserProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
\`\`\`

## 3. Frontend Architecture

On the React side, I heavily rely on custom hooks and feature-based architecture. Instead of a massive \`components/\` folder, group things by feature:

- \`src/features/auth/components/\`
- \`src/features/auth/api/\`
- \`src/features/auth/hooks/\`

This keeps related logic colocated, making it infinitely easier to refactor or delete a feature later on.

## Conclusion

Scalability isn't just about handling a million requests per second; it's about handling a growing codebase without losing your mind. By enforcing strict separation of concerns, your future self will thank you.
    `
  },
  {
    slug: 'mastering-gsap-animations-in-react',
    title: 'Mastering GSAP Animations in React',
    date: 'Aug 24, 2026',
    readTime: '5 min read',
    description: 'Learn how to integrate GreenSock Animation Platform (GSAP) flawlessly inside React functional components and avoid common strict-mode bugs.',
    content: `
# Mastering GSAP Animations in React

GSAP is arguably the most powerful animation library for the web. However, integrating it with React's component lifecycle (especially with React 18's Strict Mode) can be tricky.

Here is the bulletproof way to use GSAP in React.

## The Problem: Double Rendering

React 18 Strict Mode fires \`useEffect\` twice in development. If you aren't careful, GSAP will create two timelines, causing bizarre overlapping animations.

## The Solution: \`gsap.context()\`

GSAP introduced \`gsap.context()\` specifically to solve cleanup and scoping in frameworks like React.

\`\`\`jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const AnimatedComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Create a context scoped to our container
    let ctx = gsap.context(() => {
      // 2. All animations inside here are automatically scoped!
      gsap.from('.box', { 
        y: 100, 
        opacity: 0, 
        stagger: 0.1 
      });
    }, containerRef);

    // 3. Cleanup on unmount! This prevents the Strict Mode double-render bugs.
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <div className="box">Box 1</div>
      <div className="box">Box 2</div>
      <div className="box">Box 3</div>
    </div>
  );
};
\`\`\`

### Why this is brilliant:
1. **Scoping**: You don't need to create multiple \`useRef\` hooks for every single element. You just target \`.box\` and GSAP only looks *inside* \`containerRef\`.
2. **Cleanup**: \`ctx.revert()\` instantly kills all animations, timelines, and ScrollTriggers created inside the context.

Happy animating!
    `
  }
];
