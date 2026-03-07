# PRD: AgentForge — Secure, Self-Hosted Autonomous AI Agent Platform

## Problem Statement

OpenClaw proved massive demand (68K+ GitHub stars) for self-hosted autonomous AI agents, but has toxic security reputation (RCE exploits, bot takeovers, Bloomberg/XDA/The Register warnings). The n8n + Desktop Commander + Cloudflare tunnel setup works but requires 30+ minutes of manual configuration across 5+ services. 600K people saw the tutorial tweet — the #1 reply was "I couldn't build it myself."

**Gap:** Kanıtlanmış talep var, güvenli ve basit bir alternatif yok.

## Product Vision

`docker compose up` → 2 dakikada güvenli, otonom AI agent çalışıyor. Telegram'dan konuş, gece çalışsın, sabah rapor hazır.

---

## Competitive Landscape

| Proje | Stars | Durum | Zayıflık |
|-------|-------|-------|----------|
| OpenClaw | 68K+ | Security disaster | RCE, bot takeover, authentication bypass |
| n8n AI Starter Kit | 14K | Workflow tool | Agent değil, messaging yok |
| Gru | 207 | Telegram/Slack agent | Çok küçük, Python, az özellik |
| Moltworker (Cloudflare) | 8K | OpenClaw on CF Workers | OpenClaw'a bağımlı |
| Dive | 1.7K | MCP Desktop App | Chat app, otonom değil |

## Our Advantages

- **model-context-protocol.com** → 30K/gün trafik, dağıtım kanalı hazır
- **MCP deep knowledge** → protokolü en iyi bilen ekiplerden biri
- **Cloudflare expertise** → tunnel, Workers, edge architecture
- **TypeScript** → tüm stack tek dil
- **Clean reputation** → OpenClaw bagajı yok

---

## Technical Architecture

## Why Docker + CF Tunnel? (And When You DON'T Need Them)

Docker ve Cloudflare Tunnel her senaryoda gerekli değil. Ne yapmak istediğine göre stack değişir:

### Scenario A: Sadece API Entegrasyonları (Gmail, Drive, Notion via API)

Docker yok, CF Tunnel yok. n8n cloud veya bir VPS üzerinde doğrudan çalışır. Telegram trigger + Gmail node + Notion node = hepsi API üzerinden bağlanır. Laptop'un açık olması gerekmez, dosya erişimi gerekmez.

### Scenario B: Laptop Dosya Erişimi Gerekiyor

Docker **gerekli** (Desktop Commander'ı sandbox'lamak için — sadece mount edilen klasörlere erişir). CF Tunnel **gerekli** (laptop NAT arkasında, Telegram webhook'unun laptop'a ulaşması için outbound-only tunnel lazım, public IP gerekmez). VPS opsiyonel — her şeyi laptop'ta da çalıştırabilirsin.

### Scenario C: Her Şey Laptop'ta, $0 VPS Maliyeti

Docker + CF Tunnel ile laptop'u sunucu gibi kullan. En ucuz seçenek. Dezavantajı: laptop kapalıyken agent çalışmaz.

### Karar Tablosu

| Ne istiyorsun? | Docker | CF Tunnel | VPS |
|----------------|--------|-----------|-----|
| Sadece Telegram + Gmail API | ❌ | ❌ | n8n cloud veya VPS |
| + Laptop dosyalarına erişim | ✅ | ✅ | Opsiyonel |
| Her şey laptop'ta, $0 | ✅ | ✅ | ❌ |

### Her Bir Bileşen Ne İşe Yarıyor?

- **Docker = Security Sandbox.** Desktop Commander sadece mount edilen klasörlere erişir. Host sisteme, API key'lere, diğer container'lara erişemez. Agent'ın dosya sistemi erişimini izole eder.

- **CF Tunnel = NAT Bypass.** Laptop'tan Cloudflare'e outbound-only bağlantı açar. Böylece Telegram webhook'u, public IP'n olmadan laptop'taki n8n'e ulaşabilir. Inbound port açmaya gerek yok, güvenli.

- **n8n Built-in Nodes = Doğrudan API Bağlantısı.** n8n'in 400+ entegrasyonu (Gmail, Drive, Notion, Stripe, Slack vb.) OAuth2 veya API key ile doğrudan ilgili servise bağlanır. Desktop Commander veya browser üzerinden GEÇMEZ. Gmail node → Gmail API, Notion node → Notion API. Direkt.

### İki Ayrı Entegrasyon Katmanı

n8n'de iki farklı entegrasyon yaklaşımı var ve bunlar birbirinden bağımsız çalışır:

