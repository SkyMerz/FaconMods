# FaconUnlock

A runnable Next.js + Supabase starter for a black/cyan link-gating platform.

## Included
- Responsive black-and-cyan landing page and dashboard
- Supabase email/password sign-up/sign-in and Google OAuth UI
- User-owned links with random public slugs
- Five task types in the UI
- Server-checked unlock endpoint and short-lived, one-use token hashes
- RLS schema, limited public lookup RPCs and atomic one-use token redemption
- Honest integration status: social tasks do not count as verified until real provider integrations are implemented.

## Important status / limitations
This is a **starter**, not a production-ready business. The website-visit task currently records a signed-in user's click on the task button; it does not prove meaningful engagement on the external site. YouTube subscription checks are constrained by API permissions/privacy and cannot be promised for every channel/user. Discord needs OAuth and/or a bot with the appropriate server membership access. Telegram needs a bot with membership-check permissions. Instagram cannot generally verify arbitrary follows; only supported Meta API permissions/use cases can be used. Do not label these social tasks as verified until provider-specific server callbacks/checks are implemented and tested.

The starter's public link page uses limited database RPCs to expose metadata without destination URLs. The token redirect is tied to the signed-in visitor, expires after five minutes, and is redeemed through an atomic SQL function. For a production launch, add rate limiting, abuse reporting, CSRF/origin controls for mutations, stronger SSRF checks on destinations, audit logs, privacy policy/terms, and tests. Never add the Supabase service-role key to a `NEXT_PUBLIC_*` variable.

## 1. Prerequisites
- Node.js 20+
- A Supabase project
- Google OAuth credentials if you want Google login

## 2. Install
```bash
cp .env.example .env.local
npm install
```
Fill `.env.local` with your Supabase Project URL, anon/publishable key, and local site URL:
```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Database
In Supabase Dashboard -> SQL Editor, run `supabase/schema.sql`.

## 4. Authentication
In Supabase -> Authentication -> Providers:
- Enable Email.
- Enable Google and enter Google OAuth client ID/secret.
- Add `http://localhost:3000/auth/callback` to allowed redirect URLs.
- For production, add `https://YOUR_DOMAIN/auth/callback`.
Set the correct Site URL in Supabase Authentication URL Configuration.

## 5. Run locally
```bash
npm run dev
```
Open http://localhost:3000. Create an account, sign in, and create a link.

## 6. Deploy
- Push the project to a private/public GitHub repository.
- Import it into Vercel.
- Add the three environment variables in Vercel Project Settings.
- Deploy.
- In your domain registrar, add the DNS records Vercel displays for your custom domain.
- Update `NEXT_PUBLIC_SITE_URL` to `https://your-domain.example` and add the production callback URL in Supabase.
- Redeploy after changing environment variables.

## 7. Before public launch
1. Replace starter website-visit event with a clearly disclosed visit-tracking policy.
2. Implement and test provider verification independently; fail closed if provider API is unavailable.
3. Add billing only after choosing a payment provider available in your country and configuring server-side webhook verification. Premium is not wired in this starter.
4. Add abuse report, link takedown, privacy policy, terms, rate limits, monitoring and backup strategy.
5. Run `npm run build` and test on mobile before launch.
