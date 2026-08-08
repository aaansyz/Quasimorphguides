import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const registry = JSON.parse(await readFile(new URL("../data/content-registry.json", import.meta.url), "utf8"));

async function render(path = "/") {
  const response = await worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), env, { waitUntil() {}, passThroughOnException() {} });
  return { response, html: await response.text() };
}

test("home renders the V2 task-first experience", async () => {
  const { response, html } = await render();
  assert.equal(response.status, 200);
  assert.match(html, /Quasimorph Wiki — 1\.0 Guides &amp; Planning Tools/);
  assert.match(html, /1\.0 NEW PLAYER GUIDE/);
  assert.match(html, /I NEED HELP WITH/);
  assert.match(html, /Search the field archive/);
  assert.match(html, /82 Achievements/);
  assert.doesNotMatch(html, /ADVERTISEMENT \/\/ RESERVED/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@id":"https:\/\/quasimorphwiki\.com\/#organization"/);
  assert.doesNotMatch(html, /SearchAction/);
});

test("guides hub starts with the 1.0 route and has substantial navigation", async () => {
  const { html } = await render("/guides/");
  assert.match(html, /1\.0 Beginner Guide/);
  assert.match(html, /This page is an index—not a second copy/);
  assert.match(html, /0–10 HOURS \/\/ START HERE/);
  assert.match(html, /Extraction/);
  assert.doesNotMatch(html, /READ ALL GUIDES/);
});

test("completed local tools and achievement tracker render", async () => {
  const mission = await render("/tools/mission-prep/");
  const achievements = await render("/achievements/");
  assert.match(mission.html, /PRE-DEPLOYMENT BRIEF/);
  assert.match(mission.html, /COPY SHARE LINK/);
  assert.match(mission.html, /RETREAT TRIGGERS/);
  assert.match(achievements.html, /LOCAL PROGRESS/);
  assert.match(achievements.html, /Minimal State/);
  assert.match(achievements.html, /82/);
});

test("research drafts and search are noindex", async () => {
  for (const path of ["/search/", "/guides/secret-data/", "/tools/damage-resistance/"]) {
    const { html } = await render(path);
    assert.match(html, /<meta[^>]+name="robots"[^>]+content="noindex, follow"/i);
  }
});

test("generated sitemap contains only indexable routes", async () => {
  const sitemap = await readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8");
  assert.match(sitemap, /https:\/\/quasimorphwiki\.com\/guides\/difficulty-settings\//);
  assert.match(sitemap, /https:\/\/quasimorphwiki\.com\/updates\/roadmap\//);
  assert.doesNotMatch(sitemap, /\/search\//);
  assert.doesNotMatch(sitemap, /\/guides\/secret-data\//);
  assert.doesNotMatch(sitemap, /\/tools\/damage-resistance\//);
});

test("every indexable route is a self-canonical 200 page with one H1", async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const entry of registry.filter((item) => item.indexable)) {
    const { response, html } = await render(entry.path);
    assert.equal(response.status, 200, entry.path);
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${entry.path} H1 count`);
    assert.match(html, new RegExp(`<link[^>]+rel="canonical"[^>]+href="https://quasimorphwiki\\.com${entry.path.replaceAll("/", "\\/")}"`), `${entry.path} canonical`);
    assert.ok(!titles.has(entry.title), `duplicate title: ${entry.title}`); titles.add(entry.title);
    assert.ok(!descriptions.has(entry.description), `duplicate description: ${entry.path}`); descriptions.add(entry.description);
  }
});

test("article schema uses the disclosed site organization as author and publisher", async () => {
  const { html } = await render("/guides/getting-started/");
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"author":\{"@type":"Organization","@id":"https:\/\/quasimorphwiki\.com\/#organization","name":"Quasimorph Wiki"/);
  assert.match(html, /"publisher":\{"@type":"Organization","@id":"https:\/\/quasimorphwiki\.com\/#organization","name":"Quasimorph Wiki"/);
  assert.doesNotMatch(html, /"@type":"Person"/);
  assert.doesNotMatch(html, /"@type":"FAQPage"/);
});

test("www host redirects to the canonical apex host", async () => {
  const response = await worker.fetch(new Request("https://www.quasimorphwiki.com/guides/?from=test"), env, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://quasimorphwiki.com/guides/?from=test");
});