```
Katman 1: Built-in Nodes (API Entegrasyonları)
┌──────────────────────────────────────────────┐
│  Gmail Node ──→ Gmail API (OAuth2)           │
│  Drive Node ──→ Google Drive API (OAuth2)    │
│  Notion Node ──→ Notion API (API Key)        │
│  Stripe Node ──→ Stripe API (API Key)        │
│  Slack Node ──→ Slack API (OAuth2)           │
│  ... 400+ entegrasyon                        │
└──────────────────────────────────────────────┘
    ↑ Doğrudan API bağlantısı. Docker/Tunnel gerektirmez.
    ↑ n8n nerede çalışırsa çalışsın (cloud, VPS, laptop) çalışır.

Katman 2: MCP Servers (Lokal Erişim)
┌──────────────────────────────────────────────┐
│  Desktop Commander ──→ Dosya okuma/yazma     │
│                    ──→ Terminal komutları     │
│                    ──→ SADECE mount edilen    │
│                        klasörler             │
│                                              │
│  ⚠️  Browser açmaz, mouse kontrol etmez,    │
│      GUI ile etkileşmez                      │
└──────────────────────────────────────────────┘
    ↑ Lokal dosya/terminal erişimi. Docker gerektirir (sandbox için).
    ↑ Laptop erişimi için CF Tunnel gerektirir.
```

Bu iki katman birbirinden tamamen bağımsızdır. Gmail'e erişmek için Desktop Commander'a ihtiyacın yok. Dosya okumak için Gmail node'una ihtiyacın yok.

---

### Tweet'teki Stack Nasıl Çalışıyor (Teknik Açıklama)

```
┌─────────────────────────────────────────────────────┐
│                    USER DEVICES                      │
│         Telegram / Slack / WhatsApp                  │
└──────────────────┬──────────────────────────────────┘
                   │ Message
                   ▼
┌─────────────────────────────────────────────────────┐
│              CLOUDFLARE TUNNEL                       │
│   (Encrypted outbound-only connection)               │
│   Custom domain: agent.yourdomain.com                │
│   No inbound ports exposed                           │
│   Zero Trust authentication                          │
└──────────────────┬──────────────────────────────────┘
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────────────────┐
│                 VPS ($4.99/mo)                        │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │              n8n (Docker)                     │    │
│  │                                               │    │
│  │  ┌─────────┐  ┌──────────┐  ┌────────────┐  │    │
│  │  │Telegram │→ │ AI Agent │→ │  MCP Client │  │    │
│  │  │Trigger  │  │ (Opus/   │  │  (tool-use) │  │    │
│  │  │         │  │  Sonnet) │  │             │  │    │
│  │  └─────────┘  └────┬─────┘  └──────┬──────┘  │    │
│  │                    │               │          │    │
│  │              ┌─────▼─────┐   ┌─────▼──────┐  │    │
│  │              │  Memory   │   │ Sub-agents │  │    │
│  │              │  (Window  │   │ (specialist│  │    │
│  │              │   Buffer) │   │  workers)  │  │    │
│  │              └───────────┘   └────────────┘  │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  Katman 2: Desktop Commander (Docker)         │    │
│  │  MCP Server — sandboxed                       │    │
│  │  SADECE dosya sistemi + terminal              │    │
│  │                                               │    │
│  │  ✅ Mounted folders only (read/write)         │    │
│  │  ✅ Terminal commands (sandboxed)              │    │
│  │  ✅ No API key access                         │    │
│  │  ❌ Cannot escape container                   │    │
│  │  ❌ No browser, no GUI, no mouse control      │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │    Katman 1: n8n Built-in Nodes (API)        │    │
│  │    OAuth2 / API Key ile DOGRUDAN baglanir     │    │
│  │                                               │    │
│  │  📧 Gmail    📁 Drive    📝 Notion           │    │
│  │  💳 Stripe   📊 Linear   🔗 400+ integration │    │
│  │                                               │    │
│  │  ⚠️  Desktop Commander uzerinden GECMEZ      │    │
│  │  ⚠️  Browser kullanmaz, API-to-API direkt    │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │         Sandbox (Docker container)            │    │
│  │         For installing new tools              │    │
│  │         Isolated from main system             │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

### Otonom Çalışma Döngüsü — Teknik Olarak Nasıl?

**Soru: Agent "otonom olarak saatlerce çalışıyor" derken ne kastediliyor?**

#### 1. Telegram Trigger → Agent Loop

```
User mesaj gönderir (Telegram)
    → n8n Telegram Trigger node yakalar
    → AI Agent node'a iletir
    → Agent LLM'e gönderir (Claude API)
    → LLM tool-use response döner
    → Agent MCP üzerinden tool çalıştırır
    → Sonuç LLM'e geri gider
    → LLM tekrar tool-use isteyebilir (LOOP)
    → Final response Telegram'a gönderilir
