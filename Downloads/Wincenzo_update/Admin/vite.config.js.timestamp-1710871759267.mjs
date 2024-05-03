// vite.config.js
import { defineConfig } from "file:///D:/react/vakratund_solutuins/wincenzo/Admin/node_modules/vite/dist/node/index.js";
import react from "file:///D:/react/vakratund_solutuins/wincenzo/Admin/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import rollupReplace from "file:///D:/react/vakratund_solutuins/wincenzo/Admin/node_modules/@rollup/plugin-replace/dist/es/index.js";
var __vite_injected_original_dirname = "D:\\react\\vakratund_solutuins\\wincenzo\\Admin";
var vite_config_default = defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__vite_injected_original_dirname, "./src")
      }
    ]
  },
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development")
      }
    }),
    react()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxyZWFjdFxcXFx2YWtyYXR1bmRfc29sdXR1aW5zXFxcXHdpbmNlbnpvXFxcXEFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZWFjdFxcXFx2YWtyYXR1bmRfc29sdXR1aW5zXFxcXHdpbmNlbnpvXFxcXEFkbWluXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yZWFjdC92YWtyYXR1bmRfc29sdXR1aW5zL3dpbmNlbnpvL0FkbWluL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuLy9pbXBvcnQgcmVhY3RSZWZyZXNoIGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1yZWZyZXNoXCI7XHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHJvbGx1cFJlcGxhY2UgZnJvbSBcIkByb2xsdXAvcGx1Z2luLXJlcGxhY2VcIjtcclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgLy8gXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgICAgZmluZDogXCJAXCIsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcblxyXG4gIHBsdWdpbnM6IFtcclxuICAgIHJvbGx1cFJlcGxhY2Uoe1xyXG4gICAgICBwcmV2ZW50QXNzaWdubWVudDogdHJ1ZSxcclxuICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgX19ERVZfXzogSlNPTi5zdHJpbmdpZnkodHJ1ZSksXHJcbiAgICAgICAgXCJwcm9jZXNzLmVudi5OT0RFX0VOVlwiOiBKU09OLnN0cmluZ2lmeShcImRldmVsb3BtZW50XCIpLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgLy9yZWFjdFJlZnJlc2goKSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2VCxTQUFTLG9CQUFvQjtBQUUxVixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBSjFCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFFRSxNQUFNO0FBQUEsUUFDTixhQUFhLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsY0FBYztBQUFBLE1BQ1osbUJBQW1CO0FBQUEsTUFDbkIsUUFBUTtBQUFBLFFBQ04sU0FBUyxLQUFLLFVBQVUsSUFBSTtBQUFBLFFBQzVCLHdCQUF3QixLQUFLLFVBQVUsYUFBYTtBQUFBLE1BQ3REO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsRUFFUjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
