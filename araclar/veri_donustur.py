#!/usr/bin/env python3
"""
Mezun listesini (CSV, her satır bir mezun) sitenin okuduğu assets/veri.js biçimine dönüştürür.

Kullanım:
    python3 araclar/veri_donustur.py mezunlar.csv > assets/veri.js
    python3 araclar/veri_donustur.py mezunlar.csv --kayitli 1834 --guncel-yil 2026 > assets/veri.js

Zorunlu sütunlar (başlık satırı bu adlarla):
    birim_grup      Fakülteler | Enstitüler | Meslek Yüksekokulları | Konservatuvarlar | Yüksekokullar ...
    birim           ör. Siyasal Bilgiler Fakültesi
    program         ör. İnsan Kaynakları Yönetimi
    tur             Lisans | Ön Lisans | Lisansüstü
    mezuniyet_yili  ör. 2021
    cinsiyet        K | E  (Kadın/Erkek de kabul edilir)
İsteğe bağlı sütunlar:
    il              ikamet ili (81 il adından biri)
    uyruk           yabancı uyruklu mezunlarda ülke adı (TC/boş = yurt içi)
    sektor          mezunun beyan ettiği çalışma alanı

Kişisel veri (ad, T.C. no, öğrenci no) GEREKMEZ ve çıktıya YAZILMAZ; yalnızca toplamlar üretilir.
"""
import argparse, csv, json, sys
from collections import defaultdict

def cins(v):
    v = (v or "").strip().upper()
    if v in ("K", "KADIN", "F", "FEMALE", "KIZ"): return 0
    if v in ("E", "ERKEK", "M", "MALE"): return 1
    return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv")
    ap.add_argument("--kayitli", type=int, default=0, help="Mezun Bilgi Sistemi'ne kayıtlı mezun sayısı")
    ap.add_argument("--guncel-yil", type=int, default=None)
    ap.add_argument("--ayrac", default=None, help="CSV ayracı (varsayılan: otomatik)")
    a = ap.parse_args()

    with open(a.csv, encoding="utf-8-sig", newline="") as f:
        ornek = f.read(4096); f.seek(0)
        ayrac = a.ayrac or csv.Sniffer().sniff(ornek, delimiters=",;\t").delimiter
        satirlar = list(csv.DictReader(f, delimiter=ayrac))

    birim = {}                                      # (grup, birim) -> {program: {"tur":..,"yillar":{y:[k,e]}}}
    iller = defaultdict(lambda: [0, 0, 0, 0])
    ulke = {}
    sektor = defaultdict(int)
    atlanan = 0
    yillar_hepsi = [int(r["mezuniyet_yili"]) for r in satirlar if (r.get("mezuniyet_yili") or "").strip().isdigit()]
    guncel = a.guncel_yil or (max(yillar_hepsi) if yillar_hepsi else 0)

    for r in satirlar:
        c = cins(r.get("cinsiyet"))
        y = (r.get("mezuniyet_yili") or "").strip()
        if c is None or not y.isdigit():
            atlanan += 1; continue
        y = int(y)
        g, b, p, t = (r.get(k, "").strip() for k in ("birim_grup", "birim", "program", "tur"))
        prog = birim.setdefault((g, b), {}).setdefault(p, {"tur": t, "yillar": {}})
        prog["yillar"].setdefault(str(y), [0, 0])[c] += 1

        il = (r.get("il") or "").strip()
        if il:
            iller[il][c] += 1
            if y == guncel: iller[il][2 + c] += 1

        u = (r.get("uyruk") or "").strip()
        if u and u.upper() not in ("TC", "T.C.", "TÜRKİYE", "TURKIYE", "TR"):
            d = ulke.setdefault(u, {"ulke": u, "K": 0, "E": 0, "tur": {}, "buYil": [0, 0], "programlar": {}})
            d["K" if c == 0 else "E"] += 1
            d["tur"].setdefault(t, [0, 0])[c] += 1
            if y == guncel: d["buYil"][c] += 1
            pk = d["programlar"].setdefault(b + "||" + p, {"birim": b, "program": p, "tur": t, "K": 0, "E": 0})
            pk["K" if c == 0 else "E"] += 1

        s = (r.get("sektor") or "").strip()
        if s: sektor[s] += 1

    ulkeler = []
    for d in ulke.values():
        d["programlar"] = sorted(d["programlar"].values(), key=lambda x: -(x["K"] + x["E"]))
        ulkeler.append(d)
    ulkeler.sort(key=lambda d: -(d["K"] + d["E"]))

    veri = {
        "guncellenme": __import__("datetime").date.today().isoformat(),
        "guncelYil": guncel,
        "birimler": [{"grup": g, "ad": b, "programlar": [{"ad": p, **v} for p, v in progs.items()]}
                     for (g, b), progs in birim.items()],
        "iller": dict(iller),
        "ulkeler": ulkeler,
        "sektorler": sorted(sektor.items(), key=lambda x: -x[1]),
        "sektorBeyan": sum(sektor.values()),
        "kayitliMezun": a.kayitli,
    }
    print("/* veri_donustur.py ile üretildi — elle düzenlemeyin */")
    print("window.MEZUN_VERI = " + json.dumps(veri, ensure_ascii=False, separators=(",", ":")) + ";")
    print(f"{len(satirlar) - atlanan} satır işlendi, {atlanan} satır atlandı (cinsiyet/yıl eksik).", file=sys.stderr)

if __name__ == "__main__":
    main()