```

Bu "agentic loop" — agent bir tool çağırır, sonucuna bakar, gerekiyorsa başka tool çağırır. Tek bir Telegram mesajı 10-20 tool call tetikleyebilir.

#### 2. Proactive/Scheduled Work (Otonom)

n8n'de Telegram trigger dışında **Schedule Trigger** ve **Cron** node'ları var:

```
Schedule Trigger (her 4 saatte bir)
    → AI Agent: "Bugünkü görevleri kontrol et"
    → Agent MCP ile dosya okur (Desktop Commander)
    → Görev listesini görür
    → İlk görevi alır, çalışır
    → Sonucu dosyaya yazar
    → Bir sonraki göreve geçer
    → Tamamlandığında Telegram'a rapor gönderir
```

**Bu "uyurken çalışma" mekanizması:**
- Evening check-in'de "overnight work" listesi verilir
- Agent gece boyunca schedule trigger ile çalışır
- Sabah morning report dosyaya yazılır
- Kullanıcı uyanınca raporu görür

#### 3. Memory — Nasıl Hatırlıyor?

n8n'de memory node'ları:

```
Window Buffer Memory:
    → Son N mesajı tutar (conversation context)
    → Her yeni mesajda context'e eklenir

Persistent Memory (Supabase/PostgreSQL):
    → Agent öğrendiğini DB'ye yazar
    → Her yeni görevde ilgili memory'leri çeker
    → "Geçen sefer bu tweet formatı tuttu" → hatırlıyor
```

#### 4. Sub-agents — Nasıl Çalışıyor?

n8n'de AI Agent node'ları zincirlenebilir:

```
Ana Agent (Coordinator)
    ├── Research Sub-agent (web araştırma)
    ├── Content Sub-agent (yazı yazma)
    └── Analysis Sub-agent (veri analizi)

Coordinator mesajı alır
    → "Bu konuyu araştır" → Research sub-agent'a delege eder
    → Sonuç gelir → "Bunu tweet yaz" → Content sub-agent'a
    → Draft gelir → Coordinator onaylar veya revize ister
```

#### 5. Desktop Commander — SADECE Dosya Sistemi + Terminal Erişimi

MCP Server olarak çalışır, Docker container içinde. **Sadece dosya okuma/yazma ve terminal komutları çalıştırır.**

```
✅ Desktop Commander YAPAR:
    → readFile("/shared/tasks/today.md")      — Dosya okuma
    → writeFile("/shared/reports/morning.md")  — Dosya yazma
    → executeCommand("npm run build")          — Terminal komutu
    → listDirectory("/shared/")                — Klasör listeleme

❌ Desktop Commander YAPMAZ:
    → Chrome/Firefox açmaz
    → Mouse kontrol etmez, click yapmaz
    → Browser automation yapmaz
    → GUI ile etkileşmez
    → Web sayfası render etmez
    → Screenshot almaz

⚠️  Browser Automation İçin Ayrı Araçlar Gerekir:
    → Playwright MCP Server — headless browser automation
    → Claude Computer-Use — ekran, mouse, keyboard kontrolü
    → Bunlar Desktop Commander'dan tamamen ayrı tool'lardır

📡 API Entegrasyonları Desktop Commander'dan GEÇMEZ:
    → Gmail, Drive, Notion, Stripe, Slack vb.
    → n8n'in 400+ built-in node'u doğrudan API ile bağlanır
    → OAuth2 / API key ile direkt servis bağlantısı
    → Desktop Commander'a hiç ihtiyaç duymaz

Güvenlik:
    → Sadece mounted volume'lara erişir (/shared/)
    → Host sisteme erişemez
    → API key'leri göremez (env'de değil)
    → Network izole (Docker network)
```

#### 6. Cloudflare Tunnel — Güvenli Bağlantı

```
VPS'te cloudflared daemon çalışır
    → Outbound-only bağlantı (inbound port yok!)
    → Cloudflare edge'e tunnel açar
    → agent.yourdomain.com → tunnel → VPS:5678 (n8n)

Zero Trust:
    → Cloudflare Access ile authentication
    → Sadece yetkili cihazlar bağlanabilir
    → mcp-proxy ile MCP serverlar remote erişilebilir
