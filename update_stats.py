#!/usr/bin/env python3
"""
update_stats.py — Fetches TryHackMe and LetsDefend stats
and updates the corresponding values in hugo.toml.
"""

import re
import sys
import json
import urllib.request
import urllib.error

THM_USER = "StaryDarkz"
LD_USER  = "StaryDarkz"
CONFIG   = "hugo.toml"

# ─────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────

def fetch(url, headers=None):
    req = urllib.request.Request(url, headers=headers or {
        "User-Agent": "Mozilla/5.0 (compatible; stats-bot/1.0)"
    })
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.read().decode()
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code} fetching {url}")
        return None
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return None

def update_toml(path, key, value):
    """Replace a key = '...' line in hugo.toml with the new value."""
    with open(path, "r") as f:
        content = f.read()
    pattern = rf'^(\s*{re.escape(key)}\s*=\s*")[^"]*(")'
    replacement = rf'\g<1>{value}\g<2>'
    new_content, count = re.subn(pattern, replacement, content, flags=re.MULTILINE)
    if count == 0:
        print(f"  WARNING: key '{key}' not found in {path}")
        return
    with open(path, "w") as f:
        f.write(new_content)
    print(f"  {key} = \"{value}\"")

# ─────────────────────────────────────────
# TryHackMe
# ─────────────────────────────────────────

def get_thm_stats(username):
    print(f"\n[TryHackMe] Fetching stats for {username}...")
    stats = {}

    # Rank endpoint
    data = fetch(f"https://tryhackme.com/api/user/rank/{username}")
    if data:
        try:
            j = json.loads(data)
            rank = j.get("userRank", "")
            if rank:
                stats["thm_rank"] = str(rank)
                print(f"  rank: {rank}")
        except json.JSONDecodeError:
            print("  Could not parse rank response")

    # Public profile endpoint
    data = fetch(f"https://tryhackme.com/api/user/existsV2/{username}")
    if data:
        try:
            j = json.loads(data)
            points = j.get("points", "")
            rooms  = j.get("completedRooms", "")
            if points:
                # Format: 52180 → "52k" if >= 1000
                pts_int = int(points)
                stats["thm_points"] = f"{pts_int // 1000}k" if pts_int >= 1000 else str(pts_int)
                print(f"  points: {stats['thm_points']}")
            if rooms:
                stats["thm_rooms"] = str(rooms)
                print(f"  rooms: {rooms}")
        except (json.JSONDecodeError, ValueError):
            print("  Could not parse profile response")

    # Global percentile (scraped from public profile page)
    html = fetch(f"https://tryhackme.com/p/{username}")
    if html:
        m = re.search(r'top\s+([\d.]+)\s*%', html, re.IGNORECASE)
        if m:
            stats["thm_rank"] = f"Top {m.group(1)}%"
            print(f"  global: Top {m.group(1)}%")

    return stats

# ─────────────────────────────────────────
# LetsDefend
# ─────────────────────────────────────────

def get_ld_stats(username):
    print(f"\n[LetsDefend] Fetching stats for {username}...")
    stats = {}

    html = fetch(f"https://app.letsdefend.io/user/profile/{username}")
    if not html:
        return stats

    # Score / points
    m = re.search(r'"score"\s*:\s*(\d+)', html)
    if not m:
        m = re.search(r'(\d[\d,]+)\s*(?:pts|points|score)', html, re.IGNORECASE)
    if m:
        raw = m.group(1).replace(",", "")
        pts_int = int(raw)
        stats["ld_points"] = f"{pts_int // 1000}k" if pts_int >= 1000 else str(pts_int)
        print(f"  points: {stats['ld_points']}")

    # Rank / title
    m = re.search(r'"title"\s*:\s*"([^"]+)"', html)
    if not m:
        m = re.search(r'class="[^"]*rank[^"]*"[^>]*>\s*([^<]{3,40})\s*<', html)
    if m:
        stats["ld_rank"] = m.group(1).strip()
        print(f"  rank: {stats['ld_rank']}")

    # Alerts / challenges solved
    m = re.search(r'"solved_alerts"\s*:\s*(\d+)', html)
    if not m:
        m = re.search(r'(\d+)\s*alerts?\s*solved', html, re.IGNORECASE)
    if m:
        stats["ld_alerts"] = m.group(1)
        print(f"  alerts: {m.group(1)}")

    # Global percentile
    m = re.search(r'top\s+([\d.]+)\s*%', html, re.IGNORECASE)
    if m:
        stats["ld_global"] = f"top {m.group(1)}%"
        print(f"  global: top {m.group(1)}%")

    return stats

# ─────────────────────────────────────────
# Main
# ─────────────────────────────────────────

def main():
    print("=" * 50)
    print("  StaryDarkz — Stats Updater")
    print("=" * 50)

    any_update = False

    # TryHackMe
    thm = get_thm_stats(THM_USER)
    if thm:
        print(f"\n[hugo.toml] Updating TryHackMe values...")
        for key, val in thm.items():
            update_toml(CONFIG, key, val)
        any_update = True
    else:
        print("\n[TryHackMe] No data retrieved — keeping existing values.")

    # LetsDefend
    ld = get_ld_stats(LD_USER)
    if ld:
        print(f"\n[hugo.toml] Updating LetsDefend values...")
        for key, val in ld.items():
            update_toml(CONFIG, key, val)
        any_update = True
    else:
        print("\n[LetsDefend] No data retrieved — keeping existing values.")

    print("\n" + "=" * 50)
    if any_update:
        print("  Done. hugo.toml updated successfully.")
    else:
        print("  No updates made. Check network or profile visibility.")
    print("=" * 50)

if __name__ == "__main__":
    main()
