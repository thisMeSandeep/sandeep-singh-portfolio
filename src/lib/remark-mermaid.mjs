import { visit } from "unist-util-visit";

// Turn ```mermaid fenced blocks into raw <pre class="mermaid"> nodes so Astro's
// Shiki highlighter skips them and the diagram source survives untouched for the
// client-side renderer to pick up. Without this, mermaid blocks render as
// syntax-highlighted code instead of diagrams.
const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, "code", (node) => {
      if (node.lang !== "mermaid") return;
      node.type = "html";
      node.value = `<pre class="mermaid">${escapeHtml(node.value)}</pre>`;
    });
  };
}
