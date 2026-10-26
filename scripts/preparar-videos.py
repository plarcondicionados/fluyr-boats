"""Prepara os vídeos do site a partir de src/data/organizacao-fotos.json.

Uso: npm run videos   (ou python scripts/preparar-videos.py)

- Converte para MP4 leve (H.264, sem áudio, máx. 720 px no lado menor) só os vídeos usados no site;
- gera a capa (.jpg) de cada vídeo;
- apaga de public/videos os que foram movidos para "Não usar";
- cria public/videos/hero.mp4: trecho curto do primeiro vídeo do Destaque, para o fundo da abertura.
Precisa do ffmpeg instalado.
"""
import json
import os
import subprocess

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEM = os.path.join(RAIZ, "fotos-originais")
DESTINO = os.path.join(RAIZ, "public", "videos")
ORGANIZACAO = os.path.join(RAIZ, "src", "data", "organizacao-fotos.json")
FORMATO = "scale='if(gt(iw,ih),-2,min(720,iw))':'if(gt(iw,ih),min(720,ih),-2)'"


def duracao(arquivo):
    saida = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", arquivo],
        capture_output=True, text=True, check=True,
    )
    return float(saida.stdout.strip())


def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def main():
    os.makedirs(DESTINO, exist_ok=True)
    secoes = json.load(open(ORGANIZACAO, encoding="utf-8"))["secoes"]
    usados = [i for nome, ids in secoes.items() if nome not in ("nao-usar", "organizar") for i in ids if i.startswith("video-")]

    for arquivo in os.listdir(DESTINO):
        nome = os.path.splitext(arquivo)[0]
        if nome.startswith("video-") and nome not in usados:
            os.remove(os.path.join(DESTINO, arquivo))

    for vid in usados:
        entrada = os.path.join(ORIGEM, f"{vid}.mp4")
        saida = os.path.join(DESTINO, f"{vid}.mp4")
        capa = os.path.join(DESTINO, f"{vid}.jpg")
        if not os.path.exists(saida) or os.path.getmtime(saida) < os.path.getmtime(entrada):
            ffmpeg("-i", entrada, "-vf", FORMATO, "-c:v", "libx264", "-preset", "slow", "-crf", "31",
                   "-maxrate", "1.4M", "-bufsize", "2.8M", "-an", "-movflags", "+faststart", saida)
        if not os.path.exists(capa):
            ffmpeg("-ss", str(min(2.0, duracao(entrada) / 3)), "-i", entrada, "-frames:v", "1", "-vf", FORMATO, "-q:v", "4", capa)
        print(f"  {vid}  {os.path.getsize(saida) / 1e6:5.1f} MB")

    destaque = [i for i in secoes.get("destaque", []) if i.startswith("video-")]
    if destaque:
        entrada = os.path.join(ORIGEM, f"{destaque[0]}.mp4")
        inicio = min(8.0, duracao(entrada) / 4)
        ffmpeg("-ss", str(inicio), "-t", "18", "-i", entrada, "-vf", "scale='min(1280,iw)':-2", "-c:v", "libx264",
               "-preset", "slow", "-crf", "28", "-an", "-movflags", "+faststart", os.path.join(DESTINO, "hero.mp4"))
        ffmpeg("-ss", str(inicio), "-i", entrada, "-frames:v", "1", "-vf", "scale='min(1280,iw)':-2", "-q:v", "3",
               os.path.join(DESTINO, "hero.jpg"))
        print(f"  hero (de {destaque[0]})  {os.path.getsize(os.path.join(DESTINO, 'hero.mp4')) / 1e6:5.1f} MB")

    total = sum(os.path.getsize(os.path.join(DESTINO, f)) for f in os.listdir(DESTINO))
    print(f"\n  Total em public/videos: {total / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
