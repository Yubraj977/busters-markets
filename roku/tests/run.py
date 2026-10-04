from pathlib import Path
import re, subprocess, tempfile, sys
root = Path(__file__).resolve().parents[1]
parts = []
for filename, names in [("MenuScene.brs", ["makePages", "photoUrl", "money"]), ("MenuFeed.brs", ["validMenu", "isText", "isNumber"])]:
    source = (root / "components" / filename).read_text()
    for name in names:
        match = re.search(r"^function " + name + r"\(.*?^end function", source, re.M | re.S)
        assert match, name
        parts.append(match.group())
parts.append((root / "tests/cases.brs").read_text())
with tempfile.TemporaryDirectory() as tmp:
    script = Path(tmp) / "test.brs"
    script.write_text("\n\n".join(parts))
    result = subprocess.run(["node", sys.argv[1], str(script)], cwd=tmp, capture_output=True, text=True)
    print(result.stdout, end="")
    print(result.stderr, end="", file=sys.stderr)
    assert result.returncode == 0 and "All menu logic tests passed." in result.stdout and "FAIL:" not in result.stdout