```

#### 7. "Ralph Wiggum Loop" — Ne Bu?

Tweet'te geçen bu terim, n8n community'den:

```
Agent → Görev yap → Sonucu kontrol et → Yeterli mi?
    → Evet → Tamamla
    → Hayır → Tekrar dene (farklı yaklaşımla)
    → 3 deneme başarısız → İnsan onayı iste
```

Self-correcting loop. Agent kendi hatasını fark edip düzeltiyor.

---

## Ürünümüz: Bunu 1-Click Yapacak

### docker-compose.yml

```yaml
services:
  n8n:
    image: n8nio/n8n
    ports: ["5678:5678"]
    volumes:
      - n8n_data:/home/node/.n8n
      - ./shared:/shared
    environment:
      - N8N_AI_ENABLED=true

  desktop-commander:
    image: agentforge/desktop-commander
    volumes:
      - ./shared:/workspace:rw
      - ./config/permissions.yml:/permissions.yml:ro
    security_opt:
      - no-new-privileges:true
    read_only: true

  mcp-proxy:
    image: agentforge/mcp-proxy
    environment:
      - MCP_SERVERS=desktop-commander,gmail,notion
    depends_on:
      - desktop-commander

  cloudflared:
    image: cloudflare/cloudflared
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${CF_TUNNEL_TOKEN}

  telegram-bot:
    image: agentforge/telegram-bridge
    environment:
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_TOKEN}
    depends_on:
      - n8n

volumes:
  n8n_data:
```

### Setup Script

```bash
#!/bin/bash
# agentforge.sh — 1-click setup

echo "🔧 AgentForge Setup"

# 1. API keys
read -p "Claude API Key: " CLAUDE_KEY
read -p "Telegram Bot Token: " TELEGRAM_TOKEN
read -p "Cloudflare Tunnel Token (optional): " CF_TOKEN

# 2. Write .env
cat > .env << EOF
ANTHROPIC_API_KEY=$CLAUDE_KEY
TELEGRAM_BOT_TOKEN=$TELEGRAM_TOKEN
CF_TUNNEL_TOKEN=$CF_TOKEN
EOF

# 3. Create shared folders
mkdir -p shared/{tasks,reports,notes,drafts}

