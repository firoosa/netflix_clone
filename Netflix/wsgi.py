import os
import sys
from pathlib import Path

# Ensure the backend package is importable when the working directory is the repo root.
BACKEND_DIR = Path(__file__).resolve().parent.parent / "backend"
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "netflix_backend.settings")

from django.core.wsgi import get_wsgi_application  # noqa: E402

application = get_wsgi_application()

