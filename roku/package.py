"""Package only Roku sources; never website files, environment files or credentials."""
from pathlib import Path
import xml.etree.ElementTree as ET
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
files = [root / 'manifest']
for folder in ('source', 'components', 'images'):
    files.extend(sorted(p for p in (root / folder).rglob('*') if p.is_file()))
for file in files:
    if file.suffix == '.xml':
        ET.parse(file)
out = root / 'dist' / 'busters-deli-roku.zip'
out.parent.mkdir(exist_ok=True)
with ZipFile(out, 'w', ZIP_DEFLATED) as archive:
    for file in files:
        archive.write(file, file.relative_to(root))
with ZipFile(out) as archive:
    assert archive.testzip() is None
    assert 'manifest' in archive.namelist()
print(out)