# 4. Import n8n workflow templates
cp templates/*.json shared/workflows/

# 5. Launch
docker compose up -d

echo "✅ AgentForge running!"
echo "📱 Open Telegram and message your bot"
echo "🌐 n8n dashboard: http://localhost:5678"
```

---

## Revenue Model

### Open Source (Free)
- Docker Compose
- Basic Telegram bot
- Desktop Commander (sandboxed)
- 1 free template (Productivity Agent)

### Paid Templates ($19-149 one-time)

| Template | Fiyat | Açıklama |
|----------|-------|----------|
| Productivity Agent | $29 | Morning report, evening check-in, overnight work (Zakk sistemi) |
| Content Agent | $49 | X/LinkedIn research → draft → post → performance analysis |
| Research Agent | $39 | Web + X + HN + Reddit scan → daily digest |
| Sales Agent | $79 | Lead finding → outreach drafts → CRM sync |
| 6-Agent Company | $149 | Vox sistemi: coordinator + executor + observer + analyst + content + growth |
| Inbox Agent | $19 | Email summarize → newsletter digest → action items |

### Cloud Hosted (Monthly)

| Plan | Fiyat |
|------|-------|
| Starter | $9/mo (1 agent, 1 template) |
| Pro | $29/mo (3 agents, tüm templates) |
| Team | $99/mo (unlimited + SSO + audit) |

### Smart Router Add-on

| | |
|--|--|
| Free | Tek model (kullanıcı seçer) |
| $9/mo | Smart routing: basit → Haiku ($0.25/1M), zor → Opus ($15/1M), %78 tasarruf |

---

## User Cost Breakdown

| Servis | Maliyet |
|--------|---------|
| Docker Desktop | Free |
| n8n (self-hosted) | Free |
| Cloudflare tunnel | Free |
| Telegram bot | Free |
| Domain (opsiyonel) | $5/yıl |
| **LLM API (tek gerçek maliyet)** | |
| - Haiku 4.5 only | ~$6/ay |
| - Smart routing (Haiku + Sonnet) | ~$15-30/ay |
| - Opus heavy usage | ~$100-330/ay |

**Realistic user cost: $15-30/ay**

---

## Marketing-Focused Use Cases

### 1. Personal Productivity Agent (Zakk Model)
**Hook:** "Sabah uyandığında morning report hazır. Gece sen uyurken agent çalışıyor."

```
Morning Report → Day Work → Evening Check-in → Overnight Work → Loop
```

- LogSeq/Obsidian shared brain
- Task management
- Goal tracking
- Weekly/monthly reviews
- **Target:** Founders, solopreneurs
- **Willingness to pay:** $29/template

### 2. Content Creation Machine
**Hook:** "Uyurken X hesabın büyüyor."

```
Research trending → Draft content → Schedule posts → Analyze performance → Learn → Iterate
```

- X API integration (read + write)
- Voice cloning (senin tarzında yazar)
- Performance-based learning
- Daily Telegram digest
- **Target:** Creators, marketers
- **Willingness to pay:** $49/template

### 3. AI Sales Development Rep
**Hook:** "Gece lead buluyor, sabah inbox'ında."

```
Monitor X/LinkedIn → Find buying signals → Craft outreach → Log to CRM → Follow up
```

- Competitor mention tracking
- Intent signal detection
- Personalized outreach drafts
- CRM webhook (HubSpot, Pipedrive)
- **Target:** B2B SaaS founders, sales teams
- **Willingness to pay:** $79/template

### 4. 6-Agent Company (Vox Model)
**Hook:** "6 AI agent şirketini yönetiyor. $8/ay."

```
Coordinator → Executor → Observer → Analyst → Content → Growth
Proposals → Missions → Steps → Events → Memory → Loop
```

- Agent conversations (standup, debate, watercooler)
- Memory system (5 types)
- Relationship dynamics
- Voice evolution
- **Target:** Technical founders, AI enthusiasts
- **Willingness to pay:** $149/template

### 5. Competitor Intelligence
**Hook:** "Rakip bir şey değiştirdi → 5 dakikada biliyorsun."

```
Monitor competitor accounts → Track changes → Sentiment analysis → Alert → Briefing
```

- X/LinkedIn/Web monitoring
- Daily/weekly intelligence briefing
- Trend detection
- **Target:** Product teams, founders
- **Willingness to pay:** $79/template

---

## MVP Scope (2 Weeks)

### Week 1: Core Platform
- [ ] docker-compose.yml (n8n + Desktop Commander + Cloudflare tunnel + Telegram bot)
- [ ] Setup script (`curl -fsSL https://agentforge.sh | sh`)
- [ ] Permissions config (permissions.yml)
- [ ] 1 free template: Productivity Agent
  - [ ] Morning report workflow
  - [ ] Evening check-in workflow
  - [ ] Overnight work queue
  - [ ] Telegram integration
- [ ] README + setup docs

### Week 2: Monetization
- [ ] 2 paid templates: Content Agent + Research Agent
- [ ] Landing page (Next.js)
- [ ] Stripe checkout for templates
- [ ] Smart router (Haiku/Sonnet/Opus auto-routing)
- [ ] model-context-protocol.com integration
- [ ] GitHub repo launch
- [ ] Product Hunt prep

### Week 3: Launch
- [ ] Product Hunt launch
- [ ] X/LinkedIn announcement
- [ ] model-context-protocol.com featured listing
- [ ] First 100 users target

---

## Success Metrics

| Metric | Week 1 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| GitHub stars | 500 | 3,000 | 10,000 |
| Template sales | - | 100 | 500 |
| Cloud users | - | 50 | 300 |
| Revenue | - | $3,900 | $15,000/mo |

---

## Technical References

- [n8n AI Agent Docs](https://n8n.io/ai-agents/)
- [n8n MCP Integration](https://docs.n8n.io/advanced-ai/accessing-n8n-mcp-server/)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- [Cloudflare Remote MCP Server](https://developers.cloudflare.com/agents/guides/remote-mcp-server/)
- [Desktop Commander MCP](https://desktopcommander.app/)
- [OpenClaw Security Issues - The Register](https://www.theregister.com/2026/02/02/openclaw_security_issues/)
- [OpenClaw Security - Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/openclaw-s-an-ai-sensation-but-its-security-a-work-in-progress)
- [Vox Tutorial: 6 AI Agents](https://x.com/Voxyz_ai/status/2020272022417289587)
- [n8n Self-Hosted AI Starter Kit](https://github.com/n8n-io/self-hosted-ai-starter-kit)
- [Gru - Self-hosted Agent](https://github.com/zscole/gru)
- [ClawRouter - Smart LLM Routing](https://github.com/BlockRunAI/clawrouter)
- [awesome-openclaw-usecases](https://github.com/hesamsheikh/awesome-openclaw-usecases)

---

*Created: 2026-02-09*
*Author: Mert Köseoğlu, Software Forge*
