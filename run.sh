#!/bin/bash
PORT=3000
echo "🎨 Menjalankan Kids Drawing App di http://localhost:$PORT ..."
open "http://localhost:$PORT"
python3 -m http.server $PORT
