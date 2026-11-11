#!/usr/bin/env bash
# Escadio Marketplace — Quality Gate & Backpressure Determinístico
set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

MODE="full"
for arg in "$@"; do
  case "$arg" in
    --unit|--quick|--fast)
      MODE="quick"
      ;;
    --full)
      MODE="full"
      ;;
    --help|-h)
      echo "Uso: ./scripts/check.sh [--quick | --fast | --full]"
      echo "  --full (padrão): Suíte completa (Sintaxe, Testes 100% e Build Standalone)"
      echo "  --quick / --fast: Modo rápido de desenvolvimento (Sintaxe e Testes - NÃO autoriza push)"
      exit 0
      ;;
    *)
      echo "Argumento desconhecido: $arg" >&2
      exit 1
      ;;
  esac
done

echo "================================================="
echo "  Escadio Marketplace Quality Gate — scripts/check.sh"
echo "  Modo Selecionado: $MODE"
echo "================================================="

# [1/3] Validação de sintaxe
echo "[1/3] Validando sintaxe de server.mjs e scripts..."
node --check server.mjs
for f in scripts/*.mjs; do
  [ -f "$f" ] && node --check "$f"
done
echo "  ✅ Sintaxe Node.js: OK"

# [2/3] Suíte de Testes Automatizados
echo "[2/3] Executando Suíte de Testes (node --test tests/*.test.mjs)..."
node --test tests/*.test.mjs
echo "  ✅ Suíte de Testes: PASS"

# [3/3] Build Standalone
if [ "$MODE" = "full" ]; then
  echo "[3/3] Compilação e Build Standalone (build-standalone.mjs)..."
  node scripts/build-standalone.mjs
  echo "  ✅ Build Standalone: OK"
else
  echo "[3/3] Build standalone pulado (--quick)."
fi

echo "================================================="
if [ "$MODE" = "full" ]; then
  echo "✅ TUDO VERDE: Backpressure do Marketplace APROVADO (100%)"
  echo "   Autorizado para publicação!"
else
  echo "✅ MODO RÁPIDO APROVADO: Sintaxe e Testes verdes."
  echo "   ⚠️ ATENÇÃO: Modo rápido NÃO autoriza publicação ou push. Execute sem flags para validação completa."
fi
echo "================================================="
exit 0
