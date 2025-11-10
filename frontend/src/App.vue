<template>
  <div id="app-container">
    <header class="app-header">
      <nav>
        <router-link to="/">Products</router-link>
      </nav>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// No script needed for this simple layout
</script>

<style>
/* Global Styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f4f7f9;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header Styles */
.app-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 0 2rem;
  display: flex;
  align-items: center;
  height: 60px;
}

.app-header nav a {
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
  font-size: 1.1rem;
}

.app-header nav a.router-link-exact-active {
  color: #42b883;
}

/* Main Content Styles */
.app-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>