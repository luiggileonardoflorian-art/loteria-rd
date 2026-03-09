#!/bin/bash
# ================================================================
# deploy-github.sh — Sube LoteríaRD a GitHub automáticamente
# Vercel deployment: https://loteria-rd-two.vercel.app/
# ================================================================

set -e

# ---- CONFIGURACIÓN ----
GITHUB_USER="luiggileonardoflorian-art"
GITHUB_TOKEN="ghp_VeysxnZ7zAPKDvRnn70Ix1BrzNrTXD0PxQin"
REPO_NAME="loteria-rd"  # Nombre del repo (debe coincidir con el conectado a Vercel)
COMMIT_MSG="${1:-update: mejoras LoteríaRD $(date '+%Y-%m-%d %H:%M')}"
BRANCH="main"
# -----------------------

RED='\033[0;31m'; GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🎰  LoteríaRD — Deploy a GitHub/Vercel  ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

if [ -z "$GITHUB_USER" ] || [ -z "$GITHUB_TOKEN" ]; then
  echo -e "${RED}❌ ERROR: Configura GITHUB_USER y GITHUB_TOKEN en este script.${NC}"
  echo ""
  echo "   1. Ve a https://github.com/settings/tokens/new"
  echo "   2. Nombre: 'loteria-rd-deploy'"
  echo "   3. Permisos: ✓ repo (Full control)"
  echo "   4. Copia el token → pégalo en GITHUB_TOKEN="
  echo "   5. Pon tu usuario en GITHUB_USER="
  exit 1
fi

echo -e "👤 ${BLUE}Usuario:${NC} $GITHUB_USER"
echo -e "📦 ${BLUE}Repo:${NC} $REPO_NAME"
echo -e "🔀 ${BLUE}Branch:${NC} $BRANCH"
echo ""

# Verificar / crear repo
echo -e "🔍 Verificando repositorio..."
HTTP=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: token $GITHUB_TOKEN" "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

if [ "$HTTP" = "404" ]; then
  echo -e "📁 Creando repo '$REPO_NAME'..."
  RESP=$(curl -s -X POST \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$REPO_NAME\",\"description\":\"Portal de resultados de loterías dominicanas | loteria-rd-two.vercel.app\",\"private\":false}" \
    "https://api.github.com/user/repos")
  echo "$RESP" | grep -q '"full_name"' && echo -e "${GREEN}✅ Repo creado${NC}" || { echo -e "${RED}❌ Error:${NC}"; echo "$RESP"; exit 1; }
else
  echo -e "${GREEN}✅ Repo encontrado${NC}"
fi

# Git setup
git config --global user.email "deploy@loteriard.com" 2>/dev/null || true
git config --global user.name "LoteríaRD Bot" 2>/dev/null || true
[ ! -d ".git" ] && git init && git branch -M $BRANCH

# .gitignore
[ ! -f ".gitignore" ] && cat > .gitignore << 'GI'
node_modules/
.next/
out/
.env
.env.local
.DS_Store
*.log
.vercel
GI

# Stage + commit
echo ""
echo -e "📝 ${BLUE}Preparando commit...${NC}"
git add -A
git diff --cached --quiet && echo -e "${YELLOW}ℹ️  Sin cambios nuevos${NC}" || { git commit -m "$COMMIT_MSG" && echo -e "${GREEN}✅ Commit: $COMMIT_MSG${NC}"; }

# Push
REMOTE="https://$GITHUB_USER:$GITHUB_TOKEN@github.com/$GITHUB_USER/$REPO_NAME.git"
git remote | grep -q "^origin$" && git remote set-url origin "$REMOTE" || git remote add origin "$REMOTE"

echo ""
echo -e "⬆️  ${BLUE}Subiendo a GitHub...${NC}"
git push -u origin $BRANCH --force

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ ¡SUBIDO! Vercel desplegará en ~30s   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "🔗 GitHub:  https://github.com/$GITHUB_USER/$REPO_NAME"
echo -e "🚀 Vercel:  https://loteria-rd-two.vercel.app/"
echo ""
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo -e "${YELLOW}  📋 Si Vercel no está conectado:${NC}"
echo -e "${YELLOW}═══════════════════════════════════════════${NC}"
echo "  1. Ve a https://vercel.com/new"
echo "  2. Import → GitHub → $REPO_NAME"
echo "  3. Framework: Next.js (autodetectado)"
echo "  4. Click Deploy → ¡listo!"
