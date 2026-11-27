# Private anonymous survey collection — exact setup

Status: **not configured**. The supplied website cannot currently collect responses. Zero genuine responses are available to this implementation. No successful backend submission has been tested. The survey allows a question preview and disables submission until configured.

## Architecture

GitHub Pages serves `survey.html`, `survey.js` and public `survey-config.js`. A Cloudflare Worker accepts POST `/submit`, verifies Turnstile, validates the role-specific payload and calls an atomic Supabase database function using a server-only service credential. The database stores genuine responses separately from `data.js` and synthetic CSVs. Anonymous website visitors have no database read or insert rights. The site has no raw-response endpoint.

## Configuration steps

1. Create a free-tier Supabase project in your own account. In SQL Editor, run the complete `airbnb-plg/backend/schema.sql`. Inspect the two tables and verify row-level security is enabled and no anonymous policies exist. Do not reuse the Zepto schema.
2. In Cloudflare Turnstile, add a widget for **kunalmahurkar.is-a.dev**. Keep its secret private; copy the public site key for step 5. The widget is spam prevention, not proof that each participant is unique.
3. In Cloudflare Workers, create a Worker named `airbnb-india-research`. Deploy `backend/worker.js` as an ES module. `backend/wrangler.toml` is provided for the official Wrangler CLI if preferred. Set plaintext variables `ALLOWED_ORIGINS=https://kunalmahurkar.is-a.dev` and `TURNSTILE_HOSTNAME=kunalmahurkar.is-a.dev`. Multiple exact origins can be comma-separated; the Turnstile hostname must match the actual survey host.
4. In Worker **Settings → Variables and Secrets**, add encrypted secrets: `SUPABASE_URL` (your project URL), `SUPABASE_SERVICE_ROLE_KEY` (server-only service-role credential), `TURNSTILE_SECRET` (private Turnstile key), and `RATE_HASH_SECRET` (a randomly generated secret of at least 32 bytes). Never put these in Git, browser JavaScript, screenshots or chat. Re-deploy the Worker after configuration.
5. Edit `survey-config.js`: set `endpoint` to `https://YOUR-WORKER.workers.dev/submit` and `turnstileSiteKey` to the public site key. These two values are intentionally public. Commit only this public configuration, then deploy the GitHub Pages site.
6. Open the deployed survey and test both traveller and host paths. Complete Turnstile, submit, and confirm a new row exists in the private Supabase table before reporting success. Check that a retry does not create another row, that a honeypot/invalid enum is rejected, and that anonymous REST reads fail. The form only displays success after the Worker confirms saved=true.
7. Delete your test rows through Supabase Table Editor. Record the deletion and launch date in the research log. The dashboard must remain at zero until reviewed genuine aggregates are explicitly published.

## Spam and duplicate controls

The backend validates role, consent, UUID v4, allowed fields and answer enums, payload size, minimum elapsed time, honeypot and single-use Turnstile token. It verifies the Turnstile hostname. An atomic SQL function limits successful writes to five per network per UTC day using a keyed, daily IP-derived HMAC. No raw IP is stored in the research database; the expiring HMAC is still pseudonymous operational data. Expired rate records are removed on submission; schedule daily cleanup through Supabase Cron if supported by your plan, or perform daily SQL cleanup manually. Cloudflare may independently process network data under its own policies.

Browser localStorage stores only a submission marker, never answers. Clearing it cannot bypass backend verification and rate limiting. Multiple genuine people behind a shared network may hit the limit; a determined attacker can use multiple networks. Monitor volume and pause collection if abuse occurs. Do not claim perfect uniqueness. Set a Cloudflare rate-limiting rule if available within your account's free-tier entitlement; it is not required by this code and has not been configured.

## Export, review and aggregate publication

Use the authenticated Supabase Table Editor export CSV, or authenticated SQL Editor query `select id, created_at, role, answers from public.airbnb_plg_responses order by created_at;`. Store exports privately and remove personal information inadvertently entered in free text before analysis. Do not commit raw exports. Restrict project access to the researcher. Anonymous open text cannot be guaranteed free of identifying content; review it before using any quotation or theme.

Publish only a manually reviewed aggregate snapshot: role totals, approved question denominators and counts, missing-answer counts, collection period and sampling caveats. Suppress cells smaller than five and remove verbatim free text, IDs, timestamps and individual combinations. Keep synthetic and genuine snapshots in distinct files and clearly labelled views. Do not automatically alter feature priorities after each response. Genuine interview count starts at zero and must be updated only after consented interviews actually occur.

## Retention and privacy

Planned retention is 12 months from collection, then deletion. Schedule monthly deletion using the SQL at the bottom of `schema.sql`; record the owner and cadence before launch. Run a periodic cleanup for rate-limit records older than two days. As the anonymous form collects no identity, individual deletion after submission cannot be reliably performed; this is disclosed before consent. Participation is 18+ and voluntary. City uses broad choices; no names, emails, phone numbers, addresses or payment data are requested.

Interview volunteers use a separate portfolio contact link. Contact details are not collected inside this survey or linked by the code to survey IDs. If interviews are later arranged, obtain separate consent for contact, participation and any recording.

## Costs and limitations

The design uses free-tier services, but quotas and terms can change. Check account limits before launch. No payment dependency is required by the implementation. Account creation, provider configuration, SQL execution, secrets, genuine submissions, live anti-spam checks and production retention scheduling remain manual setup tasks. Backend unit tests are useful but do not replace an end-to-end configured submission test.
