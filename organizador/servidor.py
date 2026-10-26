"""Servidor local do organizador de fotos da Fluyr Boats.

Uso: python organizador/servidor.py   (abre em http://localhost:5180)
Serve a pasta do projeto e salva a organização em src/data/organizacao-fotos.json (lida pelo site)
e prepara os vídeos com scripts/preparar-videos.py a cada salvamento.
"""
import http.server
import json
import os
import socketserver
import subprocess
import sys
import threading

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARQUIVO = os.path.join(RAIZ, "src", "data", "organizacao-fotos.json")
PORTA = 5180


def preparar_videos():
    script = os.path.join(RAIZ, "scripts", "preparar-videos.py")
    subprocess.run([sys.executable, script], cwd=RAIZ)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=RAIZ, **kwargs)

    def do_GET(self):
        if self.path in ("/", "/index.html"):
            self.path = "/organizador/index.html"
        if self.path.startswith("/api/organizacao"):
            dados = open(ARQUIVO, "rb").read() if os.path.exists(ARQUIVO) else b"null"
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(dados)
            return
        super().do_GET()

    def do_POST(self):
        if self.path != "/api/organizacao":
            self.send_error(404)
            return
        corpo = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        dados = json.loads(corpo)
        with open(ARQUIVO, "w", encoding="utf-8") as f:
            json.dump(dados, f, ensure_ascii=False, indent=2)
        # converte em segundo plano os vídeos que entraram no site (e apaga os que saíram)
        threading.Thread(target=preparar_videos, daemon=True).start()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(b'{"ok":true}')


socketserver.ThreadingTCPServer.allow_reuse_address = True
socketserver.ThreadingTCPServer.daemon_threads = True
with socketserver.ThreadingTCPServer(("127.0.0.1", PORTA), Handler) as httpd:
    print(f"Organizador em http://localhost:{PORTA}")
    httpd.serve_forever()
