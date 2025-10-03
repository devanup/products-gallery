module.exports = {
  '*.{ts,tsx}': ['npm run typecheck', 'npm run lint'],
  '*.{ts,tsx,js,jsx,json,css,md}': ['prettier --write'],
};
