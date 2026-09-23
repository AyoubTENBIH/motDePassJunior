from PIL import Image
from pathlib import Path

assets = Path(
    r"C:\Users\ayoub_ten\.cursor\projects\d-Travail-Marketing-agancy-escolia-clients-le-mot-de-passe-junior-site-vitrine\assets"
)
out = Path(
    r"d:\_Travail\Marketing_agancy\escolia\clients\le mot de passe junior\site_vitrine\public\media"
)


def remove_black_bg(src: Path, dest: Path, threshold: int = 38, soft_edge: int = 22):
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    px = img.load()
    visited = [[False] * w for _ in range(h)]
    stack = []

    def is_bg(x, y):
        r, g, b, a = px[x, y]
        if a < 8:
            return True
        return r <= threshold and g <= threshold and b <= threshold

    for x in range(w):
        stack.append((x, 0))
        stack.append((x, h - 1))
    for y in range(h):
        stack.append((0, y))
        stack.append((w - 1, y))

    while stack:
        x, y = stack.pop()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        visited[y][x] = True
        if not is_bg(x, y):
            continue
        px[x, y] = (0, 0, 0, 0)
        stack.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r > soft_edge or g > soft_edge or b > soft_edge:
                continue
            edge = False
            for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] == 0:
                    edge = True
                    break
            if edge:
                px[x, y] = (r, g, b, 0)

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG")
    print(f"saved {dest} ({w}x{h})")


child_src = next(assets.glob("*child*.png"))
cartoon_src = next(assets.glob("*cartoon3*.png"))
remove_black_bg(child_src, out / "images" / "inscription-fille.png", threshold=42, soft_edge=28)
remove_black_bg(cartoon_src, out / "icons" / "inscription-cartoon.png", threshold=45, soft_edge=30)
print("done")
