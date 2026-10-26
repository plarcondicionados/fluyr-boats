"""Exporta as artes de instagram/artes.html para PNG 1080×1350 usando o Edge em modo headless.

Uso: python instagram/exportar.py            (todas)
     python instagram/exportar.py p03-1 p06  (só algumas)
Saída: instagram/posts/<id>.png
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path

PASTA = Path(__file__).resolve().parent
ARTES = PASTA / "artes.html"
SAIDA = PASTA / "posts"
EDGE_CANDIDATOS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
]


def navegador():
    for c in EDGE_CANDIDATOS:
        if os.path.exists(c):
            return c
    sys.exit("Edge ou Chrome não encontrado.")


def ids_disponiveis():
    texto = ARTES.read_text(encoding="utf-8")
    bloco = texto[texto.index("const ARTES = {"):]
    return re.findall(r"^\s+'(p\d\d(?:-\d)?)':", bloco, flags=re.M)


def esperar_arquivo(arquivo, limite=60):
    tamanho_anterior = -1
    fim = time.time() + limite
    while time.time() < fim:
        if arquivo.exists():
            tamanho = arquivo.stat().st_size
            if tamanho > 0 and tamanho == tamanho_anterior:
                return True
            tamanho_anterior = tamanho
        time.sleep(0.5)
    return False


def main():
    SAIDA.mkdir(exist_ok=True)
    ids = sys.argv[1:] or ids_disponiveis()
    exe = navegador()
    # perfil novo a cada execução: sem ele o Edge reaproveita a página em cache e exporta a versão antiga
    perfil = Path(tempfile.mkdtemp(prefix="fluyr-edge-"))
    for i in ids:
        destino = SAIDA / f"{i}.png"
        destino.unlink(missing_ok=True)
        url = ARTES.as_uri() + f"?p={i}"
        subprocess.run(
            [
                exe, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                "--no-first-run", "--no-default-browser-check",
                f"--user-data-dir={perfil}", "--force-device-scale-factor=1", "--window-size=1080,1350",
                "--virtual-time-budget=9000", f"--screenshot={destino}", url,
            ],
            check=True, capture_output=True,
        )
        # o msedge.exe devolve o controle antes do processo filho gravar o PNG: espera o arquivo aparecer
        if not esperar_arquivo(destino):
            sys.exit(f"  {i}.png não foi gerado (o Edge demorou mais de 60 s).")
        print(f"  {i}.png  {destino.stat().st_size // 1024} kB")
    shutil.rmtree(perfil, ignore_errors=True)


if __name__ == "__main__":
    main()
