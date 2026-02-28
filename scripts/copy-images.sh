#!/bin/bash
# Копирует картинки из референса (app/dist) в public этого проекта.
# Запусти из корня проекта: bash scripts/copy-images.sh

SOURCE="${1:-$HOME/Desktop/Проекты с poehali/app/dist}"
DEST="$(dirname "$0")/../public"

if [ ! -d "$SOURCE" ]; then
  echo "Папка не найдена: $SOURCE"
  echo "Укажи путь к app/dist вручную: bash scripts/copy-images.sh /путь/к/Проекты с poehali/app/dist"
  exit 1
fi

for f in hero-bg.jpg before.jpg after.jpg service-1.jpg service-2.jpg service-3.jpg portfolio-1.jpg portfolio-2.jpg portfolio-3.jpg; do
  if [ -f "$SOURCE/$f" ]; then
    cp "$SOURCE/$f" "$DEST/" && echo "OK: $f"
  else
    echo "Нет файла: $f"
  fi
done
echo "Готово. Картинки в $DEST"
